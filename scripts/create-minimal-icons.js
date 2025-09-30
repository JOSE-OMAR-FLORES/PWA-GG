#!/usr/bin/env node
/**
 * Generador de iconos PNG básicos para PWA
 * Crea iconos mínimos usando Canvas API (si está disponible)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconSizes = [192, 512]; // Mínimos requeridos para PWA
const iconsDir = path.join(__dirname, '..', 'public', 'icons');

// Crear iconos SVG que pueden servir como placeholder
const createSVGIcon = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="#646cff"/>
  <path d="M${size * 0.3} ${size * 0.25}L${size * 0.7} ${size * 0.45}H${size * 0.3}L${size * 0.5} ${size * 0.25}Z" fill="white"/>
  <rect x="${size * 0.3}" y="${size * 0.5}" width="${size * 0.4}" height="${size * 0.25}" rx="${size * 0.02}" fill="white"/>
  <circle cx="${size * 0.5}" cy="${size * 0.75}" r="${size * 0.05}" fill="#646cff"/>
</svg>`;

// Crear los iconos SVG mínimos
iconSizes.forEach(size => {
  const svgContent = createSVGIcon(size);
  const svgPath = path.join(iconsDir, `icon-${size}x${size}.svg`);
  
  fs.writeFileSync(svgPath, svgContent.trim());
  console.log(`✅ Creado: icon-${size}x${size}.svg`);
});

// Crear instrucciones para convertir a PNG
const instructions = {
  message: "Iconos SVG creados exitosamente",
  next_steps: [
    "Los iconos SVG se han creado como placeholders",
    "Para mejor compatibilidad, convierte a PNG usando:",
    "1. Herramientas online: https://convertio.co/svg-png/",
    "2. Software: GIMP, Inkscape, Adobe Illustrator",
    "3. Comandos: imagemagick (convert icon.svg icon.png)"
  ],
  required_png_sizes: iconSizes.map(size => `${size}x${size}`),
  optional_sizes: ["72x72", "96x96", "128x128", "144x144", "152x152", "384x384"]
};

fs.writeFileSync(
  path.join(iconsDir, 'conversion-instructions.json'),
  JSON.stringify(instructions, null, 2)
);

console.log('📝 Instrucciones de conversión creadas en conversion-instructions.json');
console.log('🎯 Iconos mínimos listos para PWA instalable!');