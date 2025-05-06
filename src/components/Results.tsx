import React from 'react';
import { Languages, Copy, Wand2 } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface ResultsProps {
  originalText: string;
  outputs: Record<string, string>;
  isLoading: boolean;
  status?: string;
}

export function Results({ originalText, outputs, isLoading, status }: ResultsProps) {
  const { t } = useTranslation();
  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  if (isLoading) {
    return (
      <div className="results results--loading">
        <div className="loading-spinner" />
        <p>{status || t('processing')}</p>
      </div>
    );
  }

  if (!originalText && Object.keys(outputs).length === 0) {
    return null;
  }

  return (
    <div className="results">
      <div className="results__section">
        {outputs.original && (
          <>
            <div className="results__header">
              <h3>{t('originalTranscription')}</h3>
              <button onClick={() => copyToClipboard(outputs.original)} className="copy-button">
                <Copy size={16} />
                {t('copy')}
              </button>
            </div>
            <div className="results__content">
              {outputs.original}
            </div>
          </>
        )}
      </div>

      {Object.entries(outputs).map(([optionId, content]) => (
        optionId !== 'original' && (
        <div key={optionId} className="results__section">
          <div className="results__header">
            <h3>{t(optionId)}</h3>
            <button onClick={() => copyToClipboard(content)} className="copy-button">
              <Copy size={16} />
              {t('copy')}
            </button>
          </div>
          <div className="results__content">
            {content}
          </div>
        </div>
        )
    )
    )
    }
    </div>
  );
}