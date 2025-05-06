import OpenAI from 'openai';
import { AudioChunker } from '../utils/audioChunker';
import { AudioConverter } from '../utils/audioConverter';
import { outputCategories } from '../data/outputOptions';

const languageNames = {
  en: "English",
  de: "German",
  es: "Spanish",
  fr: "French",
  it: "Italian",
  pt: "Portuguese",
  ru: "Russian",
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese"
};

export class OpenAIService {
  private client: OpenAI;
  private currentCategory: string;
  private selectedOptions: string[];
  private emailTone: string;
  private categoryConfig: OutputCategoryConfig;
  private inputLang: string = '';
  private translateEnabled: boolean = false;

  constructor(apiKey: string, category: string = 'RecordBud', options: string[] = ['transcription'], tone: string = 'business') {
    console.log('OpenAIService initialized:', {
      category,
      options,
      tone
    });
    this.client = new OpenAI({ 
      apiKey,
      dangerouslyAllowBrowser: true
    });
    this.currentCategory = category;
    this.selectedOptions = options;
    this.emailTone = tone;
    this.categoryConfig = outputCategories[category];
    if (!this.categoryConfig) {
      throw new Error(`Invalid category: ${category}`);
    }
  }

  setTranslateEnabled(enabled: boolean) {
    console.log('Translation enabled status changed:', {
      previous: this.translateEnabled,
      new: enabled
    });
    this.translateEnabled = enabled;
  }

  async transcribe(audioFile: File, language: string): Promise<string> {
    console.log('Starting transcription:', {
      fileName: audioFile.name,
      fileSize: `${(audioFile.size / 1024 / 1024).toFixed(1)}MB`,
      language,
      languageName: languageNames[language]
    });
    console.log(`File size: ${(audioFile.size / 1024 / 1024).toFixed(1)}MB`);
    this.inputLang = language;
    
    // Convert to WAV format first
    console.log('Converting audio to WAV format...');
    const wavFile = await AudioConverter.toMP3(audioFile);
    console.log('Conversion complete');
    
    // Split file into chunks if it's larger than 24MB
    const chunks = wavFile.size > 24 * 1024 * 1024 
      ? await AudioChunker.splitAudioFile(wavFile)
      : [wavFile];
    
    console.log(`Split into ${chunks.length} chunks`);
    let fullTranscription = '';

    for (let i = 0; i < chunks.length; i++) {
      console.log(`Processing chunk ${i + 1} of ${chunks.length}`);
      const chunk = chunks[i];
      
      const formData = new FormData();
      formData.append('file', chunk);
      formData.append('model', 'whisper-1');
      formData.append('response_format', 'json');
      formData.append('language', language);
    
      console.log(`Sending chunk ${i + 1} to Whisper API:`, {
        chunkSize: `${(chunk.size / 1024 / 1024).toFixed(1)}MB`,
        language,
        model: 'whisper-1'
      });

      const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.client.apiKey}`,
        },
        body: formData
      });

      if (!response.ok) {
        console.error('Transcription API error:', response.status, response.statusText);
        const error = await response.json();
        console.error('Error details:', error);
        
        throw new Error(
          error.error?.message || 
          `Transcription failed (HTTP ${response.status})`
        );
      }
      
      const data = await response.json();
      
      if (!data.text) {
        throw new Error('No transcription received for chunk');
      }
      
      fullTranscription += data.text + ' ';
    }

    console.log('Transcription completed:', {
      inputLanguage: language,
      transcriptionLength: fullTranscription.length,
      firstFewWords: fullTranscription.split(' ').slice(0, 5).join(' ') + '...'
    });

    return fullTranscription.trim();
  }

  setOutputOptions(category: string, options: string[], emailTone?: string, config?: any) {
    this.currentCategory = category;
    this.selectedOptions = options;
    this.categoryConfig = config || outputCategories[category];
    if (emailTone) {
      this.emailTone = emailTone;
    }
  }

  private async generateOutput(text: string, systemPrompt: string): Promise<string> {
    const finalPrompt = systemPrompt.replace('{tone}', this.emailTone);
    
    try {
      const completion = await this.client.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: finalPrompt
          },
          {
            role: "user",
            content: text
          }
        ]
      });

      const output = completion.choices[0].message.content || '';
      
      console.log('Output generated:', {
        outputLength: output.length,
        firstFewWords: output.split(' ').slice(0, 5).join(' ') + '...'
      });

      return output;
    } catch (error: any) {
      console.error('Output generation error:', error);
      throw new Error(`Output generation failed: ${error.message}`);
    }
  }

  async generateOutputs(text: string, language: string): Promise<Record<string, string>> {
    console.log('Generating outputs:', {
      inputLanguage: this.inputLang,
      requestedLanguage: language,
      translateEnabled: this.translateEnabled,
      selectedOptions: this.selectedOptions,
      textLength: text.length
    });

    if (!this.categoryConfig) {
      throw new Error('Category configuration not set');
    }
    
    const outputs: Record<string, string> = {};
    const outputLanguage = this.translateEnabled ? language : this.inputLang;

    console.log('Determined output language:', {
      final: outputLanguage,
      name: languageNames[outputLanguage],
      translateEnabled: this.translateEnabled,
      inputLang: this.inputLang,
      requestedLang: language
    });
    
    for (const optionId of this.selectedOptions) {
      const option = this.categoryConfig.options.find(opt => opt.id === optionId);
      if (option) {
        console.log(`Generiere ${option.label}:`, {
          outputLanguage,
          languageName: languageNames[outputLanguage],
          optionPrompt: option.systemPrompt
        });

        const systemPrompt = `${option.systemPrompt} Generate the output in ${languageNames[outputLanguage]}.`;
        const output = await this.generateOutput(text, systemPrompt);
        
        console.log(`${option.label} wurde generiert:`, {
          outputLength: output.length,
          firstFewWords: output.split(' ').slice(0, 5).join(' ') + '...'
        });

        outputs[optionId] = output;
      }
    }
    
    // Always include original transcription last to ensure proper ordering
    outputs.original = text;

    console.log('Alle Ausgaben wurden generiert:', {
      generatedOptions: Object.keys(outputs),
      outputLanguage,
      translateEnabled: this.translateEnabled
    });

    return outputs;
  }

  async translate(text: string, targetLang: string): Promise<string> {
    console.log(`Starting translation to ${targetLang}`);
    console.log('Sending translation request to OpenAI API...');
    return this.sendChatRequest(text, `Translate the following text to ${languageNames[targetLang]}. Maintain the original tone and style.`);
  }

  async summarize(text: string, targetLang: string): Promise<string> {
    console.log('Starting text summarization');
    return this.sendChatRequest(
      text,
      `Create a concise summary in ${languageNames[targetLang]} of the following text, highlighting the key points and main ideas.`
    );
  }

  private async sendChatRequest(text: string, systemPrompt: string): Promise<string> {
    try {
      const completion = await this.client.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: text
          }
        ]
      });

      console.log('Translation completed successfully');
      return completion.choices[0].message.content || '';
    } catch (error: any) {
      console.error('Translation error:', error);
      throw new Error(`Translation failed: ${error.message}`);
    }
  }
}