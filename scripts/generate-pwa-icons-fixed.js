// Script para generar iconos PNG válidos para PWA
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Crear un PNG mínimo válido pero mejorado
async function createColoredPNG(width, height, color = [102, 126, 234]) {
  // PNG header
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  
  // IHDR chunk
  const ihdrLength = Buffer.from([0x00, 0x00, 0x00, 0x0D]);
  const ihdrType = Buffer.from('IHDR');
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8);  // bit depth
  ihdrData.writeUInt8(2, 9);  // color type (RGB)
  ihdrData.writeUInt8(0, 10); // compression
  ihdrData.writeUInt8(0, 11); // filter
  ihdrData.writeUInt8(0, 12); // interlace
  
  // CRC for IHDR
  const { crc32 } = await import('crc');
  const ihdrCrc = Buffer.alloc(4);
  ihdrCrc.writeUInt32BE(crc32(Buffer.concat([ihdrType, ihdrData])) >>> 0, 0);
  
  const ihdrChunk = Buffer.concat([ihdrLength, ihdrType, ihdrData, ihdrCrc]);
  
  // IDAT chunk with solid color
  const bytesPerRow = width * 3 + 1; // 3 bytes per pixel + 1 filter byte
  const totalBytes = bytesPerRow * height;
  const pixelData = Buffer.alloc(totalBytes);
  
  for (let y = 0; y < height; y++) {
    const rowStart = y * bytesPerRow;
    pixelData[rowStart] = 0; // filter type: None
    
    for (let x = 0; x < width; x++) {
      const pixelStart = rowStart + 1 + x * 3;
      pixelData[pixelStart] = color[0];     // R
      pixelData[pixelStart + 1] = color[1]; // G  
      pixelData[pixelStart + 2] = color[2]; // B
    }
  }
  
  // Compress pixel data
  const compressedData = zlib.deflateSync(pixelData);
  
  const idatLength = Buffer.alloc(4);
  idatLength.writeUInt32BE(compressedData.length, 0);
  const idatType = Buffer.from('IDAT');
  const idatCrc = Buffer.alloc(4);
  idatCrc.writeUInt32BE(crc32(Buffer.concat([idatType, compressedData])) >>> 0, 0);
  
  const idatChunk = Buffer.concat([idatLength, idatType, compressedData, idatCrc]);
  
  // IEND chunk
  const iendChunk = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82]);
  
  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Tamaños requeridos
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.join(__dirname, '..', 'public', 'icons');

// Crear directorio
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generar iconos
async function generateIcons() {
  for (const size of iconSizes) {
    const filename = `icon-${size}x${size}.png`;
    const filepath = path.join(iconsDir, filename);
    
    // Color gradiente según tamaño
    const color = [
      Math.floor(102 + size * 0.2),
      Math.floor(126 + size * 0.15),
      Math.floor(234 - size * 0.1)
    ].map(c => Math.min(255, Math.max(0, c)));
    
    const pngData = await createColoredPNG(size, size, color);
    fs.writeFileSync(filepath, pngData);
    
    console.log(`✅ Creado: ${filename} (${size}x${size}) - Color: rgb(${color.join(',')})`);
  }
}

generateIcons().then(() => {
  console.log('\n🎉 ¡Todos los iconos PNG generados exitosamente!');
  console.log('📁 Ubicación:', iconsDir);
  console.log('🎨 Iconos con colores únicos para PWA');
  console.log('📱 Listos para funcionar offline');

  // Crear favicon.ico
  const favicon = path.join(__dirname, '..', 'public', 'favicon.ico');
  const icon192 = path.join(iconsDir, 'icon-192x192.png');
  if (fs.existsSync(icon192)) {
    fs.copyFileSync(icon192, favicon);
    console.log('✅ favicon.ico creado desde icon-192x192.png');
  }
}).catch(console.error);