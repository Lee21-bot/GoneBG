import { useState } from 'react';
import { type BackgroundRemovalOptions } from '../../utils/backgroundRemoval';

interface QualitySettingsProps {
  onSettingsChange: (settings: BackgroundRemovalOptions) => void;
  isProcessing: boolean;
}

const QualitySettings: React.FC<QualitySettingsProps> = ({ onSettingsChange, isProcessing }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<BackgroundRemovalOptions>({
    model: 'isnet_quint8', // Default to fastest model for better UX
    output: {
      format: 'image/png',
      quality: 0.95,
    },
  });

  const handleSettingChange = (key: keyof BackgroundRemovalOptions, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const handleOutputChange = (key: 'format' | 'quality', value: any) => {
    const newSettings = {
      ...settings,
      output: {
        ...settings.output,
        [key]: value,
      },
    };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  // Quick presets
  const applyPreset = (presetName: string) => {
    let presetSettings: BackgroundRemovalOptions;
    
    switch (presetName) {
      case 'speed':
        presetSettings = {
          model: 'isnet_quint8', // Fastest model
          output: {
            format: 'image/png',
            quality: 0.9,
          },
        };
        break;
      case 'balanced':
        presetSettings = {
          model: 'isnet', // Balanced model
          output: {
            format: 'image/png',
            quality: 1.0,
          },
        };
        break;
      case 'quality':
        presetSettings = {
          model: 'isnet_fp16', // High quality model
          output: {
            format: 'image/png',
            quality: 1.0,
          },
        };
        break;
      default:
        return;
    }
    
    setSettings(presetSettings);
    onSettingsChange(presetSettings);
  };

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isProcessing}
        className="flex items-center space-x-2 text-base text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
      >
        <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <span>Quality Settings</span>
      </button>

      {isOpen && (
        <div className="mt-3 p-4 bg-gray-50 rounded-lg border space-y-4">
          {/* Quick Presets */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-3">
              Quick Presets
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <button
                onClick={() => applyPreset('speed')}
                disabled={isProcessing}
                className="px-3 py-2 text-sm bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                ⚡ Fast Mode (Recommended)
              </button>
              <button
                onClick={() => applyPreset('balanced')}
                disabled={isProcessing}
                className="px-3 py-2 text-sm bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                🎯 Balanced
              </button>
              <button
                onClick={() => applyPreset('quality')}
                disabled={isProcessing}
                className="px-3 py-2 text-sm bg-green-100 text-green-800 rounded-lg hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                🏆 Maximum Quality
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              "Fast Mode" works excellently for logos, objects, and people with much faster processing
            </p>
          </div>

          {/* Model Selection */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              AI Model
            </label>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="modelSelection"
                  checked={settings.model === 'isnet'}
                  onChange={() => handleSettingChange('model', 'isnet')}
                  className="mr-3"
                />
                <span className="text-base">🎯 IS-Net (Balanced - works for all images)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="modelSelection"
                  checked={settings.model === 'isnet_fp16'}
                  onChange={() => handleSettingChange('model', 'isnet_fp16')}
                  className="mr-3"
                />
                <span className="text-base">🏆 IS-Net FP16 (Highest quality, slower)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="modelSelection"
                  checked={settings.model === 'isnet_quint8'}
                  onChange={() => handleSettingChange('model', 'isnet_quint8')}
                  className="mr-3"
                />
                <span className="text-base">⚡ IS-Net Quantized (Fastest, good quality)</span>
              </label>
            </div>
          </div>

          {/* Output Format */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Output Format
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="outputFormat"
                  checked={settings.output?.format === 'image/png'}
                  onChange={() => handleOutputChange('format', 'image/png')}
                  className="mr-2"
                />
                <span className="text-base">PNG (Recommended)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="outputFormat"
                  checked={settings.output?.format === 'image/webp'}
                  onChange={() => handleOutputChange('format', 'image/webp')}
                  className="mr-2"
                />
                <span className="text-base">WebP (Smaller file)</span>
              </label>
            </div>
          </div>

          {/* Quality Slider */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Output Quality: {Math.round((settings.output?.quality || 1.0) * 100)}%
            </label>
            <input
              type="range"
              min="0.5"
              max="1.0"
              step="0.1"
              value={settings.output?.quality || 1.0}
              onChange={(e) => handleOutputChange('quality', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>Smaller file</span>
              <span>Best quality</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QualitySettings; 