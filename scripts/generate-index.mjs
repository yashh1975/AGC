// Generate a static index.html shell for Cloudflare Pages static hosting.
// TanStack Start is an SSR framework that doesn't produce index.html by default.
// This script creates a minimal HTML shell that loads the client-side JS bundle,
// allowing the React app to hydrate and render entirely on the client side.

import { readdirSync, writeFileSync, readFileSync } from "fs";
import { join } from "path";

const clientDir = join(process.cwd(), "dist", "client");
const assetsDir = join(clientDir, "assets");

const files = readdirSync(assetsDir);

const cssFile = files.find((f) => f.endsWith(".css"));
const indexJs = files.find((f) => f.startsWith("index-") && f.endsWith(".js"));

if (!cssFile || !indexJs) {
  console.error("Could not find CSS or JS entry files in dist/client/assets/");
  process.exit(1);
}

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=5" />
    <meta name="theme-color" content="#180500" />
    <title>Anjaneya Gold Company | Sell Gold for Cash in Bangalore</title>
    <meta name="description" content="Professional gold buying, valuation, XRF purity testing, pledged gold release and mobile gold service in Bangalore." />
    <meta name="author" content="Anjaneya Gold Company" />
    <meta property="og:title" content="Anjaneya Gold Company" />
    <meta property="og:description" content="Professional gold buying and pledged-gold solutions with transparent valuation and purity testing." />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="/og-image.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Anjaneya Gold Company | Sell Gold for Cash in Bangalore" />
    <meta name="twitter:description" content="Professional gold buying, XRF testing, pledged gold release, and mobile gold service in Bangalore." />
    <meta name="twitter:image" content="/og-image.jpg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="stylesheet" href="/assets/${cssFile}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${indexJs}"></script>
  </body>
</html>
`;

writeFileSync(join(clientDir, "index.html"), html);
console.log("✅ Generated dist/client/index.html");
console.log(`   CSS: /assets/${cssFile}`);
console.log(`   JS:  /assets/${indexJs}`);
