import { useState } from 'react';

const HelpTabs = () => {
  const [activeTab, setActiveTab] = useState('usage');

  const tabs = [
    { id: 'usage', label: 'How to Use', icon: '📚' },
    { id: 'howitworks', label: 'How It Works', icon: '🔬' },
    { id: 'quality', label: 'Quality Settings', icon: '⚙️' },
    { id: 'tips', label: 'Pro Tips', icon: '💡' },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: '🔧' }
  ];

  return (
    <div className="mb-6 bg-white rounded-lg border shadow-sm">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'usage' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Getting Started</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Choose your quality preset (Fast Mode recommended for most images)</li>
                <li>Upload an image by dragging & dropping or clicking to select</li>
                <li>Wait for AI processing to complete (10 seconds to 2 minutes depending on preset)</li>
                <li>Download your processed image with transparent background</li>
                <li>Click "Process Another Image" to continue</li>
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Supported Formats</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Input Formats:</strong>
                    <ul className="list-disc list-inside mt-2 text-gray-600">
                      <li>JPEG (.jpg, .jpeg)</li>
                      <li>PNG (.png)</li>
                      <li>WebP (.webp)</li>
                      <li>HEIC (.heic)</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Limits:</strong>
                    <ul className="list-disc list-inside mt-2 text-gray-600">
                      <li>Max size: 10MB</li>
                      <li>Max dimensions: 4000×4000px</li>
                      <li>Output: PNG with transparency</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Start Presets</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">⚡ Fast Mode (Recommended)</h4>
                  <p className="text-sm text-blue-700">Uses IS-Net Quantized model for excellent quality with fast processing (~10-20 seconds). Perfect for most images.</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-yellow-900 mb-2">🎯 Balanced</h4>
                  <p className="text-sm text-yellow-700">Uses standard IS-Net model for slightly better precision. Good balance of speed and quality (~30-45 seconds).</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900 mb-2">🏆 Maximum Quality</h4>
                  <p className="text-sm text-green-700">Uses IS-Net FP16 for absolute best results. Slower processing (1-2 minutes) but highest precision.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'howitworks' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Overview</h3>
              <p className="text-gray-700 mb-4">
                Our background removal tool uses IS-Net, a state-of-the-art deep learning model specifically designed for salient object segmentation. Here's how the process works:
              </p>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                  <h4 className="font-medium text-blue-900 mb-2">🧠 Step 1: IS-Net AI Processing</h4>
                  <p className="text-sm text-blue-800 mb-2">
                    IS-Net (Intermediate Supervision Network) analyzes your image using advanced deep learning to identify the main subject and separate it from the background.
                  </p>
                  <ul className="text-xs text-blue-700 list-disc list-inside space-y-1">
                    <li><strong>IS-Net Quantized:</strong> Fastest model, optimized for speed with excellent quality</li>
                    <li><strong>IS-Net Standard:</strong> Balanced model for higher precision</li>
                    <li><strong>IS-Net FP16:</strong> Maximum quality model with highest accuracy</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                  <h4 className="font-medium text-green-900 mb-2">🎯 Step 2: Precise Segmentation</h4>
                  <p className="text-sm text-green-800 mb-2">
                    IS-Net creates an extremely accurate segmentation mask that precisely identifies subject boundaries with smooth, natural edges.
                  </p>
                  <ul className="text-xs text-green-700 list-disc list-inside space-y-1">
                    <li><strong>Deep Feature Analysis:</strong> Multi-level feature extraction for accuracy</li>
                    <li><strong>Edge Refinement:</strong> Automatic edge smoothing and anti-aliasing</li>
                    <li><strong>Context Awareness:</strong> Understands object relationships and boundaries</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                  <h4 className="font-medium text-purple-900 mb-2">🎨 Step 3: Transparent Output</h4>
                  <p className="text-sm text-purple-800 mb-2">
                    The final step converts the segmentation mask into a clean PNG image with transparent background.
                  </p>
                  <ul className="text-xs text-purple-700 list-disc list-inside space-y-1">
                    <li><strong>Alpha Channel:</strong> Creates precise transparency information</li>
                    <li><strong>Quality Control:</strong> Configurable output quality and format</li>
                    <li><strong>Optimization:</strong> Efficient compression while preserving quality</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Advanced Algorithms</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">🌊 Flood Fill Algorithm</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Identifies and removes background regions that the AI missed:
                  </p>
                  <ul className="text-xs text-gray-600 list-disc list-inside space-y-1">
                    <li>Starts from image edges (likely background)</li>
                    <li>Spreads to connected pixels below threshold</li>
                    <li>Removes isolated "islands" of background</li>
                    <li>Uses 8-directional connectivity</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">🎨 Color Analysis</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Analyzes background colors for additional cleanup:
                  </p>
                  <ul className="text-xs text-gray-600 list-disc list-inside space-y-1">
                    <li>Samples colors from image edges</li>
                    <li>Calculates RGB color distance</li>
                    <li>Removes similar colors throughout image</li>
                    <li>Adjustable tolerance (0-60)</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">📐 Morphological Operations</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Mathematical operations to smooth edges:
                  </p>
                  <ul className="text-xs text-gray-600 list-disc list-inside space-y-1">
                    <li><strong>Dilation:</strong> Expands white areas (subject)</li>
                    <li><strong>Erosion:</strong> Contracts white areas</li>
                    <li>Combined to close gaps and smooth contours</li>
                    <li>Reduces noise and artifacts</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">🌀 Gaussian Blur</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Creates natural edge feathering:
                  </p>
                  <ul className="text-xs text-gray-600 list-disc list-inside space-y-1">
                    <li>Applies weighted averaging to edge pixels</li>
                    <li>Creates smooth alpha transitions</li>
                    <li>Eliminates harsh cutout appearance</li>
                    <li>Customizable radius (0-8px)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Processing Pipeline</h3>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border">
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                  <div className="flex-1 text-center">
                    <div className="bg-white p-3 rounded-lg shadow-sm border-2 border-blue-200">
                      <div className="text-2xl mb-1">📷</div>
                      <div className="text-sm font-medium">Input Image</div>
                    </div>
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="flex-1 text-center">
                    <div className="bg-white p-3 rounded-lg shadow-sm border-2 border-green-200">
                      <div className="text-2xl mb-1">🧠</div>
                      <div className="text-sm font-medium">AI Segmentation</div>
                    </div>
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="flex-1 text-center">
                    <div className="bg-white p-3 rounded-lg shadow-sm border-2 border-purple-200">
                      <div className="text-2xl mb-1">🔧</div>
                      <div className="text-sm font-medium">Post-Processing</div>
                    </div>
                  </div>
                  <div className="text-gray-400">→</div>
                  <div className="flex-1 text-center">
                    <div className="bg-white p-3 rounded-lg shadow-sm border-2 border-orange-200">
                      <div className="text-2xl mb-1">✨</div>
                      <div className="text-sm font-medium">Final Result</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm text-gray-600">
                  Complete process typically takes 1-5 seconds depending on image size and quality settings
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Why This Approach Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">✅ Advantages</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>Fast processing:</strong> Runs entirely in browser</li>
                    <li>• <strong>No server required:</strong> Privacy-friendly, works offline</li>
                    <li>• <strong>Multiple algorithms:</strong> Catches what AI misses</li>
                    <li>• <strong>Customizable:</strong> Adjust for different image types</li>
                    <li>• <strong>Real-time:</strong> See results immediately</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">⚠️ Limitations</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>AI training:</strong> Works best on human subjects</li>
                    <li>• <strong>Complex scenes:</strong> Struggles with intricate backgrounds</li>
                    <li>• <strong>Fine details:</strong> Hair and transparent objects challenging</li>
                    <li>• <strong>Similar colors:</strong> Subject must contrast with background</li>
                    <li>• <strong>Browser dependent:</strong> Performance varies by device</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'quality' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Understanding Quality Settings</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">🎯 Sensitivity (80-160)</h4>
                  <p className="text-sm text-gray-700 mb-2">Controls how aggressively the background is removed.</p>
                  <ul className="text-xs text-gray-600 list-disc list-inside">
                    <li><strong>Lower (80-100):</strong> More aggressive, removes more background but may cut into subject</li>
                    <li><strong>Higher (140-160):</strong> Less aggressive, preserves subject but may leave background</li>
                    <li><strong>Sweet spot (110-130):</strong> Good balance for most images</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">🎨 Edge Softness (0-8px)</h4>
                  <p className="text-sm text-gray-700 mb-2">Controls how soft or sharp the edges appear.</p>
                  <ul className="text-xs text-gray-600 list-disc list-inside">
                    <li><strong>0-1px:</strong> Sharp, crisp edges for logos/graphics</li>
                    <li><strong>3-5px:</strong> Natural looking edges for photos</li>
                    <li><strong>6-8px:</strong> Very soft, artistic effect</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">🔧 Advanced Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Aggressive Mode:</strong> Lowers thresholds for maximum background removal</p>
                      <p><strong>Multi-pass Processing:</strong> Runs multiple cleaning passes for better results</p>
                    </div>
                    <div>
                      <p><strong>Flood Fill:</strong> Removes isolated background regions AI missed</p>
                      <p><strong>Color Cleanup:</strong> Removes pixels similar to detected background colors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Professional Tips</h3>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                  <h4 className="font-medium text-blue-900 mb-2">📸 For Portrait Photos</h4>
                  <ul className="text-sm text-blue-800 list-disc list-inside space-y-1">
                    <li>Start with "High Quality" preset</li>
                    <li>Keep edge softness at 3-5px for natural look</li>
                    <li>Enable edge smoothing to reduce artifacts</li>
                    <li>Use sensitivity 110-130 range</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                  <h4 className="font-medium text-green-900 mb-2">🎨 For Objects & Products</h4>
                  <ul className="text-sm text-green-800 list-disc list-inside space-y-1">
                    <li>Try "Max Removal" for complex backgrounds</li>
                    <li>Adjust sensitivity based on background complexity</li>
                    <li>Use flood fill for scattered background elements</li>
                    <li>Lower edge softness (1-2px) for sharp product shots</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                  <h4 className="font-medium text-purple-900 mb-2">🔥 For Stubborn Backgrounds</h4>
                  <ul className="text-sm text-purple-800 list-disc list-inside space-y-1">
                    <li>Enable "Aggressive Mode" and "Max Removal" preset</li>
                    <li>Increase "Color Cleanup" to 40-60</li>
                    <li>Lower sensitivity to 80-100 range</li>
                    <li>Enable all advanced features (multi-pass, flood fill)</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                  <h4 className="font-medium text-yellow-900 mb-2">⚡ For Speed</h4>
                  <ul className="text-sm text-yellow-800 list-disc list-inside space-y-1">
                    <li>Use "Fast" preset for quick testing</li>
                    <li>Disable multi-pass processing</li>
                    <li>Set edge softness to 0-1px</li>
                    <li>Turn off advanced features if not needed</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Best Practices</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✅ <strong>Good contrast:</strong> Clear difference between subject and background</li>
                  <li>✅ <strong>Well-lit subjects:</strong> Avoid shadows on the subject edges</li>
                  <li>✅ <strong>Simple backgrounds:</strong> Solid colors work better than complex patterns</li>
                  <li>✅ <strong>High resolution:</strong> Larger images generally produce better results</li>
                  <li>❌ <strong>Avoid:</strong> Very similar colors between subject and background</li>
                  <li>❌ <strong>Avoid:</strong> Transparent or semi-transparent subjects (glass, hair)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'troubleshooting' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Issues & Solutions</h3>
              
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-900 mb-2">❌ Background not fully removed</h4>
                  <div className="text-sm text-red-800">
                    <p className="mb-2"><strong>Solutions:</strong></p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Try "Max Removal" preset</li>
                      <li>Enable "Aggressive Mode"</li>
                      <li>Lower sensitivity to 80-100</li>
                      <li>Increase "Color Cleanup" to 40-60</li>
                      <li>Enable "Flood Fill" for scattered elements</li>
                    </ol>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h4 className="font-medium text-orange-900 mb-2">⚠️ Subject edges look jagged</h4>
                  <div className="text-sm text-orange-800">
                    <p className="mb-2"><strong>Solutions:</strong></p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Enable "Edge Smoothing"</li>
                      <li>Increase "Edge Softness" to 3-5px</li>
                      <li>Use "High Quality" model</li>
                      <li>Disable "Aggressive Mode"</li>
                    </ol>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-yellow-900 mb-2">⚠️ Part of subject removed</h4>
                  <div className="text-sm text-yellow-800">
                    <p className="mb-2"><strong>Solutions:</strong></p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Increase sensitivity to 130-150</li>
                      <li>Disable "Aggressive Mode"</li>
                      <li>Reduce "Color Cleanup" to 10-20</li>
                      <li>Try "Balanced" or "High Quality" preset</li>
                    </ol>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">🐌 Processing too slow</h4>
                  <div className="text-sm text-blue-800">
                    <p className="mb-2"><strong>Solutions:</strong></p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Use "Fast" preset</li>
                      <li>Disable "Multi-pass Processing"</li>
                      <li>Reduce image size before uploading</li>
                      <li>Turn off advanced features</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Image Requirements</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">✅ Works Best With:</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Clear subject-background separation</li>
                      <li>• Good lighting and contrast</li>
                      <li>• Solid or simple backgrounds</li>
                      <li>• High resolution images</li>
                      <li>• People, objects, products</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">❌ Challenging Cases:</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Transparent materials (glass)</li>
                      <li>• Fine details (hair, fur)</li>
                      <li>• Similar colors to background</li>
                      <li>• Very complex backgrounds</li>
                      <li>• Low resolution/blurry images</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpTabs; 