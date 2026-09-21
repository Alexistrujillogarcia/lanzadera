const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 3 });
  await page.goto('file://' + path.resolve('voucher.html'), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  await page.pdf({ path: 'out/Bono-Regalo-Kontraola-Attila-Koller.pdf', format: 'A4', printBackground: true, preferCSSPageSize: true });
  await page.screenshot({ path: 'out/Bono-Regalo-Kontraola-Attila-Koller.png', fullPage: false });
  await browser.close();
  console.log('done');
})();
