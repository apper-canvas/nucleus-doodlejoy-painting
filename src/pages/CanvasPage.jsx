import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import DrawingCanvas from '../components/features/DrawingCanvas';
import ColorPalette from '../components/features/ColorPalette';
import BrushControls from '../components/features/BrushControls';
import CanvasActions from '../components/features/CanvasActions';
import CanvasToolbar from '../components/features/CanvasToolbar';
import ThemeToggle from '../components/layout/ThemeToggle';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import ApperIcon from '../components/ApperIcon';
import { brushSettings } from '../constants/canvasConfig';
import { downloadCanvas, clearCanvas } from '../utils/canvasUtils';

const CanvasPage = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [brushColor, setBrushColor] = useState(brushSettings.defaultColor);
  const [brushSize, setBrushSize] = useState(brushSettings.defaultSize);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeTool, setActiveTool] = useState('brush');

  useEffect(() => {
    // Initialize canvas when component mounts
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, []);

  const handleClearCanvas = () => {
    if (canvasRef.current) {
      clearCanvas(canvasRef.current);
      toast.success('Canvas cleared! Time for a fresh start 🎨');
    }
  };

  const handleDownloadCanvas = () => {
    if (canvasRef.current) {
      downloadCanvas(canvasRef.current, 'my-artwork');
      toast.success('Your masterpiece has been downloaded! 🖼️');
    }
  };

const handleBackToHome = () => {
    navigate('/');
  };

  const handleToolChange = (tool) => {
    if (tool) {
      setActiveTool(tool);
      toast.info(`Switched to ${tool} tool! 🛠️`);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 p-4">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={handleBackToHome}
            className="flex items-center gap-2"
          >
            <ApperIcon name="ArrowLeft" size={16} />
            Back to Home
          </Button>
          <h1 className="text-2xl font-bold rainbow-text">DoodleJoy Canvas</h1>
        </div>
        <ThemeToggle />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {/* Tools Panel */}
        <motion.div
          className="lg:col-span-1 space-y-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Color Palette */}
          <Card className="tool-panel">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ApperIcon name="Palette" size={20} />
                Colors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ColorPalette
                selectedColor={brushColor}
                onColorChange={setBrushColor}
              />
            </CardContent>
          </Card>

          {/* Brush Controls */}
          <Card className="tool-panel">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ApperIcon name="Brush" size={20} />
                Brush Size
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BrushControls
                brushSize={brushSize}
                onBrushSizeChange={setBrushSize}
                brushColor={brushColor}
              />
            </CardContent>
          </Card>

          {/* Canvas Actions */}
          <Card className="tool-panel">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ApperIcon name="Settings" size={20} />
                Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CanvasActions
                onClear={handleClearCanvas}
                onDownload={handleDownloadCanvas}
              />
            </CardContent>
          </Card>

          {/* Drawing Status */}
          <Card className="tool-panel">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${isDrawing ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground'}`} />
                <span className="text-sm text-muted-foreground">
                  {isDrawing ? 'Drawing...' : 'Ready to draw'}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Canvas Area */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
>
          <Card className="canvas-container overflow-hidden">
            <CanvasToolbar 
              activeTool={activeTool}
              onToolChange={handleToolChange}
            />
<CardContent className="p-0">
              <DrawingCanvas
                ref={canvasRef}
                brushColor={brushColor}
                brushSize={brushSize}
                activeTool={activeTool}
                onDrawingStart={() => setIsDrawing(true)}
                onDrawingEnd={() => setIsDrawing(false)}
              />
            </CardContent>
          </Card>

          {/* Canvas Info */}
          <motion.div
            className="mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm text-muted-foreground">
              🎨 Click and drag to paint • Use the tools on the left to customize your brush
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CanvasPage;