import React from 'react';
import { Captions, NotebookText, Speech, MailOpen } from 'lucide-react';
import { outputCategories } from '../data/outputOptions';
import { OutputCategory, EmailTone } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface OutputSelectorProps {
  selectedCategory: OutputCategory;
  selectedOptions: string[];
  emailTone?: EmailTone;
  onCategoryChange: (category: OutputCategory) => void;
  onOptionsChange: (options: string[]) => void;
  onToneChange?: (tone: EmailTone) => void;
}

export function OutputSelector({
  selectedCategory,
  selectedOptions,
  emailTone,
  onCategoryChange,
  onOptionsChange,
  onToneChange
}: OutputSelectorProps) {
  const { t } = useTranslation();

  const categoryIcons = {
    RecordBud: (props: any) => <Captions {...props} size={24} />,
    MeetPaper: (props: any) => <NotebookText {...props} size={24} />,
    ConfBot: (props: any) => <Speech {...props} size={24} />,
    MailMan: (props: any) => <MailOpen {...props} size={24} />
  };
  
  const handleOptionToggle = (optionId: string) => {
    const newOptions = selectedOptions.includes(optionId)
      ? selectedOptions.filter(id => id !== optionId)
      : [...selectedOptions, optionId];
    onOptionsChange(newOptions);
  };

  return (
    <div className="output-selector">
      <div className="output-selector__categories">
        {Object.values(outputCategories).map(category => (
          <button
            key={category.id}
            className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(category.id)}
          >
            <div className="category-button__container">
              <div className="category-button__icon">
                {categoryIcons[category.id]({})}
              </div>
              <div className="category-button__content">
                <h3>{t(category.name)}</h3>
                <p>{t(category.description)}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="output-selector__options">
        {Object.values(outputCategories)
          .find(c => c.id === selectedCategory)
          ?.options.map(option => (
            <label key={option.id} className="option-checkbox">
              <input
                type="checkbox"
                checked={selectedOptions.includes(option.id)}
                onChange={() => handleOptionToggle(option.id)}
              />
              <div>
                <span>{t(option.label)}</span>
                <p>{t(option.description)}</p>
              </div>
            </label>
          ))}

        {selectedCategory === 'MailMan' && onToneChange && (
          <div className="tone-selector">
            <label>{t('emailTone')}:</label>
            <select
              value={emailTone}
              onChange={(e) => onToneChange(e.target.value as EmailTone)}
            >
              <option value="friendly">{t('toneFriendly')}</option>
              <option value="casual">{t('toneCasual')}</option>
              <option value="polite">{t('tonePolite')}</option>
              <option value="business">{t('toneBusiness')}</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}