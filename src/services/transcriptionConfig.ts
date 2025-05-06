export interface TranscriptionServiceConfig {
  type: 'openai' | 'ollama';
  apiKey?: string;
  baseUrl?: string;
}

export const defaultTranscriptionConfig: TranscriptionServiceConfig = {
  type: 'openai',
  apiKey: '',
  baseUrl: 'http://localhost:11434'
};