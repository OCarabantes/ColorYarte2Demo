import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

// Originales conservados: las versiones web se guardan dentro del proyecto.
const directory = process.argv[2];
if (!directory) throw new Error('Uso opcional: node scripts/prepare-images.mjs <directorio-de-originales>. Las imágenes web ya están incluidas.');
const assets = [
  ['exec-dba7f4f4-8ba8-42b7-99af-c26afe805b81.png', 'familia-creativa', 1500],
  ['exec-6ee02967-632a-4f92-9708-d1cedea493ba.png', 'repujado', 1100],
  ['exec-ad98395b-0a49-41d8-8ab9-c5387504df42.png', 'miyuki', 1100],
  ['exec-877bd047-b425-4a91-8009-95da7a2eb120.png', 'pintura', 1100],
];
await mkdir('public/images', { recursive: true });
for (const [source, name, width] of assets) {
  await sharp(`${directory}/${source}`).resize({ width }).webp({ quality: 85 }).toFile(`public/images/${name}.webp`);
  console.log(`public/images/${name}.webp`);
}
