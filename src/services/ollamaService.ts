import { AudioChunker } from '../utils/audioChunker';
import { AudioConverter } from '../utils/audioConverter';

export class OllamaService {
  private baseUrl: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private inputLang: string = '';

  constructor(baseUrl: string = 'http://localhost:11434') {
    console.log('OllamaService initialized:', {
      baseUrl
    });
    this.baseUrl = baseUrl;
  }

  async transcribe(audioFile: File, language: string): Promise<string> {
    console.log('Starting Ollama transcription:', {
      fileName: audioFile.name,
      fileSize: `${(audioFile.size / 1024 / 1024).toFixed(1)}MB`,
      language
    });
    this.inputLang = language;
    
    // Convert to WAV format first
    console.log('Converting audio to WAV format...');
    const wavBlob = await AudioConverter.toMP3(audioFile);
    console.log('Conversion complete');
    
    // Convert Blob to File
    const wavFile = new File([wavBlob], audioFile.name.replace(/\.[^/.]+$/, '.wav'), {
      type: wavBlob.type,
      lastModified: Date.now()
    });
    
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
      formData.append('model', 'whisper');
      formData.append('language', language);
    
      console.log(`Sending chunk ${i + 1} to Ollama API:`, {
        chunkSize: `${(chunk.size / 1024 / 1024).toFixed(1)}MB`,
        language,
        model: 'whisper'
      });

      const response = await fetch(`${this.baseUrl}/api/audio`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        console.error('Ollama API error:', response.status, response.statusText);
        let errorMessage = `Transcription failed (HTTP ${response.status})`;
        
        try {
          const error = await response.json();
          errorMessage = error.error || errorMessage;
        } catch (e) {
          // If parsing JSON fails, use the default error message
        }
        
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      
      if (!data.text) {
        throw new Error('No transcription received for chunk');
      }
      
      fullTranscription += data.text + ' ';
    }

    console.log('Ollama transcription completed:', {
      inputLanguage: language,
      transcriptionLength: fullTranscription.length,
      firstFewWords: fullTranscription.split(' ').slice(0, 5).join(' ') + '...'
    });

    return fullTranscription.trim();
  }
}