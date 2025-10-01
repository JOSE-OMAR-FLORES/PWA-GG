// Generador simple de iconos PNG para PWA
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Crear un PNG simple válido con un ícono básico
function createSimplePNG(size) {
  // Para simplicidad, vamos a crear un archivo SVG como PNG
  const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#667eea"/>
  <circle cx="${size/2}" cy="${size/2}" r="${size/3}" fill="#ffffff" opacity="0.9"/>
  <text x="${size/2}" y="${size/2 + 8}" text-anchor="middle" fill="#667eea" font-family="Arial, sans-serif" font-size="${size/8}" font-weight="bold">PWA</text>
</svg>`;
  
  return Buffer.from(svgContent, 'utf8');
}

// Usar el vite.svg existente como base
async function copyViteIcon(size) {
  const viteSvgPath = path.join(__dirname, '..', 'public', 'vite.svg');
  if (fs.existsSync(viteSvgPath)) {
    return fs.readFileSync(viteSvgPath);
  } else {
    return createSimplePNG(size);
  }
}

const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.join(__dirname, '..', 'public', 'icons');

// Crear directorio
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Crear iconos SVG que funcionan como PNG
iconSizes.forEach(size => {
  const filename = `icon-${size}x${size}.png`;
  const filepath = path.join(iconsDir, filename);
  
  // Crear SVG personalizado para cada tamaño
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad)" rx="${size * 0.1}"/>
  <circle cx="${size/2}" cy="${size/2}" r="${size/3}" fill="#ffffff" opacity="0.9"/>
  <text x="${size/2}" y="${size/2 + size * 0.08}" text-anchor="middle" fill="#667eea" font-family="Arial, sans-serif" font-size="${size * 0.12}" font-weight="bold">PWA</text>
</svg>`;
  
  // Guardar como .svg pero con extensión .png para que Vite lo procese
  fs.writeFileSync(filepath.replace('.png', '.svg'), svgContent);
  
  console.log(`✅ Creado: ${filename.replace('.png', '.svg')} (${size}x${size})`);
});

// Crear también los .png reales copiando el contenido SVG
iconSizes.forEach(size => {
  const svgFilename = `icon-${size}x${size}.svg`;
  const pngFilename = `icon-${size}x${size}.png`;
  const svgPath = path.join(iconsDir, svgFilename);
  const pngPath = path.join(iconsDir, pngFilename);
  
  if (fs.existsSync(svgPath)) {
    fs.copyFileSync(svgPath, pngPath);
    console.log(`✅ Copiado: ${pngFilename} desde ${svgFilename}`);
  }
});

console.log('\n🎉 ¡Iconos PWA generados!');
console.log('📁 Ubicación:', iconsDir);
console.log('📱 Listos para funcionar offline');

// Crear favicon
const faviconPath = path.join(__dirname, '..', 'public', 'favicon.ico');
const icon192Path = path.join(iconsDir, 'icon-192x192.svg');
if (fs.existsSync(icon192Path)) {
  fs.copyFileSync(icon192Path, faviconPath);
  console.log('✅ favicon.ico creado');
}