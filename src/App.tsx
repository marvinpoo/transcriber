import React from 'react';
import { FileText, Languages, Key, Upload } from 'lucide-react';
import { useState } from 'react';
import { LogoIcon } from './components/LogoIcon';
import { ThemeToggle } from './components/ThemeToggle';
import { UILanguageToggle } from './components/UILanguageToggle';
import { ApiKeyForm } from './components/ApiKeyForm';
import { FileUploader } from './components/FileUploader';
import { LanguageToggle } from './components/LanguageToggle';
import { Results } from './components/Results';
import { OutputSelector } from './components/OutputSelector';
import { OpenAIService } from './services/openAiService';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTranslation, TranslationProvider } from './hooks/useTranslation';
import { OutputCategory, EmailTone } from './types';
import { outputCategories } from './data/outputOptions';
import { GitHubCorner } from './components/GitHubCorner';

function AppContent() {
  const { t } = useTranslation();
  const [apiKey] = useLocalStorage<string>('openai-api-key', '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalText, setOriginalText] = useState('');
  const [inputLang, setInputLang] = useState('de');
  const [outputLang, setOutputLang] = useState('de');
  const [translateEnabled, setTranslateEnabled] = useState(false);
  const [status, setStatus] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<OutputCategory>('RecordBud');
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['transcription']);
  const [emailTone, setEmailTone] = useState<EmailTone>('business');
  const [outputs, setOutputs] = useState<Record<string, string>>({});

  const handleFileSelect = async (file: File) => {
    if (!apiKey) {
      alert('Please set your OpenAI API key first');
      return;
    }

    setIsProcessing(true);
    const openAI = new OpenAIService(apiKey, selectedCategory, selectedOptions, emailTone);
    openAI.setTranslateEnabled(translateEnabled);

    try {
      setStatus(t('transcribing'));
      const transcription = await openAI.transcribe(file, inputLang);
      setOriginalText(transcription);

      const option = outputCategories[selectedCategory].options.find(opt => opt.id === selectedOptions[0]);
      setStatus(`Generiere ${option?.label.toLowerCase()}...`);
      const generatedOutputs = await openAI.generateOutputs(transcription, outputLang);
      setOutputs(generatedOutputs);
    } catch (error) {
      console.error('Processing failed:', error);
      setStatus('Error: ' + (error as Error).message);
      alert(t('transcriptionError'));
    } finally {
      setIsProcessing(false);
      setStatus('');
    }
  };

  return (
    <div className="app">
      <GitHubCorner repositoryUrl="https://github.com/marvinpoo/transcriber" useGradient={true} />
      <header className="header">
        <div className="container header__content">
          <div className="header__logo">
            <LogoIcon />
            <h1>AI Transcriber</h1>
          </div>
          <div className="header__actions">
            <UILanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <main className="main">
        <div className="container">
          <div className="grid">
            <div className="grid__sidebar">
              <section className="setup-section">
                <h2><Key size={20} /> {t('setup')}</h2>
                <ApiKeyForm />
              </section>
              
              <section className="language-section">
                <h2><Languages size={20} /> {t('languageSettings')}</h2>
                <LanguageToggle
                  inputLang={inputLang}
                  outputLang={outputLang}
                  translateEnabled={translateEnabled}
                  onTranslateToggle={setTranslateEnabled}
                  onInputLangChange={setInputLang}
                  onOutputLangChange={setOutputLang}
                />
              </section>
              
              <section className="output-section">
                <h2><FileText size={20} /> {t('outputOptions')}</h2>
                <OutputSelector
                  selectedCategory={selectedCategory}
                  selectedOptions={selectedOptions}
                  emailTone={emailTone}
                  onCategoryChange={setSelectedCategory}
                  onOptionsChange={setSelectedOptions}
                  onToneChange={setEmailTone}
                />
              </section>
            </div>
            
            <div className="grid__main">
              <section className="upload-section">
                <h2><Upload size={20} /> {t('uploadMedia')}</h2>
                <FileUploader onFileSelect={handleFileSelect} />
              </section>
              
              <section className="results-section">
                <Results
                  originalText={originalText}
                  outputs={outputs}
                  isLoading={isProcessing}
                  status={status}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  const reactVersion = React.version;

  console.log(`Using React version: ${reactVersion}`);

  return (
    <TranslationProvider>
      <AppContent />
    </TranslationProvider>
  );
}

export default App;