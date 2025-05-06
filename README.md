# AI Transcriber

**Legal:** <br />
[![GPL-3.0 License](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](https://www.gnu.org/licenses/gpl-3.0.html) <br />
**Dev Stack:** <br />
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://reactjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) <br />
**Server Stack:** <br />
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/) [![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?logo=openai&logoColor=white)](https://openai.com/)

A powerful and intuitive interface for transcribing audio and video files using OpenAI's advanced AI models. Transform your recordings into text and generate various outputs like summaries, meeting notes, and more.

## 🌟 Features

- **Audio/Video Transcription**: Convert speech to text from various audio and video formats
- **Multiple Output Formats**: Generate transcriptions, summaries, meeting notes, and more
- **Language Support**: Transcribe content in multiple languages
- **Translation**: Translate transcriptions between supported languages
- **Custom Categories**: Different processing modes for various use cases (RecordBud, MeetPaper, etc.)
- **Dark/Light Themes**: Comfortable viewing in any lighting condition
- **Internationalization**: Support for multiple languages in the UI
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Privacy-Focused**: Your API key and data stay in your browser

## 📋 Overview

AI Transcriber is a modern web application designed to simplify the process of transcribing audio and video content. Whether you're creating meeting notes, transcribing interviews, or generating summaries of recorded content, AI Transcriber provides an elegant solution with its intuitive interface and powerful AI capabilities. 

## Feature Future
- [ ] Ollama Support is in the making

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or newer)
- npm (v7 or newer)
- OpenAI API key

### Installation

```bash
# Clone the repository
git clone https://github.com/marvinpoo/transcriber.git
cd transcriber

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173` by default.

## 💻 Development

```bash
# Install dependencies
npm install

# Start development server with hot-reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linting
npm run lint
```

## 🔧 Tech Stack

- **React 18**: For building the user interface
- **TypeScript**: For type-safe code
- **Vite**: For fast development and optimized builds
- **SCSS**: For styling with a modular approach
- **OpenAI API**: For AI-powered transcription and text generation
- **react-dropzone**: For file upload functionality
- **lucide-react**: For beautiful, consistent icons

## 📁 Project Structure

```
src/
├── assets/         # Static assets like images
├── components/     # React components
│   ├── ApiKeyForm.tsx      # API key input component
│   ├── FileUploader.tsx    # File upload component
│   ├── LanguageToggle.tsx  # Language selection component
│   ├── OutputSelector.tsx  # Output type selector
│   ├── Results.tsx         # Display results component
│   ├── ThemeToggle.tsx     # Theme switcher component
│   └── ...                 # Other components
├── data/           # Application data and constants
├── hooks/          # Custom React hooks
├── services/       # Service classes for API interactions
├── styles/         # CSS styles
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── App.tsx         # Main application component
└── main.tsx        # Application entry point
```

## 🎯 Key Features Explained

### Audio/Video Transcription

Upload audio or video files and convert speech to text using OpenAI's powerful models. Supports various formats including MP3, WAV, M4A, MP4, MOV, and AVI.

### Multiple Output Formats

Generate different types of outputs based on your needs:
- **Standard Transcription**: Clean text without filler words
- **Verbatim Transcription**: Includes all vocal expressions and non-verbal sounds
- **Speaker Labels**: Transcription formatted as a conversation with speaker identification
- **Summary**: Concise summary of the content
- **Meeting Notes**: Structured notes with action items, decisions, and deadlines

### Language Support

Transcribe content in multiple languages including English, German, Spanish, French, Italian, Portuguese, Russian, Japanese, Korean, and Chinese.

### Translation

Optionally translate your transcriptions to a different language, making it easy to work with multilingual content.

## 🌐 Browser Support

AI Transcriber supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚢 Deployment

The application is configured for easy deployment on any static hosting service.

```bash
# Build the application
npm run build

# The build output will be in the 'dist' directory
# which can be deployed to any static hosting service
```

## 🔍 Troubleshooting

### Common Issues

- **API Key Issues**: Ensure your OpenAI API key is valid and has sufficient credits
- **File Format Problems**: Check that your audio/video file is in a supported format
- **Transcription Errors**: For better results, use clear audio with minimal background noise

## 👥 Contributing

Contributions are welcome! Please check out our [Contribution Guidelines](CONTRIBUTION.md) for details on how to get started.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.

## 🔒 Privacy

AI Transcriber is designed with privacy in mind. Your OpenAI API key and files are processed locally in your browser and are not stored on any server. For more information, see our [Privacy Policy](PRIVACY.md).

## 🛡️ Security

If you discover a security vulnerability, please follow our [Security Policy](SECURITY.md) for responsible disclosure.

---

Made with ❤️ by [marvinpoo](https://github.com/marvinpoo)
