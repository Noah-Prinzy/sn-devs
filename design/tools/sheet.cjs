const { chromium } = require("C:/Users/Noah/AppData/Roaming/npm/node_modules/@playwright/cli/node_modules/playwright");
const fs=require("fs");const d=__dirname+"/shots/";
const D=["s-d-00","s-d-01","s-d-02"],M=["s-m-00","s-m-01","s-m-02"];
const img=f=>`data:image/png;base64,${fs.readFileSync(d+f+".png").toString("base64")}`;
(async()=>{const b=await chromium.launch({executablePath:"C:/Users/Noah/AppData/Local/ms-playwright/chromium-1248/chrome-win64/chrome.exe"});const p=await b.newPage({viewport:{width:1600,height:800}});
await p.setContent(`<body style="margin:0;background:#222;padding:6px"><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">${D.map(f=>`<img src="${img(f)}" style="width:100%">`).join("")}</div><div style="display:flex;gap:6px;margin-top:6px">${M.map(f=>`<img src="${img(f)}" style="height:420px">`).join("")}</div></body>`);
await p.screenshot({path:"intro-stages.png",fullPage:true});await b.close();})();
