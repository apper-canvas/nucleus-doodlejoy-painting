import { Slider } from '../ui/slider';
import { brushSettings } from '../../constants/canvasConfig';

/**
 * @ai-context Brush size and preview controls component
 * @dependencies Slider from ui, brushSettings from canvasConfig
 * @modifiable-sections size-slider, brush-preview
 */
const BrushControls = ({ brushSize, onBrushSizeChange, brushColor }) => {
  const handleSizeChange = (value) => {
    onBrushSizeChange(value[0]);
  };

  return (
    <div className="space-y-6">
      {/* Brush Size Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">
            Size
          </label>
          <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
            {brushSize}px
          </span>
        </div>
        
        <Slider
          value={[brushSize]}
          onValueChange={handleSizeChange}
          min={brushSettings.minSize}
          max={brushSettings.maxSize}
          step={1}
          className="w-full"
        />
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{brushSettings.minSize}px</span>
          <span>{brushSettings.maxSize}px</span>
        </div>
      </div>

      {/* Brush Preview */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-muted-foreground">
          Preview
        </label>
        
        <div className="flex items-center justify-center p-6 bg-muted/30 rounded-lg border-2 border-dashed border-muted">
          <div
            className="rounded-full transition-all duration-200 shadow-lg"
            style={{
              width: `${brushSize}px`,
              height: `${brushSize}px`,
              backgroundColor: brushColor,
              minWidth: '8px',
              minHeight: '8px',
              maxWidth: '60px',
              maxHeight: '60px'
            }}
          />
        </div>
        
        <p className="text-xs text-center text-muted-foreground">
          This is how your brush will look
        </p>
      </div>

      {/* Brush Info */}
      <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-muted-foreground">
            Round brush, smooth edges
          </span>
        </div>
      </div>
    </div>
  );
};

export default BrushControls;