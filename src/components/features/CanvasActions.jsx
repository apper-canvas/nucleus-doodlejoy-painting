import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import ApperIcon from '../ApperIcon';

/**
 * @ai-context Canvas action buttons for clear and download functionality
 * @dependencies Button, Separator from ui components
 * @modifiable-sections action-buttons, button-styling
 */
const CanvasActions = ({ onClear, onDownload }) => {
  return (
    <div className="space-y-4">
      {/* Primary Actions */}
      <div className="space-y-3">
        <Button
          onClick={onDownload}
          className="w-full artistic-button"
          size="lg"
        >
          <ApperIcon name="Download" size={18} />
          Download Artwork
        </Button>

        <Button
          onClick={onClear}
          variant="outline"
          className="w-full border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground"
          size="lg"
        >
          <ApperIcon name="Trash2" size={18} />
          Clear Canvas
        </Button>
      </div>

      <Separator />

      {/* Quick Tips */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">
          Quick Tips
        </h4>
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-start gap-2">
            <ApperIcon name="Mouse" size={12} className="mt-0.5 flex-shrink-0" />
            <span>Click and drag to draw</span>
          </div>
          <div className="flex items-start gap-2">
            <ApperIcon name="Smartphone" size={12} className="mt-0.5 flex-shrink-0" />
            <span>Touch and swipe on mobile</span>
          </div>
          <div className="flex items-start gap-2">
            <ApperIcon name="Palette" size={12} className="mt-0.5 flex-shrink-0" />
            <span>Change colors anytime</span>
          </div>
          <div className="flex items-start gap-2">
            <ApperIcon name="RotateCcw" size={12} className="mt-0.5 flex-shrink-0" />
            <span>Can't undo - embrace happy accidents!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasActions;