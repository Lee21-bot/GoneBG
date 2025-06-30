import { useState } from 'react';

interface DownloadButtonProps {
  imageFile?: File;
  canvas?: HTMLCanvasElement;
  filename?: string;
  className?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ 
  imageFile,
  canvas,
  filename = 'bg-removed-image.png',
  className = ''
}) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copying' | 'success' | 'error'>('idle');

  const handleDownload = () => {
    if (imageFile) {
      // Download from File
      const url = URL.createObjectURL(imageFile);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else if (canvas) {
      // Download from Canvas (legacy support)
      const link = document.createElement('a');
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const handleCopyToClipboard = async () => {
    setCopyStatus('copying');
    
    try {
      if (imageFile) {
        // Copy File to clipboard
        await navigator.clipboard.write([
          new ClipboardItem({ [imageFile.type]: imageFile })
        ]);
        setCopyStatus('success');
      } else if (canvas) {
        // Copy Canvas to clipboard (legacy support)
        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
          }, 'image/png');
        });
        
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setCopyStatus('success');
      } else {
        setCopyStatus('error');
      }
      
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  const getCopyButtonText = () => {
    switch (copyStatus) {
      case 'copying': return 'Copying...';
      case 'success': return 'Copied!';
      case 'error': return 'Failed';
      default: return 'Copy';
    }
  };

  const getCopyButtonIcon = () => {
    switch (copyStatus) {
      case 'copying':
        return (
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        );
      case 'success':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  return (
    <div className={`flex space-x-2 ${className}`}>
      <button
        onClick={handleDownload}
        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span>Download PNG</span>
      </button>

      <button
        onClick={handleCopyToClipboard}
        disabled={copyStatus === 'copying'}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
          copyStatus === 'success' 
            ? 'bg-green-100 text-green-700 border border-green-300'
            : copyStatus === 'error'
            ? 'bg-red-100 text-red-700 border border-red-300'
            : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
        }`}
      >
        {getCopyButtonIcon()}
        <span>{getCopyButtonText()}</span>
      </button>
    </div>
  );
};

export default DownloadButton; 