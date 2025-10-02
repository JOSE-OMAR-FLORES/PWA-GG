import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Tamaños requeridos para PWA
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Función para crear un icono moderno con degradado y iniciales
async function createModernIcon(size) {
  const padding = size * 0.1; // 10% padding
  const circleSize = size - (padding * 2);
  
  // SVG con diseño moderno: círculo con degradado + iniciales JOFM
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Degradado vibrante de azul a morado -->
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#646cff;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#535bf2;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#747bff;stop-opacity:1" />
        </linearGradient>
        
        <!-- Sombra suave -->
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="${size * 0.02}"/>
          <feOffset dx="0" dy="${size * 0.02}" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- Fondo blanco -->
      <rect width="${size}" height="${size}" fill="#ffffff"/>
      
      <!-- Círculo con degradado y sombra -->
      <circle 
        cx="${size / 2}" 
        cy="${size / 2}" 
        r="${circleSize / 2}" 
        fill="url(#grad)" 
        filter="url(#shadow)"
      />
      
      <!-- Iniciales JOFM en blanco -->
      <text 
        x="${size / 2}" 
        y="${size / 2 + size * 0.12}" 
        font-family="'Segoe UI', system-ui, -apple-system, sans-serif" 
        font-size="${size * 0.28}" 
        font-weight="800" 
        fill="#ffffff" 
        text-anchor="middle"
        letter-spacing="${size * 0.01}"
      >JOFM</text>
      
      <!-- Detalle decorativo: círculo interno sutil -->
      <circle 
        cx="${size / 2}" 
        cy="${size / 2}" 
        r="${circleSize / 2.5}" 
        fill="none" 
        stroke="#ffffff" 
        stroke-width="${size * 0.01}" 
        opacity="0.2"
      />
    </svg>
  `;

  return Buffer.from(svg);
}

async function generateIcons() {
  const publicDir = join(__dirname, '..', 'public');
  const iconsDir = join(publicDir, 'icons');

  // Crear directorio si no existe
  mkdirSync(iconsDir, { recursive: true });

  console.log('🎨 Generando iconos modernos con diseño Material Design...\n');

  // Generar cada tamaño
  for (const size of sizes) {
    const iconPath = join(iconsDir, `icon-${size}x${size}.png`);
    const svgBuffer = await createModernIcon(size);
    
    await sharp(svgBuffer)
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(iconPath);
    
    console.log(`✅ Generado: icon-${size}x${size}.png`);
  }

  // Generar favicon.ico (usando el tamaño 192px como base)
  const faviconSvg = await createModernIcon(192);
  const faviconPath = join(publicDir, 'favicon.ico');
  
  await sharp(faviconSvg)
    .resize(32, 32)
    .toFormat('png')
    .toFile(faviconPath.replace('.ico', '.png'));
  
  // Renombrar a .ico (Windows lo reconocerá como icono)
  await sharp(faviconSvg)
    .resize(32, 32)
    .toFile(faviconPath);
  
  console.log('✅ Generado: favicon.ico');

  // Crear también icon-original.png para referencia
  const originalPath = join(publicDir, 'icon-original.png');
  const originalSvg = await createModernIcon(512);
  
  await sharp(originalSvg)
    .png({ quality: 100 })
    .toFile(originalPath);
  
  console.log('✅ Generado: icon-original.png (referencia 512x512)');

  console.log('\n✨ ¡Iconos generados exitosamente!');
  console.log('\n📝 Características del diseño:');
  console.log('   • Estilo: Material Design moderno');
  console.log('   • Colores: Degradado azul (#646cff) a morado (#747bff)');
  console.log('   • Tipografía: Segoe UI Bold, peso 800');
  console.log('   • Elementos: Círculo con sombra + iniciales JOFM');
  console.log('   • Detalles: Círculo decorativo interno con opacidad 20%');
}

generateIcons().catch(console.error);
