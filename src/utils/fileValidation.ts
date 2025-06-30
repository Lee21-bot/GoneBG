export const FILE_SIZE_LIMITS = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  RECOMMENDED_SIZE: 5 * 1024 * 1024, // 5MB
  AUTO_COMPRESS_THRESHOLD: 2 * 1024 * 1024 // 2MB
};

export const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
export const MAX_DIMENSIONS = { width: 4000, height: 4000 };

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
  needsCompression: boolean;
  estimatedProcessingTime: string;
  fileSize: number;
}

export const validateFile = (file: File): FileValidationResult => {
  // Check file type
  if (!SUPPORTED_FORMATS.includes(file.type)) {
    return {
      isValid: false,
      error: 'Unsupported file format. Please use JPG, PNG, WebP, or HEIC.',
      needsCompression: false,
      estimatedProcessingTime: '',
      fileSize: file.size
    };
  }

  // Check file size
  if (file.size > FILE_SIZE_LIMITS.MAX_SIZE) {
    return {
      isValid: false,
      error: `File too large (${formatFileSize(file.size)}). Maximum size is 10MB.`,
      needsCompression: false,
      estimatedProcessingTime: '',
      fileSize: file.size
    };
  }

  // Determine if compression is needed
  const needsCompression = file.size > FILE_SIZE_LIMITS.AUTO_COMPRESS_THRESHOLD;
  
  return {
    isValid: true,
    needsCompression,
    estimatedProcessingTime: getEstimatedProcessingTime(file.size),
    fileSize: file.size
  };
};

export const getEstimatedProcessingTime = (fileSize: number): string => {
  if (fileSize < 1024 * 1024) return "< 5 seconds";
  if (fileSize < 5 * 1024 * 1024) return "5-15 seconds";
  return "15-30 seconds";
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getCompressionMessage = (fileSize: number): string => {
  if (fileSize > FILE_SIZE_LIMITS.RECOMMENDED_SIZE) {
    return `⚠️ Large file detected (${formatFileSize(fileSize)}). Processing may take ${getEstimatedProcessingTime(fileSize)}.`;
  }
  if (fileSize > FILE_SIZE_LIMITS.AUTO_COMPRESS_THRESHOLD) {
    return `Large image optimized for faster processing`;
  }
  return '';
}; 