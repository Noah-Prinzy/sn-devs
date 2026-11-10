const { chromium } = require("C:/Users/Noah/AppData/Roaming/npm/node_modules/@playwright/cli/node_modules/playwright");
(async () => {
  const b = await chromium.launch({ executablePath: "C:/Users/Noah/AppData/Local/ms-playwright/chromium-1248/chrome-win64/chrome.exe" });
  const pg = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await pg.goto("http://localhost:3105/", { waitUntil: "networkidle" });
  await pg.waitForTimeout(1500);
  await pg.mouse.move(700, 450);
  await pg.mouse.wheel(0, 120);
  for (let i = 0; i < 8; i++) { await pg.waitForTimeout(220); await pg.screenshot({ path: `shots/glide-${i}.png` }); }
  await b.close();
})();
