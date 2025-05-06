export class AudioChunker {
  private static readonly CHUNK_SIZE = 24 * 1024 * 1024; // 24MB to stay under OpenAI's 25MB limit

  static async splitAudioFile(file: File): Promise<Blob[]> {
    const arrayBuffer = await file.arrayBuffer();
    const chunks: Blob[] = [];
    
    let offset = 0;
    while (offset < arrayBuffer.byteLength) {
      const chunk = arrayBuffer.slice(offset, offset + this.CHUNK_SIZE);
      chunks.push(new Blob([chunk], { type: file.type }));
      offset += this.CHUNK_SIZE;
    }
    
    return chunks;
  }

  static async concatenateAudio(chunks: ArrayBuffer[]): Promise<ArrayBuffer> {
    const totalLength = chunks.reduce((acc, chunk) => acc + chunk.byteLength, 0);
    const result = new Uint8Array(totalLength);
    
    let offset = 0;
    for (const chunk of chunks) {
      result.set(new Uint8Array(chunk), offset);
      offset += chunk.byteLength;
    }
    
    return result.buffer;
  }
}