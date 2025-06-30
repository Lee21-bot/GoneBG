import { useState, useCallback, useRef } from 'react';
import { validateFile, type FileValidationResult } from '../utils/fileValidation';
import { compressImage } from '../utils/imageProcessing';
import { processImageWithImgly, type BackgroundRemovalOptions } from '../utils/backgroundRemoval';

export interface ProcessingState {
  isProcessing: boolean;
  progress: number;
  stage: string;
  error?: string;
}

export interface ProcessedImage {
  id: string;
  originalFile: File;
  processedFile: File;
  originalImage: { width: number; height: number };
  fileValidation: FileValidationResult;
  processingTime: number;
}

export function useBackgroundRemoval() {
  const [processingState, setProcessingState] = useState<ProcessingState>({
    isProcessing: false,
    progress: 0,
    stage: 'idle',
  });

  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);
  const [qualitySettings, setQualitySettings] = useState<BackgroundRemovalOptions>({
    model: 'isnet', // Default to balanced model
    output: {
      format: 'image/png',
      quality: 1.0,
    },
  });

  const processingStartTime = useRef<number>(0);

  const processImage = useCallback(
    async (file: File, options?: BackgroundRemovalOptions) => {
      try {
        processingStartTime.current = Date.now();

        // Validate file
        const validation = validateFile(file);
        if (!validation.isValid) {
          setProcessingState({
            isProcessing: false,
            progress: 0,
            stage: 'error',
            error: `Invalid file: ${validation.error}`,
          });
          return;
        }

        setProcessingState({
          isProcessing: true,
          progress: 10,
          stage: 'uploading',
        });

        // Compress image if needed
        let processedFile = file;
        if (validation.needsCompression) {
          setProcessingState({
            isProcessing: true,
            progress: 20,
            stage: 'compressing',
          });

          processedFile = await compressImage(file);
        }

        // Get original image dimensions
        const img = new Image();
        const imageUrl = URL.createObjectURL(processedFile);
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = reject;
          img.src = imageUrl;
        });
        URL.revokeObjectURL(imageUrl);

        // Configure processing with progress callback
        const processingOptions: BackgroundRemovalOptions = {
          ...qualitySettings,
          ...options,
          progress: (_stage: string, progress: number, total: number) => {
            const percentage = Math.min(90, 30 + (progress / total) * 60);
            setProcessingState({
              isProcessing: true,
              progress: percentage,
              stage: 'processing',
            });
          },
        };

        setProcessingState({
          isProcessing: true,
          progress: 30,
          stage: 'processing',
        });

        // Process image with @imgly/background-removal
        const resultFile = await processImageWithImgly(processedFile, processingOptions);

        const processingTime = Date.now() - processingStartTime.current;

        setProcessingState({
          isProcessing: true,
          progress: 100,
          stage: 'complete',
        });

        // Add to processed images
        const processedImage: ProcessedImage = {
          id: `${Date.now()}-${Math.random()}`,
          originalFile: file,
          processedFile: resultFile,
          originalImage: { width: img.width, height: img.height },
          fileValidation: validation,
          processingTime,
        };

        setProcessedImages((prev) => [processedImage, ...prev]);

        setProcessingState({
          isProcessing: false,
          progress: 100,
          stage: 'complete',
        });
      } catch (error) {
        console.error('Processing failed:', error);
        setProcessingState({
          isProcessing: false,
          progress: 0,
          stage: 'error',
          error: error instanceof Error ? error.message : 'Processing failed',
        });
      }
    },
    [qualitySettings]
  );

  const reprocessImage = useCallback(
    async (index: number) => {
      const imageToReprocess = processedImages[index];
      if (!imageToReprocess) return;

      // Remove the current processed version
      setProcessedImages((prev) => prev.filter((_, i) => i !== index));

      // Reprocess with current settings
      await processImage(imageToReprocess.originalFile, qualitySettings);
    },
    [processedImages, processImage, qualitySettings]
  );

  const removeProcessedImage = useCallback((index: number) => {
    setProcessedImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const cleanup = useCallback(() => {
    setProcessedImages([]);
    setProcessingState({
      isProcessing: false,
      progress: 0,
      stage: 'idle',
    });
  }, []);

  return {
    processingState,
    processedImages,
    qualitySettings,
    setQualitySettings,
    processImage,
    reprocessImage,
    removeProcessedImage,
    cleanup,
  };
} 