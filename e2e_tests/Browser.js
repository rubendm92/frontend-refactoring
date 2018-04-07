const puppeteer = require('puppeteer');
const expect = require('chai').expect;

const fill = page => (selector, value) => page.type(selector, value);

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
    const actualText = await page.evaluate(selector => document.querySelector(selector).textContent, selector);
    expect(expectedText).to.equal(actualText);
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