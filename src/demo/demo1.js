const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://google.com');
  await page.screenshot({path: './screenshot/demo1.png'});
  await browser.close();
});