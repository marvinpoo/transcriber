import React, { useState } from 'react';
import { TranscriptionServiceConfig } from '../services/transcriptionConfig';

interface ServiceSelectorProps {
  config: TranscriptionServiceConfig;
  onConfigChange: (config: TranscriptionServiceConfig) => void;
  translations: Record<string, string>;
}

export const ServiceSelector: React.FC<ServiceSelectorProps> = ({ 
  config, 
  onConfigChange,
  translations 
}) => {
  const [serviceType, setServiceType] = useState<'openai' | 'ollama'>(config.type);
  const [apiKey, setApiKey] = useState(config.apiKey || '');
  const [baseUrl, setBaseUrl] = useState(config.baseUrl || 'http://localhost:11434');
  const [isApiKeySet, setIsApiKeySet] = useState(!!config.apiKey);
  const [isBaseUrlSet, setIsBaseUrlSet] = useState(!!config.baseUrl);

  const handleServiceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as 'openai' | 'ollama';
    setServiceType(newType);
    onConfigChange({
      ...config,
      type: newType
    });
  };

  const handleApiKeySave = () => {
    if (apiKey.trim()) {
      setIsApiKeySet(true);
      onConfigChange({
        ...config,
        apiKey,
        type: 'openai'
      });
    }
  };

  const handleBaseUrlSave = () => {
    if (baseUrl.trim()) {
      setIsBaseUrlSet(true);
      onConfigChange({
        ...config,
        baseUrl,
        type: 'ollama'
      });
    }
  };

  const resetApiKey = () => {
    setIsApiKeySet(false);
    setApiKey('');
  };

  const resetBaseUrl = () => {
    setIsBaseUrlSet(false);
    setBaseUrl('http://localhost:11434');
  };

  return (
    <div className="service-selector">
      <h2>{translations.serviceSettings}</h2>
      
      <div className="service-type-selector">
        <label htmlFor="service-type">{translations.serviceType}</label>
        <select 
          id="service-type" 
          value={serviceType} 
          onChange={handleServiceTypeChange}
        >
          <option value="openai">{translations.openaiService}</option>
          <option value="ollama">{translations.ollamaService}</option>
        </select>
      </div>

      {serviceType === 'openai' && (
        <div className="api-key-section">
          {isApiKeySet ? (
            <div className="api-key-set">
              <p>{translations.apiKeySet}</p>
              <button onClick={resetApiKey}>{translations.change}</button>
            </div>
          ) : (
            <div className="api-key-input">
              <label htmlFor="api-key">{translations.enterApiKey}</label>
              <input
                id="api-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <button onClick={handleApiKeySave}>{translations.saveApiKey}</button>
            </div>
          )}
        </div>
      )}

      {serviceType === 'ollama' && (
        <div className="ollama-url-section">
          {isBaseUrlSet ? (
            <div className="ollama-url-set">
              <p>{translations.ollamaUrlSet}</p>
              <button onClick={resetBaseUrl}>{translations.change}</button>
            </div>
          ) : (
            <div className="ollama-url-input">
              <label htmlFor="ollama-url">{translations.enterOllamaUrl}</label>
              <input
                id="ollama-url"
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
              />
              <button onClick={handleBaseUrlSave}>{translations.saveOllamaUrl}</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};