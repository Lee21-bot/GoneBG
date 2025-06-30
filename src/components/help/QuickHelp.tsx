import { useState } from 'react';

const QuickHelp = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-base text-blue-600 hover:text-blue-800 transition-colors font-semibold"
      >
        <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <span>📚 Quick Help & Tips</span>
      </button>

      {isOpen && (
        <div className="mt-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
            <div>
              <h4 className="font-medium text-blue-900 mb-2 text-lg">🎯 Quick Start:</h4>
              <ul className="text-blue-800 space-y-1">
                <li>• <strong>"Fast Mode"</strong> works excellently for all images (recommended)</li>
                <li>• <strong>"Balanced"</strong> for slightly better precision</li>
                <li>• <strong>"Maximum Quality"</strong> for absolute best results (slower)</li>
                <li>• Works great on logos, objects, people, and complex images</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-2 text-lg">⚡ Performance Tips:</h4>
              <ul className="text-blue-800 space-y-1">
                <li>• <strong>Fast Mode</strong> processes in ~10-20 seconds</li>
                <li>• <strong>Maximum Quality</strong> can take 1-2 minutes</li>
                <li>• Smaller images (under 2MB) process faster</li>
                <li>• PNG format preserves transparency best</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2 text-lg">🤖 AI Technology:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-700">
              <div>• <strong>IS-Net AI Models:</strong> Advanced deep learning for precise edge detection</div>
              <div>• <strong>Smart Processing:</strong> Automatically optimized for each image type</div>
              <div>• <strong>Professional Quality:</strong> Used in commercial image editing tools</div>
              <div>• <strong>No Manual Adjustments:</strong> AI handles everything automatically</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickHelp; 