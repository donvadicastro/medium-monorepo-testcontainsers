import * as puppeteer from 'puppeteer';

describe('Complete E2E APP tests', () => {
    let page: puppeteer.Page;

    beforeAll(async () => {
        const browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    it('Check main page', async () => {
        await page.goto(process.env['APP_URL'] || '');
        await expect(page.title()).resolves.toMatch('App');
    });

    it('Check table', async () => {
        await page.waitForSelector("table");
        const rows = await page.$$('table tr');

        expect(3).toBe(rows.length);

        let value = await page.evaluate(el => el?.textContent, rows[1]);
        expect('first1last1YES').toBe(value);

        value = await page.evaluate(el => el?.textContent, rows[2]);
        expect('first2last2NO').toBe(value);
    });
});