const { chromium } = require('playwright');

async function ogImage(url) {
  const browser = await chromium.launch();

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.goto(url, { waitUntil: 'networkidle' });
  const buffer = await page.screenshot({ type: 'png' });
  const base64Image = buffer.toString('base64');

  return base64Image;
}

export default ogImage;
