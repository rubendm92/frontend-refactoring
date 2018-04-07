const serve = require('serve');
const puppeteer = require('puppeteer');
const expect = require('chai').expect;

const browser = fn => (async () => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto('http://localhost:8000');

    try {
        await fn({
            fill: fill(page),
            click: click(page),
            elementPresent: elementPresent(page),
            elementHasText: elementHasText(page)
        });
    } finally {
        await browser.close();
    }
});

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
    elementPresent(page)(selector);
    const actualText = await page.evaluate(selector => document.querySelector(selector).textContent, selector);
    expect(expectedText).to.equal(actualText);
};

describe('Notes', function() {
    let server;
    before(done => {
        server = serve('.', { port: 8000 });
        setTimeout(done, 1000);
    });

    it('can create a note with a text and a date', browser(async (page) => {
        await page.fill('#note_input', 'Hello');
        await page.fill('#date_input', '22/06/1992');
        await page.click('input[type="submit"]');
        await page.elementPresent('li');
        await page.elementHasText('li > p', 'Hello 1992-06-22');
    }));

    after(() => server.stop());
});
