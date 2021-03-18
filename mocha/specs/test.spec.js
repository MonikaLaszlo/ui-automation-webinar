'use strict';

const { expect } = require('chai');
const { before } = require('mocha');
const { browser } = require('protractor');
const CareerPage = require('../pageObjects/careerPage.js');
const careerPage = new CareerPage();
const testData = require('../data.json');
const { getTestData } = require('../../app.js');

const testAllData = async () => {
    const datas = await getTestData();
    console.log(datas);
    datas.forEach(data => {
        describe(`Search for a ${data.Skill} job in ${data.Country}/${data.City}`, function () {
            this.timeout(GLOBAL_TIMEOUT);

            describe('Career page', () => {
                before(async () => {
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

                        it(`should be able to select location ${data.City}`, async () => {
                            expect(await careerPage.selectedLocation.getText()).to.be.equal(data.City);
                        });
                    });

                    //dropdown is not clickable
                    describe.skip('Skills filter box', () => {
                        before(async () => {
                            await careerPage.selectSkill();
                        })

                        it(`should be able to select skill ${data.Skill}`, async () => {
                            expect(await careerPage.selectedSkill.getText()).to.contain(data.skill);
                        });
                    });
                });

                describe('Search result', () => {
                    before(async () => {
                        await careerPage.loadResults(data.Country, data.City, data.Skill);
                    });

                    it(`should have proper position ${data.Position}`, async () => {
                        expect(await careerPage.searchResults.getText()).length.to.be.greaterThan(0);
                    });

                    it(`should have proper skill ${data.Skill}`, async () => {
                        expect(await careerPage.selectedSkill.getText()).to.be.equal(data.Skill.toUpperCase());
                    });

                    it(`should have proper location ${data.City}`, async () => {
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
                    let lastPosition;
                    before(async () => {
                        lastPosition = await careerPage.getLastPosition();
                        await careerPage.applyForPosition();
                    });

                    it(`should have proper location ${data.City}`, async () => {
                        expect(await careerPage.jobHeader.getText()).to.be.contain(data.City);
                    });

                    it(`should have proper position ${data.Position}`, async () => {
                        expect(await careerPage.jobHeader.getText()).to.be.contain(lastPosition);
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
    run();
};

testAllData();