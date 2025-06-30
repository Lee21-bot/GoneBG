import React, { useRef, useState, useEffect } from 'react';

interface MaskEditorProps {
  imageUrl: string; // The processed (background-removed) image
  originalImageUrl: string; // The original image (for restoration)
  width?: number;
  height?: number;
}

const BRUSH_SIZES = [4, 8, 16, 32]; // Small, Medium, Large, XL

const MaskEditor: React.FC<MaskEditorProps> = ({ imageUrl, originalImageUrl, width = 400, height = 400 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const originalImageRef = useRef<HTMLImageElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);
  const [painting, setPainting] = useState(false);
  const [mode, setMode] = useState<'restore' | 'erase'>('restore');
  const [brushSize, setBrushSize] = useState(16); // Default to medium brush

  // Initialize the mask from the processed image
  const initializeMask = () => {
    const maskCanvas = maskCanvasRef.current;
    const ctx = maskCanvas?.getContext('2d');
    const img = imageRef.current;
    
    if (maskCanvas && ctx && img && img.complete) {
      maskCanvas.width = width;
      maskCanvas.height = height;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      
      // Extract alpha channel as initial mask (preserves existing transparency)
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      // Create a grayscale mask: white = visible, black = transparent
      // Gray values = restoration areas (initially none)
      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3];
        const maskValue = alpha > 128 ? 128 : 0; // Start at 128 (gray) for existing content
        data[i] = maskValue;     // R
        data[i + 1] = maskValue; // G  
        data[i + 2] = maskValue; // B
        data[i + 3] = 255;       // A
      }
      
      ctx.putImageData(imageData, 0, 0);
      updateCanvas();
    }
  };

  // Composite the final result
  const updateCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const originalImg = originalImageRef.current;
    const processedImg = imageRef.current;
    const maskCanvas = maskCanvasRef.current;
    
    if (canvas && ctx && originalImg && processedImg && maskCanvas && originalImg.complete && processedImg.complete) {
      ctx.clearRect(0, 0, width, height);
      
      // Start with the processed (background-removed) image
      ctx.drawImage(processedImg, 0, 0, width, height);
      
      // Get the current mask
      const maskCtx = maskCanvas.getContext('2d');
      if (!maskCtx) return;
      
      const maskImageData = maskCtx.getImageData(0, 0, width, height);
      const maskData = maskImageData.data;
      
      // Create a temporary canvas for the original image
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = width;
      tempCanvas.height = height;
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;
      
      tempCtx.drawImage(originalImg, 0, 0, width, height);
      const originalImageData = tempCtx.getImageData(0, 0, width, height);
      const originalData = originalImageData.data;
      
      // Get the current canvas data
      const currentImageData = ctx.getImageData(0, 0, width, height);
      const currentData = currentImageData.data;
      
             // Composite based on mask with three states:
       // White (255) = show original image (restored areas)
       // Gray (128) = show processed image (default content)  
       // Black (0) = transparent (erased areas)
       for (let i = 0; i < maskData.length; i += 4) {
         const maskValue = maskData[i]; // Red channel (grayscale mask)
         
         if (maskValue > 200) { // White areas - show original image (restored)
           currentData[i] = originalData[i];         // R
           currentData[i + 1] = originalData[i + 1]; // G
           currentData[i + 2] = originalData[i + 2]; // B
           currentData[i + 3] = originalData[i + 3]; // A
         } else if (maskValue < 64) { // Black areas - transparent (erased)
           currentData[i + 3] = 0; // Make transparent
         }
         // For gray areas (64-200), keep the processed image as-is
       }
      
      ctx.putImageData(currentImageData, 0, 0);
    }
  };

  // Load images and initialize
  useEffect(() => {
    const img = imageRef.current;
    const originalImg = originalImageRef.current;
    
    if (img && originalImg) {
      let loadedCount = 0;
      const onLoad = () => {
        loadedCount++;
        if (loadedCount === 2) {
          initializeMask();
        }
      };
      
      if (img.complete && originalImg.complete) {
        initializeMask();
      } else {
        img.onload = onLoad;
        originalImg.onload = onLoad;
      }
    }
  }, [imageUrl, originalImageUrl, width, height]);

  // Draw brush stroke on mask
  const paint = (x: number, y: number) => {
    const maskCanvas = maskCanvasRef.current;
    const ctx = maskCanvas?.getContext('2d');
    if (!ctx) return;
    
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.beginPath();
            ctx.arc(x, y, brushSize, 0, 2 * Math.PI);
    ctx.fillStyle = mode === 'restore' ? 'white' : 'black';
    ctx.fill();
    ctx.restore();
    
    updateCanvas();
  };

  // Mouse/touch events
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setPainting(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    paint(x, y);
  };
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!painting) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    paint(x, y);
  };
  const handlePointerUp = () => setPainting(false);

  // Download the edited image
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'edited.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative" style={{ width, height }}>
        {/* Hidden images for loading */}
        <img
          ref={imageRef}
          src={imageUrl}
          alt="Processed"
          style={{ display: 'none' }}
        />
        <img
          ref={originalImageRef}
          src={originalImageUrl}
          alt="Original"
          style={{ display: 'none' }}
        />
        
        {/* Hidden mask canvas */}
        <canvas
          ref={maskCanvasRef}
          style={{ display: 'none' }}
        />
        
        {/* Main editing canvas with transparency background */}
        <div 
          className="relative rounded-lg overflow-hidden"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #e5e1d6 25%, transparent 25%), 
              linear-gradient(-45deg, #e5e1d6 25%, transparent 25%), 
              linear-gradient(45deg, transparent 75%, #e5e1d6 75%), 
              linear-gradient(-45deg, transparent 75%, #e5e1d6 75%)
            `,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }}
        >
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            style={{ 
              border: '2px solid #bbb', 
              borderRadius: 8, 
              cursor: mode === 'restore' ? 'crosshair' : 'crosshair',
              display: 'block'
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          />
        </div>
        
        <div className="absolute top-2 left-2 bg-white/80 rounded shadow px-2 py-1 text-xs font-semibold">
          Mode: <span className={mode === 'restore' ? 'text-green-600' : 'text-red-600'}>{mode}</span>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-3">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded font-bold ${mode === 'restore' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setMode('restore')}
          >
            Restore
          </button>
          <button
            className={`px-4 py-2 rounded font-bold ${mode === 'erase' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setMode('erase')}
          >
            Erase
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white font-bold"
            onClick={handleDownload}
          >
            Download PNG
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Brush Size:</span>
          <div className="flex space-x-1">
            {BRUSH_SIZES.map((size) => (
              <button
                key={size}
                onClick={() => setBrushSize(size)}
                className={`w-8 h-8 rounded border-2 transition-colors flex items-center justify-center ${
                  brushSize === size
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                title={`${size}px brush`}
              >
                <div
                  className="rounded-full bg-gray-600"
                  style={{ 
                    width: Math.min(size / 2, 12), 
                    height: Math.min(size / 2, 12) 
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-500">Tip: Use Restore to add back missing parts, Erase to remove more. Download when done.</div>
    </div>
  );
};

export default MaskEditor; 