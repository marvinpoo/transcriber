export type OutputCategory = string;

export type EmailTone = 'friendly' | 'casual' | 'polite' | 'business';

export interface OutputOption {
  id: string;
  label: string;
  description: string;
  systemPrompt: string;
}

export interface OutputCategoryConfig {
  id: string;
  name: string;
  description: string;
  options: OutputOption[];
}

export interface GeneratedOutput {
  optionId: string;
  content: string;
}