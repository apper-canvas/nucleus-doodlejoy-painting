// Existing utility functions for canvas operations

/**
 * Clears the entire canvas
 */
export function clearCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Reset background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Downloads canvas as image file
 */
export function downloadCanvas(canvas, filename = 'my-artwork') {
  const link = document.createElement('a');
  link.download = `${filename}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

/**
 * Gets canvas coordinates from mouse/touch event
 */
export function getCanvasCoordinates(event, canvas) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  
  return {
    x: (event.clientX - rect.left) * scaleX,
    y: (event.clientY - rect.top) * scaleY
  };
}

/**
 * Gets canvas data URL
 */
export function getCanvasDataURL(canvas, format = 'image/png', quality = 1) {
  return canvas.toDataURL(format, quality);
}

/**
 * Calculates distance between two points
 */
export function getDistance(point1, point2) {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Checks if point is within canvas bounds
 */
export function isPointInCanvas(x, y, canvas) {
  return x >= 0 && x < canvas.width && y >= 0 && y < canvas.height;
}

/**
 * Flood fill algorithm for fill tool
 */
export function floodFill(canvas, startX, startY, fillColor) {
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  // Convert hex color to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };
  
  const fillRgb = hexToRgb(fillColor);
  if (!fillRgb) return;
  
  startX = Math.floor(startX);
  startY = Math.floor(startY);
  
  if (startX < 0 || startX >= canvas.width || startY < 0 || startY >= canvas.height) {
    return;
  }
  
  const startIndex = (startY * canvas.width + startX) * 4;
  const targetR = data[startIndex];
  const targetG = data[startIndex + 1];
  const targetB = data[startIndex + 2];
  const targetA = data[startIndex + 3];
  
  // Don't fill if target color is same as fill color
  if (targetR === fillRgb.r && targetG === fillRgb.g && targetB === fillRgb.b) {
    return;
  }
  
  const stack = [{x: startX, y: startY}];
  const visited = new Set();
  
  while (stack.length > 0) {
    const {x, y} = stack.pop();
    const key = `${x},${y}`;
    
    if (visited.has(key) || x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) {
      continue;
    }
    
    const index = (y * canvas.width + x) * 4;
    
    // Check if current pixel matches target color
    if (data[index] !== targetR || data[index + 1] !== targetG || 
        data[index + 2] !== targetB || data[index + 3] !== targetA) {
      continue;
    }
    
    visited.add(key);
    
    // Fill current pixel
    data[index] = fillRgb.r;
    data[index + 1] = fillRgb.g;
    data[index + 2] = fillRgb.b;
    data[index + 3] = 255;
    
    // Add neighboring pixels to stack
    stack.push({x: x + 1, y});
    stack.push({x: x - 1, y});
    stack.push({x, y: y + 1});
    stack.push({x, y: y - 1});
  }
  
  ctx.putImageData(imageData, 0, 0);
}

/**
 * Draw rectangle shape
 */
export function drawRectangle(ctx, startX, startY, endX, endY, strokeColor, lineWidth, filled = false) {
  const width = endX - startX;
  const height = endY - startY;
  
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeColor;
  
  if (filled) {
    ctx.fillStyle = strokeColor;
    ctx.fillRect(startX, startY, width, height);
  } else {
    ctx.strokeRect(startX, startY, width, height);
  }
}

/**
 * Draw circle shape
 */
export function drawCircle(ctx, startX, startY, endX, endY, strokeColor, lineWidth, filled = false) {
  const centerX = startX;
  const centerY = startY;
  const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
  
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeColor;
  
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  
  if (filled) {
    ctx.fillStyle = strokeColor;
    ctx.fill();
  } else {
    ctx.stroke();
  }
}

/**
 * Draw line shape
 */
export function drawLine(ctx, startX, startY, endX, endY, strokeColor, lineWidth) {
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeColor;
  ctx.lineCap = 'round';
  
  ctx.beginPath();
  ctx.moveTo(startX, startY);
ctx.lineTo(endX, endY);
  ctx.stroke();
}