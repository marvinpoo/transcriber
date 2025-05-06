import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTranslation } from '../hooks/useTranslation';

export function ApiKeyForm() {
  const { t } = useTranslation();
  const [apiKey, setApiKey] = useLocalStorage<string>('openai-api-key', '');
  const [isEditing, setIsEditing] = useState(!apiKey);
  const [inputValue, setInputValue] = useState(apiKey);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiKey(inputValue);
    setIsEditing(false);
  };

  return (
    <div className="api-key-form">
      {!isEditing ? (
        <div className="api-key-form__status">
          <div className="status-content">
            <span>{t('apiKeySet')}</span>
          </div>
          <button onClick={() => setIsEditing(true)}>{t('change')}</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="api-key-form__input">
            <input
              type="password"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('enterApiKey')}
              autoComplete="craftly-transcriber-openai-api-key"
              required
            />
          </div>
          <button type="submit">{t('saveApiKey')}</button>
        </form>
      )}
    </div>
  );
}