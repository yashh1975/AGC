import sharp from "sharp";
import fs from "fs";
import path from "path";

async function main() {
  const sourcePath = path.resolve("src/assets/logo.jpg");
  const publicDir = path.resolve("public");

  console.log("Reading source image:", sourcePath);

  // Exact crop of the circular gold medallion:
  // Center is (226.5, 229.5), radius ~177.5px.
  // Crop 356x356 bounding box from (left: 48, top: 51).
  const size = 356;
  const radius = 177;

  // Anti-aliased SVG circle mask
  const circleSvg = Buffer.from(
    `<svg width="${size}" height="${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="white" />
    </svg>`,
  );

  const croppedMaster = await sharp(sourcePath)
    .extract({ left: 48, top: 51, width: size, height: size })
    .composite([{ input: circleSvg, blend: "dest-in" }])
    .png()
    .toBuffer();

  const iconSizes = [
    { name: "favicon-16x16.png", size: 16 },
    { name: "favicon-32x32.png", size: 32 },
    { name: "favicon-48x48.png", size: 48 },
    { name: "favicon-96x96.png", size: 96 },
    { name: "favicon-144x144.png", size: 144 },
    { name: "favicon-192x192.png", size: 192 },
    { name: "favicon-512x512.png", size: 512 },
    { name: "favicon.png", size: 48 },
    { name: "apple-touch-icon.png", size: 180 },
    { name: "logo-circle.png", size: 512 },
  ];

  for (const item of iconSizes) {
    const dest = path.join(publicDir, item.name);
    await sharp(croppedMaster)
      .resize(item.size, item.size, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png({ compressionLevel: 9 })
      .toFile(dest);
    console.log(`Generated: ${item.name} (${item.size}x${item.size})`);
  }

  // Generate multi-resolution ICO file (16, 32, 48)
  const icoSizes = [16, 32, 48];
  const icoPngBuffers = [];
  for (const s of icoSizes) {
    const buf = await sharp(croppedMaster)
      .resize(s, s, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png({ compressionLevel: 9 })
      .toBuffer();
    icoPngBuffers.push({ size: s, buffer: buf });
  }

  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // Reserved. Must always be 0.
  icoHeader.writeUInt16LE(1, 2); // 1 = ICO, 2 = CUR
  icoHeader.writeUInt16LE(icoSizes.length, 4); // Number of images

  let dataOffset = 6 + icoSizes.length * 16;
  const directoryEntries = [];

  for (const item of icoPngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.size === 256 ? 0 : item.size, 0); // Width
    entry.writeUInt8(item.size === 256 ? 0 : item.size, 1); // Height
    entry.writeUInt8(0, 2); // Colors (0 = no color palette)
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(item.buffer.length, 8); // Size of image data
    entry.writeUInt32LE(dataOffset, 12); // Offset to image data
    directoryEntries.push(entry);
    dataOffset += item.buffer.length;
  }

  const fullIco = Buffer.concat([
    icoHeader,
    ...directoryEntries,
    ...icoPngBuffers.map((b) => b.buffer),
  ]);

  const icoDest = path.join(publicDir, "favicon.ico");
  fs.writeFileSync(icoDest, fullIco);
  console.log(
    `Generated: favicon.ico containing [${icoSizes.join(", ")}] (${fullIco.length} bytes)`,
  );

  // Generate official 1200x630 og-image.jpg banner with circular gold medallion centered
  const ogWidth = 1200;
  const ogHeight = 630;
  const logoInOgSize = 340;

  const resizedLogoForOg = await sharp(croppedMaster)
    .resize(logoInOgSize, logoInOgSize, { fit: "contain" })
    .png()
    .toBuffer();

  const ogSvgOverlay = Buffer.from(
    `<svg width="${ogWidth}" height="${ogHeight}">
      <defs>
        <radialGradient id="grad" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stop-color="#3d0a00" />
          <stop offset="60%" stop-color="#180500" />
          <stop offset="100%" stop-color="#0a0200" />
        </radialGradient>
        <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e5c07b" />
          <stop offset="50%" stop-color="#f5e1a4" />
          <stop offset="100%" stop-color="#996515" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
      <rect x="24" y="24" width="${ogWidth - 48}" height="${ogHeight - 48}" rx="20" fill="none" stroke="url(#goldBorder)" stroke-width="2" stroke-opacity="0.4" />
      <circle cx="${ogWidth / 2}" cy="${ogHeight / 2}" r="${logoInOgSize / 2 + 10}" fill="none" stroke="url(#goldBorder)" stroke-width="3" stroke-opacity="0.8" />
    </svg>`,
  );

  const ogDest = path.join(publicDir, "og-image.jpg");
  await sharp(ogSvgOverlay)
    .composite([
      {
        input: resizedLogoForOg,
        top: Math.round((ogHeight - logoInOgSize) / 2),
        left: Math.round((ogWidth - logoInOgSize) / 2),
      },
    ])
    .jpeg({ quality: 90 })
    .toFile(ogDest);
  console.log(`Generated: og-image.jpg (1200x630 banner)`);

  console.log("All icons and banners generated successfully!");
}

main().catch((err) => {
  console.error("Error generating favicons:", err);
  process.exit(1);
});
