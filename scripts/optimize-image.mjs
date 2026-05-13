#!/usr/bin/env node
/**
 * Image optimization script for product images
 * Usage: node scripts/optimize-image.mjs <input> <output>
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputPath = process.argv[2] || '/Users/enxom/Downloads/centraltubi-pe-rohr-pe-hd-rohr-pe100-pn16-100m-1-2-zoll-20mm-trinkwasserleitung-1600940731.jpg';
const outputPath = process.argv[3] || '/Users/enxom/Desktop/sukaj-shpk-website/public/products/civil/konti-pe100-water-pipe.jpg';

async function optimizeImage() {
  try {
    console.log(`Processing: ${inputPath}`);
    
    // Get original stats
    const originalStats = fs.statSync(inputPath);
    console.log(`Original size: ${(originalStats.size / 1024).toFixed(2)} KB`);
    
    // Process with sharp - optimize for web
    const pipeline = sharp(inputPath)
      // Resize to reasonable max dimensions for product display
      .resize({
        width: 1200,
        height: 1200,
        fit: 'inside',
        withoutEnlargement: true
      })
      // Convert to JPEG with web-optimized settings
      .jpeg({
        quality: 85,
        progressive: true,
        mozjpeg: true,
        chromaSubsampling: '4:2:0'
      });
    
    // Get metadata before saving
    const metadata = await pipeline.metadata();
    console.log(`Dimensions: ${metadata.width}x${metadata.height}`);
    
    // Save the optimized image
    await pipeline.toFile(outputPath);
    
    // Get new stats
    const newStats = fs.statSync(outputPath);
    const savings = ((originalStats.size - newStats.size) / originalStats.size * 100).toFixed(1);
    
    console.log(`\n✓ Optimized image saved to: ${outputPath}`);
    console.log(`  New size: ${(newStats.size / 1024).toFixed(2)} KB`);
    console.log(`  Savings: ${savings}%`);
    console.log(`  Final dimensions: ${Math.min(metadata.width, 1200)}x${Math.min(metadata.height, 1200)} (max 1200px)`);
    
  } catch (error) {
    console.error('Error optimizing image:', error.message);
    process.exit(1);
  }
}

optimizeImage();
