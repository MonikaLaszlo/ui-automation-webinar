'use strict';

const { expect } = require('chai');
const { before } = require('mocha');
const { browser } = require('protractor');
const CareerPage = require('../pageObjects/careerPage.js');
const careerPage = new CareerPage();
const testData = require('../data.json');


testData.forEach(data => {
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
                       await careerPage.selectLocation();
                    })

                    it('should be able to select a location', async () => {
                        expect(await careerPage.selectedLocation.getText()).to.be.equal(data.City);
                    });
                });

                //dropdown is not clickable
                describe.skip('Skills filter box', () => {
                    before(async () => {
                       await careerPage.selectSkill();

                    })
                    it(`should be able to select skill`, async () => {
                        expect(await careerPage.selectedSkill.getText()).to.contain(data.skill);
                    });
                });
            });

            describe('Search result', () => {
                beforeEach(async () => {
                    await careerPage.loadResults(data.Country, data.City, data.Skill);
                });

                it('should have proper position', async () => {
                    expect(await careerPage.searchResults.getText()).length.to.be.greaterThan(0);
                });

                it('should have proper skill', async () => {
                    expect(await careerPage.selectedSkill.getText()).to.be.equal(data.Skill.toUpperCase());
                });

                it('should have proper location', async () => {
                    const locations = await careerPage.locations.getText();
                    for (const location of locations) {
                        expect(location.toUpperCase()).to.contain(data.City.toUpperCase());
                    }
                });

                it('should have an apply link', async () => {
                    const applyLinksVisibilities = await careerPage.applyLinks.map((link) => {
                        return link.isDisplayed();
                    })
                    expect(applyLinksVisibilities.every(Boolean)).to.be.true;
                    expect(applyLinksVisibilities.length).to.be.equal(await careerPage.searchResults.count());
                });

            });

            describe('Job details', () => {
                beforeEach(async () => {
                    await careerPage.loadResults(data.Country, data.City, data.Skill);
                    await careerPage.applyForPosition();
                });

                it('should have proper location', async () => {
                    expect(await careerPage.jobHeader.getText()).to.be.contain(data.City);
                });

                it('should have proper position', async () => {
                    expect(await careerPage.jobHeader.getText()).to.be.contain(data.Position);
                });

                it('should have mandatory fields', async () => {
                    expect(await careerPage.inputFirstName.getAttribute('aria-required')).to.equal('true');
                    expect(await careerPage.inputLastName.getAttribute('aria-required')).to.equal('true');
                    expect(await careerPage.inputEmail.getAttribute('aria-required')).to.equal('true');
                });

                it('should have submit button', async () => {
                    expect(await careerPage.submitButton.isDisplayed()).to.be.true;
                });
            });
        });
    });
});
