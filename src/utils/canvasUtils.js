/**
 * @ai-context Canvas utility functions for coordinates, download, and clear operations
 * @modifiable-sections coordinate-calculation, download-logic, clear-functionality
 */

/**
 * Get canvas coordinates from mouse or touch event
 */
export const getCanvasCoordinates = (event, canvas) => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  
  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY
  };
};

/**
 * Download canvas as image file
 */
export const downloadCanvas = (canvas, filename = 'my-artwork') => {
  try {
    // Create download link
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return true;
  } catch (error) {
    console.error('Error downloading canvas:', error);
    return false;
  }
};

/**
 * Clear canvas content
 */
export const clearCanvas = (canvas) => {
  const ctx = canvas.getContext('2d');
  
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Set background color
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

/**
 * Get canvas as base64 data URL
 */
export const getCanvasDataURL = (canvas, format = 'image/png', quality = 1.0) => {
  return canvas.toDataURL(format, quality);
};

/**
 * Check if point is within canvas bounds
 */
export const isPointInCanvas = (x, y, canvas) => {
  return x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height;
};

/**
 * Calculate distance between two points
 */
export const getDistance = (point1, point2) => {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
};