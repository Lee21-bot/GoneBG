import imageCompression from 'browser-image-compression';
import { FILE_SIZE_LIMITS, MAX_DIMENSIONS } from './fileValidation';

export interface ImageProcessingOptions {
  maxSizeMB: number;
  maxWidthOrHeight: number;
  useWebWorker: boolean;
  quality: number;
}

export const compressImage = async (file: File): Promise<File> => {
  const options: ImageProcessingOptions = {
    maxSizeMB: FILE_SIZE_LIMITS.RECOMMENDED_SIZE / (1024 * 1024), // 5MB
    maxWidthOrHeight: Math.min(MAX_DIMENSIONS.width, MAX_DIMENSIONS.height),
    useWebWorker: true,
    quality: 0.85
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error('Image compression failed:', error);
    return file; // Return original if compression fails
  }
};

export const loadImageFromFile = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    
    reader.onload = (e) => {
      img.onload = () => {
        resolve(img);
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = e.target?.result as string;
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
};

export const createCanvasFromImage = (image: HTMLImageElement): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }
  
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);
  
  return canvas;
};

export const downloadCanvasAsImage = (canvas: HTMLCanvasElement, filename: string, format: 'png' | 'jpeg' = 'png') => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL(`image/${format}`);
  link.click();
};

export const copyCanvasToClipboard = async (canvas: HTMLCanvasElement): Promise<boolean> => {
  try {
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, 'image/png');
    });
    
    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ]);
    
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}; 