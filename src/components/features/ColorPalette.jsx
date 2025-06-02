import { motion } from 'framer-motion';
import { colorPalette } from '../../constants/canvasConfig';

/**
 * @ai-context Color selection palette component with predefined and custom colors
 * @dependencies colorPalette from canvasConfig
 * @modifiable-sections color-grid, custom-color-picker
 */
const ColorPalette = ({ selectedColor = '#000000', onColorChange }) => {
  const handleColorClick = (color) => {
    onColorChange(color);
  };

  return (
    <div className="space-y-4">
      {/* Predefined Colors */}
      <div className="paint-palette">
        {colorPalette.predefined.map((color, index) => (
          <motion.button
            key={color}
            className={`color-swatch ${selectedColor === color ? 'active' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(color)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            aria-label={`Color ${color}`}
          />
        ))}
      </div>

      {/* Custom Color Picker */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Custom Color
        </label>
        <div className="flex items-center gap-3">
<input
            type="color"
            value={selectedColor || '#000000'}
            onChange={(e) => onColorChange(e.target.value)}
            className="w-12 h-12 rounded-lg border-2 border-muted cursor-pointer hover:border-primary transition-colors"
          />
<div className="flex-1">
            <p className="text-sm font-mono text-muted-foreground">
              {selectedColor ? selectedColor.toUpperCase() : '#000000'}
            </p>
          </div>
        </div>
      </div>

      {/* Recently Used Colors */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Current Selection
        </label>
<div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full border-2 border-white shadow-md"
            style={{ backgroundColor: selectedColor || '#000000' }}
          />
          <span className="text-sm text-muted-foreground">
            Active brush color
          </span>
        </div>
      </div>
    </div>
  );
};

export default ColorPalette;