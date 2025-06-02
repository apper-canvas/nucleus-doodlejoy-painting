/**
 * @ai-context Canvas and brush configuration constants
 * @modifiable-sections canvas-dimensions, color-palette, brush-settings
 */

export const canvasConfig = {
  width: 800,
  height: 600,
  backgroundColor: '#ffffff',
  lineCap: 'round',
  lineJoin: 'round'
};

export const brushSettings = {
  defaultSize: 10,
  minSize: 1,
  maxSize: 50,
  defaultColor: '#2563eb'
};

export const colorPalette = {
  predefined: [
    '#000000', // Black
    '#ffffff', // White
    '#ef4444', // Red
    '#3b82f6', // Blue
    '#22c55e', // Green
    '#eab308', // Yellow
    '#a855f7', // Purple
    '#f97316', // Orange
    '#ec4899', // Pink
    '#06b6d4', // Cyan
    '#84cc16', // Lime
    '#f59e0b', // Amber
    '#8b5cf6', // Violet
    '#10b981', // Emerald
    '#f43f5e', // Rose
    '#6366f1', // Indigo
    '#64748b', // Slate
    '#78716c'  // Stone
  ]
};

export const canvasActions = {
  downloadFormat: 'image/png',
  downloadQuality: 1.0,
  defaultFilename: 'my-artwork'
};