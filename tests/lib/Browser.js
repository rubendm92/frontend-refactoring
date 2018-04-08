const puppeteer = require('puppeteer');
const expect = require('chai').expect;

const fill = page => (selector, value) => page.$eval(selector, (el, value) => el.value = value, value);

const elementPresent = page => async selector => {
    if (await page.$(selector) === null) {
        throw new Error(`Element "${selector}" not found`);
    }
};

const elementNotPresent = page => async (selector, content) => {
    const element = await page.$(selector);
    if (element !== null && content === undefined || element.textContent === content) {
        throw new Error(`Element "${selector}" found`);
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
            click: page.click.bind(page),
            hover: page.hover.bind(page),
            elementPresent: elementPresent(page),
            elementNotPresent: elementNotPresent(page),
            elementHasText: elementHasText(page),
            execute: page.evaluate.bind(page),
            refresh: page.reload.bind(page)
        });
    } finally {
        await browser.close();
    }
});