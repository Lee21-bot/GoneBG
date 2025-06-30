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

  return (
    <button
      onClick={handleDownload}
      className={`flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors ${className}`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <span>Download PNG</span>
    </button>
  );
};

export default DownloadButton; 