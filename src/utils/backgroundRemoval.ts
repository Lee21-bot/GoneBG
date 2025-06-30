import { removeBackground, type Config } from '@imgly/background-removal';

export interface BackgroundRemovalOptions {
  model?: 'isnet' | 'isnet_fp16' | 'isnet_quint8';
  output?: {
    format?: 'image/png' | 'image/jpeg' | 'image/webp';
    quality?: number;
  };
  progress?: (stage: string, progress: number, total: number, ...args: unknown[]) => void;
}

export class ImglyBackgroundRemover {
  async removeBackground(
    imageFile: File | ImageData | HTMLImageElement, 
    options?: BackgroundRemovalOptions
  ): Promise<Blob> {
    try {
      // Configure options with performance optimizations
      const config: Config = {
        model: options?.model || 'isnet', // Use balanced model by default
        output: {
          format: options?.output?.format || 'image/png',
          quality: options?.output?.quality || 1.0, // Use max quality by default
        },
        progress: options?.progress,
      };

      // Remove background
      const result = await removeBackground(imageFile, config);
      
      return result;
    } catch (error) {
      console.error('Background removal failed:', error);
      throw new Error(`Background removal failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Helper function for easy use
export async function processImageWithImgly(
  imageFile: File,
  options?: BackgroundRemovalOptions
): Promise<File> {
  const remover = new ImglyBackgroundRemover();
  
  const blob = await remover.removeBackground(imageFile, options);
  
  // Convert blob to File
  const [fileName] = imageFile.name.split('.');
  const processedFile = new File([blob], `${fileName}-bg-removed.png`, { 
    type: 'image/png' 
  });
  
  return processedFile;
} 