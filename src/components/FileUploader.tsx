import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

export function FileUploader({ onFileSelect }: FileUploaderProps) {
  const { t } = useTranslation();
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a'],
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxFiles: 1,
    onDrop: files => files[0] && onFileSelect(files[0])
  });

  // Create input props with accessibility attributes
  const inputProps = {
    ...getInputProps(),
    'aria-label': t('uploadAudioOrVideo') || 'Upload audio or video file'
  };

  return (
    <div
      {...getRootProps()}
      onMouseMove={e => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }}
      className={`file-uploader ${isDragActive ? 'active' : ''}`}
      style={{
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`
      } as React.CSSProperties}>
      <input {...inputProps} />
      <Upload size={48} />
      <p>{t('dropzoneText')}</p>
      <span>{t('supportedFormats')}</span>
    </div>
  );
}