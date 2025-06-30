import { useState } from 'react';
import { type ProcessedImage } from '../../hooks/useBackgroundRemoval';
import DownloadButton from '../export/DownloadButton';
import { formatFileSize } from '../../utils/fileValidation';

interface ImageProcessorProps {
  processedImage: ProcessedImage;
  onRemove: () => void;
  onReprocess: () => void;
  isProcessing: boolean;
}

const ImageProcessor: React.FC<ImageProcessorProps> = ({
  processedImage,
  onRemove,
  onReprocess,
  isProcessing
}) => {
  const [originalImageUrl] = useState<string>(() => 
    URL.createObjectURL(processedImage.originalFile)
  );
  const [processedImageUrl] = useState<string>(() => 
    URL.createObjectURL(processedImage.processedFile)
  );

  const { originalFile, processedFile, originalImage, fileValidation, processingTime } = processedImage;

  const copyToClipboard = async () => {
    try {
      // Create a canvas to convert the processed image to clipboard format
      const img = new Image();
      img.src = processedImageUrl;
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image'));
      });

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Failed to get canvas context');

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
        }, 'image/png');
      });

      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);

      alert('Image copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      alert('Failed to copy to clipboard. You can still download the image.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      {/* Header with file info */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">{originalFile.name}</h3>
          <p className="text-base text-gray-600">
            {formatFileSize(fileValidation.fileSize)} • {originalImage.width} × {originalImage.height}px
          </p>
        </div>
        <div className="text-right">
          <p className="text-base text-gray-600">Processing time</p>
          <p className="font-semibold text-gray-900">{(processingTime / 1000).toFixed(1)}s</p>
        </div>
      </div>
      
      {fileValidation.needsCompression && (
        <div className="mt-2 flex items-center justify-center space-x-2 text-sm text-blue-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Image was optimized for faster processing</span>
        </div>
      )}

      {/* Image comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative bg-gray-50 rounded-lg overflow-hidden">
          <img
            src={originalImageUrl}
            alt="Original"
            className="w-full h-auto max-h-64 object-contain"
          />
          <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
            Original
          </div>
        </div>
        
        <div className="relative bg-transparent rounded-lg overflow-hidden" style={{
          backgroundImage: `
            linear-gradient(45deg, #ccc 25%, transparent 25%), 
            linear-gradient(-45deg, #ccc 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #ccc 75%), 
            linear-gradient(-45deg, transparent 75%, #ccc 75%)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        }}>
          <img
            src={processedImageUrl}
            alt="Background Removed"
            className="w-full h-auto max-h-64 object-contain"
          />
          <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
            Transparent
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <DownloadButton 
          filename={`${originalFile.name.split('.')[0]}-bg-removed.png`}
          imageFile={processedFile}
        />
        
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          <span>Copy</span>
        </button>

        <button
          onClick={onReprocess}
          disabled={isProcessing}
          className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Redo with New Settings</span>
        </button>

        <button
          onClick={onRemove}
          className="inline-flex items-center space-x-2 text-red-600 hover:text-red-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ImageProcessor; 