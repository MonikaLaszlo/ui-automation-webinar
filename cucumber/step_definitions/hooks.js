'use strict';

const { After, Status } = require('cucumber');
const { browser } = require('protractor');

After (async function(scenario) {
    if (scenario.result.status === Status.FAILED) {
        const screenshot = await browser.takeScreenshot();
        this.attach(screenshot, 'image/png');
    }
});