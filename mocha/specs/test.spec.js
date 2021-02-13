'use strict';

const { expect } = require('chai');
const { browser } = require('protractor');
const CareerPage = require('../pageObjects/careerPage.js');
const careerPage = new CareerPage();

describe('Search for a job', function () {
    this.timeout(GLOBAL_TIMEOUT);


    describe('Carrer page', () => {
        beforeEach(async () => {
            await careerPage.load();
        });

        it('should be opened', async () => {
            expect(await careerPage.logo.isDisplayed()).to.be.true;
        });

        describe('Search form', () => {
            it('should be displayed', async () => {
                expect(await careerPage.searchForm.isDisplayed()).to.be.true;
            });

            //dropdown is not clickable
            describe.skip('Location filter box', () => {
                before(async () => {
                    //click on location filter box
                    await browser.wait(ec.visibilityOf(careerPage.locationFilterBox), GLOBAL_TIMEOUT);
                    await careerPage.locationFilterBox.click();
                    //select country/city
                    await browser.wait(ec.visibilityOf(careerPage.getCountry), GLOBAL_TIMEOUT);
                    await careerPage.getCountry.click();
                    await browser.wait(ec.visibilityOf(careerPage.getCity), GLOBAL_TIMEOUT);
                    await careerPage.getCity.click();
                })

                it('should be able to select a location', async () => {
                    expect(await careerPage.selectedLocation.getText()).to.be.equal('Debrecen');
                });
            });

            //dropdown is not clickable
            describe.skip('Skills filter box', () => {
                before(async () => {
                    //click on skills filter box
                    await browser.wait(ec.visibilityOf(careerPage.skillFilterBox), GLOBAL_TIMEOUT);
                    await careerPage.skillFilterBox.click();
                    //select a skill
                    await browser.wait(ec.visibilityOf(careerPage.getSkill), GLOBAL_TIMEOUT);
                    await careerPage.getSkill.click();

                })
                it(`should be able to select skill`, async () => {
                    expect(await careerPage.selectedSkill.getText()).to.contain('Software Test Engineering');
                });
            });
        });

        describe('Search result', () => {
            before(async () => {
                //click on search button
                await careerPage.loadResults('Hungary', 'Debrecen', 'Software Test Engineering');
            });

            it('should have proper position', async () => {
                expect(await careerPage.getResultCount()).to.be.greaterThan(0);
            });

            it('should have proper skill');

            it('should have proper location');

            it('should have an apply button');

        });

        describe('Job details', () => {
            before(() => {
                //click on apply button
            });

            it('should have proper location');

            it('should have proper position');

            it('should have submit button');

            it('should have mandatory fields');
        });

    });

});
