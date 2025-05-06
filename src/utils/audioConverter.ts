export class AudioConverter {
  private static readonly SAMPLE_RATE = 16000; // OpenAI Whisper preferred sample rate
  
  static async toMP3(file: File): Promise<Blob> {
    console.log('Starting audio conversion for:', file.name);
    
    try {
      // Create audio context
      const audioContext = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: this.SAMPLE_RATE
      });

      // Get file as ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      
      // Decode audio data
      console.log('Decoding audio data...');
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      console.log('Audio decoded successfully');

      // Create offline context for processing
      const offlineContext = new OfflineAudioContext(
        1, // mono
        Math.ceil(audioBuffer.duration * this.SAMPLE_RATE),
        this.SAMPLE_RATE
      );

      // Create and connect source
      const source = offlineContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(offlineContext.destination);
      
      // Start rendering
      console.log('Rendering audio...');
      source.start(0);
      const renderedBuffer = await offlineContext.startRendering();
      console.log('Audio rendering complete');

      // Convert to WAV
      console.log('Converting to WAV format...');
      const wavBlob = await this.audioBufferToWAV(renderedBuffer);
      console.log('Conversion complete');
      
      return new Blob([wavBlob], { type: 'audio/wav' });
    } catch (error) {
      console.error('Audio conversion failed:', error);
      throw new Error(`Audio conversion failed: ${error.message}`);
    }
  }
  
  private static audioBufferToWAV(buffer: AudioBuffer): Blob {
    const length = buffer.length * 2; // 16-bit samples
    const data = new DataView(new ArrayBuffer(44 + length));
    
    // WAV header
    const writeString = (view: DataView, offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };
    
    writeString(data, 0, 'RIFF');
    data.setUint32(4, 36 + length, true);
    writeString(data, 8, 'WAVE');
    writeString(data, 12, 'fmt ');
    data.setUint32(16, 16, true);
    data.setUint16(20, 1, true);
    data.setUint16(22, 1, true);
    data.setUint32(24, this.SAMPLE_RATE, true);
    data.setUint32(28, this.SAMPLE_RATE * 2, true);
    data.setUint16(32, 2, true);
    data.setUint16(34, 16, true);
    writeString(data, 36, 'data');
    data.setUint32(40, length, true);
    
    // Write audio data
    const samples = buffer.getChannelData(0);
    let offset = 44;
    for (let i = 0; i < samples.length; i++) {
      const sample = Math.max(-1, Math.min(1, samples[i]));
      data.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
      offset += 2;
    }
    
    return new Blob([data.buffer], { type: 'audio/wav' });
  }
}