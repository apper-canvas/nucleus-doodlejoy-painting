import { forwardRef, useEffect, useState, useCallback } from 'react';
import { canvasConfig } from '../../constants/canvasConfig';
import { getCanvasCoordinates } from '../../utils/canvasUtils';

/**
 * @ai-context Main drawing canvas component with mouse and touch drawing support
 * @dependencies canvasConfig, canvasUtils
 * @modifiable-sections drawing-logic, event-handlers, canvas-setup
 */
const DrawingCanvas = forwardRef(({ 
  brushColor, 
  brushSize, 
  onDrawingStart, 
  onDrawingEnd 
}, ref) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  // Setup canvas when component mounts
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvasConfig.width;
    canvas.height = canvasConfig.height;
    
    // Set canvas style size for responsive display
    canvas.style.width = '100%';
    canvas.style.height = 'auto';
    canvas.style.maxHeight = '70vh';
    
    // Configure drawing context
    ctx.lineCap = canvasConfig.lineCap;
    ctx.lineJoin = canvasConfig.lineJoin;
    ctx.fillStyle = canvasConfig.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [ref]);

  const startDrawing = useCallback((e) => {
    const canvas = ref.current;
    if (!canvas) return;

    setIsDrawing(true);
    const coords = getCanvasCoordinates(e, canvas);
    setLastPosition(coords);
    onDrawingStart?.();
  }, [ref, onDrawingStart]);

  const draw = useCallback((e) => {
    if (!isDrawing) return;
    
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const coords = getCanvasCoordinates(e, canvas);

    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    
    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    
    setLastPosition(coords);
  }, [isDrawing, ref, brushColor, brushSize, lastPosition]);

  const stopDrawing = useCallback(() => {
    if (isDrawing) {
      setIsDrawing(false);
      onDrawingEnd?.();
    }
  }, [isDrawing, onDrawingEnd]);

  // Mouse events
  const handleMouseDown = (e) => {
    e.preventDefault();
    startDrawing(e);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    draw(e);
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    stopDrawing();
  };

  const handleMouseLeave = (e) => {
    e.preventDefault();
    stopDrawing();
  };

  // Touch events
  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    startDrawing(mouseEvent);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    draw(mouseEvent);
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    stopDrawing();
  };

  return (
    <canvas
      ref={ref}
      className="drawing-canvas w-full h-auto block bg-white dark:bg-gray-900"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'none' }}
    />
  );
});

DrawingCanvas.displayName = 'DrawingCanvas';

export default DrawingCanvas;