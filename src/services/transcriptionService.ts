import { OpenAIService } from './openAiService';
import { OllamaService } from './ollamaService';
import { TranscriptionServiceConfig } from './transcriptionConfig';

export class TranscriptionService {
  private openAiService: OpenAIService | null = null;
  private ollamaService: OllamaService | null = null;
  private config: TranscriptionServiceConfig;

  constructor(config: TranscriptionServiceConfig) {
    this.config = config;
    this.initializeServices();
  }

  private initializeServices() {
    if (this.config.type === 'openai' && this.config.apiKey) {
      this.openAiService = new OpenAIService(
        this.config.apiKey
      );
    } else if (this.config.type === 'ollama' && this.config.baseUrl) {
      this.ollamaService = new OllamaService(this.config.baseUrl);
    }
  }

  updateConfig(config: TranscriptionServiceConfig) {
    this.config = config;
    this.initializeServices();
  }

  async transcribe(audioFile: File, language: string): Promise<string> {
    if (this.config.type === 'openai' && this.openAiService) {
      return this.openAiService.transcribe(audioFile, language);
    } else if (this.config.type === 'ollama' && this.ollamaService) {
      return this.ollamaService.transcribe(audioFile, language);
    } else {
      throw new Error('Transcription service not properly configured');
    }
  }

  async generateOutputs(text: string, language: string): Promise<Record<string, string>> {
    if (this.config.type === 'openai' && this.openAiService) {
      return this.openAiService.generateOutputs(text, language);
    } else {
      // For Ollama, we only support transcription for now
      // You could implement a similar output generation using Ollama's LLM capabilities
      return { original: text };
    }
  }

  async translate(text: string, targetLang: string): Promise<string> {
    if (this.config.type === 'openai' && this.openAiService) {
      return this.openAiService.translate(text, targetLang);
    } else {
      throw new Error('Translation is only supported with OpenAI service');
    }
  }

  async summarize(text: string, targetLang: string): Promise<string> {
    if (this.config.type === 'openai' && this.openAiService) {
      return this.openAiService.summarize(text, targetLang);
    } else {
      throw new Error('Summarization is only supported with OpenAI service');
    }
  }

  setOutputOptions(category: string, options: string[], emailTone?: string) {
    if (this.config.type === 'openai' && this.openAiService) {
      this.openAiService.setOutputOptions(category, options, emailTone);
    }
  }

  setTranslateEnabled(enabled: boolean) {
    if (this.config.type === 'openai' && this.openAiService) {
      this.openAiService.setTranslateEnabled(enabled);
    }
  }
}