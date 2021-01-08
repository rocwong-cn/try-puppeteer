const puppeteer = require("puppeteer");
const iPhone = puppeteer.devices['iPhone 6'];
const { pushDingding } = require('./dingdingUtil');
const { uploadToOSS } =require('./alioss');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    // 记得在page.goto前订阅response
    page.on('response', async (response) => {
        // 判断确认订单页的商品价格是否获取到
        if (response.url().endsWith("advert/commodity/get") && response.status() === 200) {
            const payGroup = await page.$('.pay-group div:first-child');
            const price = await page.evaluate(el => el.innerText, payGroup);
            if (price) { // TODO: 为了测试，此处为反向逻辑
                  const fileName = +new Date();
                  await page.screenshot({ path: `./screenshot/${fileName}.png` });
                  const picUrl = await uploadToOSS(fileName);
                  const title = await page.title();
                  await pushDingding(title, picUrl, page.url())
            }
        }
      });
    await page.emulate(iPhone);
    const url = 'https://test.ipalfish.com/phonics/sales/launch/index.html?launchid=387218066254084&appid=wxa15709c9a213c969';
    await page.goto(url, { waitUntil: 'domcontentloaded'});
    await page.waitForSelector('.aicourse-template-foot > img', {timeout: 60000});
    await sleep(2000);
    // await page.click(''); // 有坑
    await page.evaluate(()=> {
        document.querySelector('.aicourse-template-foot > img').click()
      });
    await page.waitForNavigation();
    
    // await page.evaluate(()=> {
    //     document.querySelector('.btn-pay').click()
    //   });

    await sleep(1000);
    browser.close();
})()


const sleep = (time) => {
    return new Promise((resolved) => {
        setTimeout(() => {
            resolved();
        }, time);
    })
}