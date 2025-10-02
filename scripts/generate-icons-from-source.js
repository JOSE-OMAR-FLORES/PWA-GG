// Script para generar todos los iconos PWA desde una imagen fuente
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Tamaños requeridos para PWA
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Rutas
const sourceImage = path.join(__dirname, '..', 'public', 'icon-original.png');
const iconsDir = path.join(__dirname, '..', 'public', 'icons');
const faviconPath = path.join(__dirname, '..', 'public', 'favicon.ico');

// Verificar que existe la imagen fuente
if (!fs.existsSync(sourceImage)) {
  console.error('❌ Error: No se encontró icon-original.png en public/');
  console.log('📝 Por favor, coloca tu imagen como: public/icon-original.png');
  process.exit(1);
}

// Crear directorio de iconos si no existe
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

console.log('🎨 Generando iconos PWA desde icon-original.png...\n');

// Función para generar un icono
async function generateIcon(size) {
  const filename = `icon-${size}x${size}.png`;
  const filepath = path.join(iconsDir, filename);
  
  try {
    await sharp(sourceImage)
      .resize(size, size, {
        fit: 'cover',
        position: 'center'
      })
      .png({ quality: 100 })
      .toFile(filepath);
    
    console.log(`✅ Generado: ${filename} (${size}x${size})`);
    return true;
  } catch (error) {
    console.error(`❌ Error generando ${filename}:`, error.message);
    return false;
  }
}

// Generar todos los iconos
async function generateAllIcons() {
  console.log('📐 Redimensionando imagen original a todos los tamaños PWA...\n');
  
  const results = await Promise.all(
    iconSizes.map(size => generateIcon(size))
  );
  
  const successCount = results.filter(r => r).length;
  
  console.log(`\n✅ ${successCount}/${iconSizes.length} iconos generados exitosamente`);
  
  // Generar favicon.ico desde icon-192x192.png
  console.log('\n🎯 Generando favicon.ico...');
  try {
    await sharp(sourceImage)
      .resize(32, 32)
      .png()
      .toFile(faviconPath);
    console.log('✅ favicon.ico generado');
  } catch (error) {
    console.error('❌ Error generando favicon.ico:', error.message);
  }
  
  console.log('\n🎉 ¡Proceso completado!');
  console.log('📁 Iconos guardados en:', iconsDir);
  console.log('🚀 Ahora puedes construir tu PWA con: npm run build');
}

// Ejecutar
generateAllIcons().catch(console.error);
