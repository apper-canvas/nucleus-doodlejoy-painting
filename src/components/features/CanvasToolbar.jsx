import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import ApperIcon from '../ApperIcon';

const CanvasToolbar = ({ activeTool, onToolChange }) => {
  return (
    <div className="flex items-center justify-center p-4 bg-gradient-to-r from-muted/50 to-background border-b">
      <ToggleGroup 
        type="single" 
        value={activeTool} 
        onValueChange={onToolChange}
        className="bg-background/50 backdrop-blur-sm border rounded-lg p-1"
      >
        <ToggleGroupItem 
          value="brush" 
          aria-label="Brush tool"
          className="flex items-center gap-2 px-4 py-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        >
          <ApperIcon name="Brush" size={16} />
          <span className="hidden sm:inline">Brush</span>
        </ToggleGroupItem>
        
        <ToggleGroupItem 
          value="fill" 
          aria-label="Fill tool"
          className="flex items-center gap-2 px-4 py-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        >
          <ApperIcon name="PaintBucket" size={16} />
          <span className="hidden sm:inline">Fill</span>
        </ToggleGroupItem>
        
        <ToggleGroupItem 
          value="select" 
          aria-label="Select tool"
          className="flex items-center gap-2 px-4 py-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        >
          <ApperIcon name="MousePointer" size={16} />
          <span className="hidden sm:inline">Select</span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default CanvasToolbar;