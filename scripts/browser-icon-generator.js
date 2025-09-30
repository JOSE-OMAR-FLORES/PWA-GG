/**
 * Crear iconos PNG básicos usando Data URLs
 * Este método crea iconos mínimos que funcionen con PWA
 */

// Crear un canvas virtual para generar PNG
function createBasicIcon(size) {
  // Data URL de un icono básico en PNG
  // Este es un ícono simple de 1x1 píxel que se escalará
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = size;
  canvas.height = size;
  
  // Fondo con gradiente
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#646cff');
  gradient.addColorStop(1, '#747bff');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  
  // Agregar forma simple
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(size/2, size/2, size/4, 0, Math.PI * 2);
  ctx.fill();
  
  // Texto
  ctx.fillStyle = '#646cff';
  ctx.font = `${size/8}px Arial`;
  ctx.textAlign = 'center';
  ctx.fillText('PWA', size/2, size/2 + size/32);
  
  return canvas.toDataURL('image/png');
}

// Esta función se debe ejecutar en el navegador
console.log('Para generar iconos PNG, ejecuta este código en la consola del navegador:');

const iconSizes = [72, 96, 128, 144, 152, 180, 192, 384, 512];

iconSizes.forEach(size => {
  console.log(`
// Código para icon-${size}x${size}.png
const canvas${size} = document.createElement('canvas');
const ctx${size} = canvas${size}.getContext('2d');
canvas${size}.width = ${size};
canvas${size}.height = ${size};

const gradient${size} = ctx${size}.createLinearGradient(0, 0, ${size}, ${size});
gradient${size}.addColorStop(0, '#646cff');
gradient${size}.addColorStop(1, '#747bff');

ctx${size}.fillStyle = gradient${size};
ctx${size}.fillRect(0, 0, ${size}, ${size});

ctx${size}.fillStyle = 'white';
ctx${size}.beginPath();
ctx${size}.arc(${size/2}, ${size/2}, ${size/4}, 0, Math.PI * 2);
ctx${size}.fill();

ctx${size}.fillStyle = '#646cff';
ctx${size}.font = '${Math.floor(size/8)}px Arial';
ctx${size}.textAlign = 'center';
ctx${size}.fillText('PWA', ${size/2}, ${size/2} + ${Math.floor(size/32)});

// Descargar
const link${size} = document.createElement('a');
link${size}.download = 'icon-${size}x${size}.png';
link${size}.href = canvas${size}.toDataURL('image/png');
link${size}.click();
`);
});

export { createBasicIcon };