import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useBackgroundRemoval } from '../../hooks/useBackgroundRemoval';
import { validateFile } from '../../utils/fileValidation';
import ProgressBar from '../processing/ProgressBar';
import ImageProcessor from '../processing/ImageProcessor';
import QualitySettings from '../processing/QualitySettings';
import QuickHelp from '../help/QuickHelp';

const ImageUpload = () => {
  const {
    processingState,
    processedImages,
    qualitySettings,
    setQualitySettings,
    processImage,
    reprocessImage,
    removeProcessedImage,
    cleanup
  } = useBackgroundRemoval();

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]; // Process one file at a time for MVP
      const validation = validateFile(file);
      
      if (validation.isValid) {
        processImage(file, qualitySettings);
      }
    }
  }, [processImage]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'image/heic': ['.heic']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false
  });

  const handleTryAnother = () => {
    // Clear processed images to allow new upload
    removeProcessedImage(0); // Remove the first (and only) processed image
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Quality Settings */}
      <QualitySettings 
        onSettingsChange={setQualitySettings}
        isProcessing={processingState.isProcessing}
      />

      {/* Quick Help */}
      <QuickHelp />

      {/* Upload Area */}
      {processedImages.length === 0 && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : processingState.stage === 'error'
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center">
            <div className="text-center">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 mb-4"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {isDragActive ? 'Drop your image here' : 'Upload your image'}
              </h3>
              
              <p className="text-base text-gray-700 mb-4 font-medium">
                {isDragActive 
                  ? 'Release to start processing' 
                  : 'Drag and drop an image here, or click to select'
                }
              </p>
              
              <div className="text-base text-gray-500 mb-4">
                <p>Supports: JPG, PNG, WebP, HEIC</p>
                <p>Max size: 10MB • Max dimensions: 4000×4000px</p>
              </div>
              <p className="text-sm text-gray-500">PNG, JPG, WebP up to 10MB</p>
            </div>
          </div>
        </div>
      )}

      {/* File Rejection Errors */}
      {fileRejections.length > 0 && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h4 className="text-red-800 font-medium mb-2">Upload Error:</h4>
          {fileRejections.map(({ file, errors }) => (
            <div key={file.name} className="text-red-700 text-sm">
              <strong>{file.name}:</strong>
              <ul className="list-disc list-inside ml-4">
                {errors.map((error) => (
                  <li key={error.code}>
                    {error.code === 'file-too-large' 
                      ? 'File too large. Maximum size is 10MB.'
                      : error.code === 'file-invalid-type'
                      ? 'Invalid file type. Please use JPG, PNG, WebP, or HEIC.'
                      : error.message
                    }
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Processing Progress */}
      <ProgressBar processingState={processingState} />

      {/* File Size Warning */}
      {processingState.isProcessing && processedImages.length === 0 && (
        <div className="mt-4 text-center text-sm text-gray-600">
          Processing your image... This may take a few moments for larger files.
        </div>
      )}

      {/* Processed Images */}
      {processedImages.map((processedImage, index) => (
        <ImageProcessor
          key={`${processedImage.originalFile.name}-${index}`}
          processedImage={processedImage}
          onRemove={() => removeProcessedImage(index)}
          onReprocess={() => reprocessImage(index)}
          isProcessing={processingState.isProcessing}
        />
      ))}

      {/* Try Another Button */}
      {processedImages.length > 0 && (
        <div className="text-center mt-6">
          <button
            onClick={handleTryAnother}
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Process Another Image</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload; 