const playwright = require('playwright-aws-lambda');
const { v2: cloudinary } = require('cloudinary');
const { createHash } = require('crypto');
const axios = require('axios');

cloudinary.config({
  cloud_name: 'phiilu',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function getOgImage(path, baseUrl = 'https://og-image.phiilu.com') {
  const url = `${baseUrl}${path}`;
  const hash = createHash('md5').update(url).digest('hex');
  const browser = await playwright.launchChromium({ headless: true });

  try {
    const cloudinaryUrl = cloudinary.url(`phiilu.com/og/${hash}`, { secure: true });
    await axios.head(cloudinaryUrl);
    return cloudinaryUrl;
  } catch (error) {
    // og image does not exist yet
    // so we continue and upload it
  }

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.goto(url, { waitUntil: 'networkidle' });
  const buffer = await page.screenshot({ type: 'png' });
  const base64Image = buffer.toString('base64');
  await browser.close();

  const imageUrl = new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      `data:image/png;base64,${base64Image}`,
      {
        overwrite: true,
        folder: 'phiilu.com/og/',
        public_id: hash
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result?.secure_url);
      }
    );
  });

  return imageUrl;
}

export default getOgImage;
