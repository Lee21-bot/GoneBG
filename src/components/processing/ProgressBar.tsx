import { type ProcessingState } from '../../hooks/useBackgroundRemoval';

interface ProgressBarProps {
  processingState: ProcessingState;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ processingState }) => {
  const { isProcessing, progress, stage, error } = processingState;

  if (!isProcessing && stage !== 'error' && stage !== 'complete') {
    return null;
  }

  const getStageText = (stage: string) => {
    switch (stage) {
      case 'uploading': return 'Preparing image...';
      case 'compressing': return 'Optimizing image size...';
      case 'processing': return 'Removing background...';
      case 'complete': return 'Complete!';
      case 'error': return 'Error occurred';
      default: return 'Processing...';
    }
  };

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'uploading':
        return (
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        );
      case 'compressing':
        return (
          <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        );
      case 'processing':
        return (
          <svg className="w-5 h-5 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        );
      case 'complete':
        return (
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <div className="flex items-center space-x-3 mb-2">
        {getStageIcon(stage)}
        <span className={`text-base font-medium ${error ? 'text-red-600' : 'text-gray-700'}`}>
          {getStageText(stage)}
        </span>
      </div>
      
      {error && (
        <div className="text-base text-red-600 mb-2">
          {error}
        </div>
      )}

      {(isProcessing || stage === 'complete') && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              stage === 'complete' ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {progress > 0 && (
        <div className="text-sm text-gray-500 mt-1 text-center">
          {progress}%
        </div>
      )}
    </div>
  );
};

export default ProgressBar; 