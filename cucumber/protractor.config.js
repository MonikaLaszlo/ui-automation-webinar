'use strict';

const GLOBAL_TIMEOUT = 40e3;

exports.config = {
    specs: 'features/**/*.feature',
    capabilities: {
        browserName: 'chrome',
        chromeOptions: { args: [ "--headless", "--disable-gpu", "--window-size=1920,1080"] } 
    },
    /*multiCapabilities: [{
        'browserName': 'firefox'
    }, {
        'browserName': 'chrome'
    }],
    */
    directConnect: true,
    cucumberOpts: {
        require: ['./step_definitions/**/*.js',
            './step_definitions/hooks.js'],
        tags: ['~@wip'],
        format: ['progress', 'json:.tmp/results.json'],
    },
    plugins: [
        {
            package: "protractor-simple-cucumber-html-reporter-plugin",
        }
    ],
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    getPageTimeout: GLOBAL_TIMEOUT,
    onPrepare: async function () {
        global.GLOBAL_TIMEOUT = GLOBAL_TIMEOUT;
        global.ec = protractor.ExpectedConditions;

        const chai = require('chai');
        chai.use(require('chai-as-promised'));
        global.expect = chai.expect;

        await browser.waitForAngularEnabled(false);
        try {
            await browser.manage().window().maximize();
        } catch (e) {
            await browser.manage().window().setSize(1800, 1012);
        }
    }
};