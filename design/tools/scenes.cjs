const { chromium } = require("C:/Users/Noah/AppData/Roaming/npm/node_modules/@playwright/cli/node_modules/playwright");
(async () => {
  const b = await chromium.launch({ executablePath: "C:/Users/Noah/AppData/Local/ms-playwright/chromium-1248/chrome-win64/chrome.exe" });
  for (const [n, vp] of [["d", { width: 1440, height: 900 }], ["m", { width: 375, height: 812 }]]) {
    const pg = await b.newPage({ viewport: vp });
    const errs = []; pg.on("pageerror", (e) => errs.push(String(e))); pg.on("console", (m) => m.type() === "error" && errs.push(m.text()));
    await pg.goto("http://localhost:3105/", { waitUntil: "networkidle" });
    await pg.waitForTimeout(1500);
    await pg.screenshot({ path: `shots/s-${n}-00.png` });
    await pg.mouse.move(vp.width / 2, 100);
    const ys = [];
    for (let i = 1; i <= 9; i++) {
      await pg.mouse.wheel(0, 120);
      await pg.waitForTimeout(2400);
      ys.push(Math.round(await pg.evaluate(() => scrollY)));
      await pg.screenshot({ path: `shots/s-${n}-${String(i).padStart(2, "0")}.png` });
    }
    const secs = await pg.evaluate(() => [...document.querySelectorAll("main > section")].map((s) => [s.id || "intro", s.offsetTop, s.offsetHeight]));
    console.log(n, ys.join(","), JSON.stringify(secs), "hscroll", await pg.evaluate(() => document.documentElement.scrollWidth - innerWidth), JSON.stringify(errs.slice(0, 3)));
    await pg.close();
  }
  await b.close();
})();
