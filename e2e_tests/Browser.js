const puppeteer = require('puppeteer');
const expect = require('chai').expect;

const fill = page => (selector, value) => page.$eval(selector, (el, value) => el.value = value, value);

const click = page => selector => page.click(selector);

const elementPresent = page => async selector => {
    const timeout = 500;
    try {
        await page.waitForSelector(selector, {timeout: timeout});
    } catch (e) {
        throw new Error(`Element "${selector}" not found after ${timeout} ms`);
    }
};

const elementHasText = page => async (selector, expectedText) => {
    const actualText = await page.evaluate((selector, expectedText) => {
        const elements = [...document.querySelectorAll(selector)];
        return elements.find(el => el.textContent === expectedText) ? expectedText : elements[0].textContent;
    }, selector, expectedText);
    expect(actualText).to.equal(expectedText);
};

module.exports = url => fn => (async () => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto(url);

    try {
        await fn({
            fill: fill(page),
            click: click(page),
            elementPresent: elementPresent(page),
            elementHasText: elementHasText(page),
            refresh: page.reload.bind(page)
        });
    } finally {
        await browser.close();
    }
});