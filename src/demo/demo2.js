const puppeteer = require('puppeteer');

puppeteer.launch({headless: false}).then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://google.com');
  await page.type('input[type=text]', 'rocwong-cn', {delay: 100});
  await page.evaluate(() => {
    document.querySelector('form[role=search]').submit();
  });
  await page.waitForNavigation();
  await page.screenshot({path: './screenshot/demo2.png'});
  await browser.close();
});