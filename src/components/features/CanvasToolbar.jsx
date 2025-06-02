import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import ApperIcon from '../ApperIcon'

function CanvasToolbar({ activeTool, onToolChange }) {
  return (
    <div className="p-4 border-b border-border bg-muted/30">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Tools:</span>
        <ToggleGroup 
          type="single" 
          value={activeTool} 
          onValueChange={onToolChange}
          className="gap-1"
        >
          <ToggleGroupItem 
            value="brush" 
            aria-label="Brush tool"
            className="flex items-center gap-2 px-3 py-2"
          >
            <ApperIcon name="Brush" size={16} />
            <span className="hidden sm:inline">Brush</span>
          </ToggleGroupItem>
          
          <ToggleGroupItem 
            value="fill" 
            aria-label="Fill tool"
            className="flex items-center gap-2 px-3 py-2"
          >
            <ApperIcon name="PaintBucket" size={16} />
            <span className="hidden sm:inline">Fill</span>
          </ToggleGroupItem>
          
          <ToggleGroupItem 
            value="eraser" 
            aria-label="Eraser tool"
            className="flex items-center gap-2 px-3 py-2"
          >
            <ApperIcon name="Eraser" size={16} />
            <span className="hidden sm:inline">Eraser</span>
          </ToggleGroupItem>
          
          <ToggleGroupItem 
            value="rectangle" 
            aria-label="Rectangle tool"
            className="flex items-center gap-2 px-3 py-2"
          >
            <ApperIcon name="Square" size={16} />
            <span className="hidden sm:inline">Rectangle</span>
          </ToggleGroupItem>
          
          <ToggleGroupItem 
            value="circle" 
            aria-label="Circle tool"
            className="flex items-center gap-2 px-3 py-2"
          >
            <ApperIcon name="Circle" size={16} />
            <span className="hidden sm:inline">Circle</span>
          </ToggleGroupItem>
          
          <ToggleGroupItem 
            value="line" 
            aria-label="Line tool"
            className="flex items-center gap-2 px-3 py-2"
          >
            <ApperIcon name="Minus" size={16} />
            <span className="hidden sm:inline">Line</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  )
}

export default CanvasToolbar