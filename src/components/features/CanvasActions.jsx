import { Download, Trash2, Undo } from 'lucide-react';
import { Button } from '../ui/button';

/**
 * @ai-context Canvas action buttons for clearing, downloading, and undoing canvas actions
 * @dependencies lucide-react, ui/button
 * @modifiable-sections action-buttons, button-styles
 */
function CanvasActions({ onClear, onDownload, onUndo, canUndo }) {
  return (
    <div className="flex flex-col gap-3">
      <Button
        variant="outline"
        className="w-full justify-start"
        onClick={onUndo}
        disabled={!canUndo}
        title="Undo last action (Ctrl+Z)"
      >
        <Undo className="mr-2 h-4 w-4" />
        Undo
      </Button>
      
      <Button
        variant="outline"
        className="w-full justify-start"
        onClick={onClear}
      >
<Trash2 className="mr-2 h-4 w-4" />
        Clear Canvas
      </Button>
      
      <Button
        variant="outline"
        className="w-full justify-start"
        onClick={onDownload}
        title="Download artwork as image"
      >
        <Download className="mr-2 h-4 w-4" />
        Download Artwork
      </Button>
    </div>
  );
};

export default CanvasActions;