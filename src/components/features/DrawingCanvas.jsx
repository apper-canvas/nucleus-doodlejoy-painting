import { forwardRef, useEffect, useState, useCallback, useImperativeHandle } from 'react';
import { canvasConfig } from '../../constants/canvasConfig';
import { getCanvasCoordinates, floodFill, drawRectangle, drawCircle, drawLine } from '../../utils/canvasUtils';

/**
 * @ai-context Main drawing canvas component with mouse and touch drawing support
 * @dependencies canvasConfig, canvasUtils
 * @modifiable-sections drawing-logic, event-handlers, canvas-setup
 */
const DrawingCanvas = forwardRef(({ 
  brushColor, 
  brushSize, 
  activeTool = 'brush',
  onDrawingStart, 
  onDrawingEnd,
  onCanUndoChange
}, ref) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [previewCanvas, setPreviewCanvas] = useState(null);
  const [canvasHistory, setCanvasHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
// Save canvas state for undo functionality
  const saveCanvasState = useCallback(() => {
    const canvas = ref.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    setCanvasHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(imageData);
      
      // Limit history to prevent memory issues
      if (newHistory.length > 50) {
        newHistory.shift();
        return newHistory;
      }
      return newHistory;
    });
    
    setHistoryIndex(prev => {
      const newIndex = Math.min(prev + 1, 49);
      onCanUndoChange?.(newIndex > 0);
      return newIndex;
    });
  }, [ref, historyIndex, onCanUndoChange]);

  // Undo functionality
  const undo = useCallback(() => {
    if (historyIndex <= 0) return;
    
    const canvas = ref.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const previousState = canvasHistory[historyIndex - 1];
    
    if (previousState) {
      ctx.putImageData(previousState, 0, 0);
      setHistoryIndex(prev => {
        const newIndex = prev - 1;
        onCanUndoChange?.(newIndex > 0);
        return newIndex;
      });
    }
  }, [ref, canvasHistory, historyIndex, onCanUndoChange]);

  // Expose undo function to parent
  useImperativeHandle(ref, () => ({
    undo,
    saveCanvasState
  }), [undo, saveCanvasState]);

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
    
    // Save initial state
    saveCanvasState();
  }, [ref, saveCanvasState]);

  // Add keyboard shortcut for undo
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo]);

const startDrawing = useCallback((e) => {
    const canvas = ref.current;
    if (!canvas) return;

    const coords = getCanvasCoordinates(e, canvas);
    
// Handle fill tool
    if (activeTool === 'fill') {
      floodFill(canvas, coords.x, coords.y, brushColor);
      saveCanvasState();
      onDrawingStart?.();
      onDrawingEnd?.();
      return;
    }

    setIsDrawing(true);
    setLastPosition(coords);
    setStartPosition(coords);
    
    // Create preview canvas for shape tools
    if (['rectangle', 'circle', 'line'].includes(activeTool)) {
      const ctx = canvas.getContext('2d');
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setPreviewCanvas(imageData);
    }
    
    onDrawingStart?.();
  }, [ref, activeTool, brushColor, onDrawingStart, onDrawingEnd, saveCanvasState]);

const draw = useCallback((e) => {
    if (!isDrawing) return;
    
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const coords = getCanvasCoordinates(e, canvas);

    if (activeTool === 'brush') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
      
      ctx.beginPath();
      ctx.moveTo(lastPosition.x, lastPosition.y);
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
      
      setLastPosition(coords);
    } else if (activeTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = brushSize;
      
      ctx.beginPath();
      ctx.moveTo(lastPosition.x, lastPosition.y);
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
      
      setLastPosition(coords);
    } else if (['rectangle', 'circle', 'line'].includes(activeTool) && previewCanvas) {
      // Restore original canvas for preview
      ctx.putImageData(previewCanvas, 0, 0);
      
      // Draw preview shape
      if (activeTool === 'rectangle') {
        drawRectangle(ctx, startPosition.x, startPosition.y, coords.x, coords.y, brushColor, brushSize);
      } else if (activeTool === 'circle') {
        drawCircle(ctx, startPosition.x, startPosition.y, coords.x, coords.y, brushColor, brushSize);
      } else if (activeTool === 'line') {
        drawLine(ctx, startPosition.x, startPosition.y, coords.x, coords.y, brushColor, brushSize);
      }
    }
  }, [isDrawing, ref, activeTool, brushColor, brushSize, lastPosition, startPosition, previewCanvas]);

const stopDrawing = useCallback(() => {
    if (isDrawing) {
      setIsDrawing(false);
      setPreviewCanvas(null);
      saveCanvasState();
      onDrawingEnd?.();
    }
  }, [isDrawing, onDrawingEnd, saveCanvasState]);

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