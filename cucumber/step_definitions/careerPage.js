'use strict';

const { Given, When, Then, setDefaultTimeout } = require('cucumber');
const CareerPage = require('../../mocha/pageObjects/careerPage');
const careerPage = new CareerPage();

setDefaultTimeout(GLOBAL_TIMEOUT);

    let lastPosition;
    
    Given(/^I open the career page$/, async () => {
        await careerPage.load();
    });

    Then(/^the logo should be visible$/, async () => {
        expect(await careerPage.logo.isDisplayed()).to.be.true;
    });

    Then(/^the search form should be visible$/, async () => {
        expect(await careerPage.searchForm.isDisplayed()).to.be.true;
    });

    When(/^I select the location (.+) and (.+) in the location filter box$/, async (country, city) => {
       await careerPage.selectLocation(country, city);
    });

    Then(/^(.+) should be selected in the location filter box$/, async (city) => {
       expect(await careerPage.selectedLocation.getText()).to.be.equal(city);
    });

    When(/^I select the skill (.+) in the skills filter box$/, async (skill) => {
        await careerPage.selectSkill(skill);
    });

    Then(/^(.+) should be selected in the skills filter box$/, async (skill) => {
       expect(await careerPage.selectedSkill.getText()).to.contain(skill);
    });

    When(/^I click on the find button and select (.+) country (.+) city (.+) skill$/, async (country, city, skill) => {
        await careerPage.loadResults(country, city, skill);
    });

    Then(/^should have proper position$/, async () => {
        expect(await careerPage.searchResults.getText()).length.to.be.greaterThan(0);
    });

    Then(/^the skill of the position should be (.+)$/, async (skill) => {
        expect(await careerPage.selectedSkill.getText()).to.be.equal(skill.toUpperCase());
    });

    Then(/^the location of the position should be (.+)$/, async (city) => {
        const locations = await careerPage.locations.getText();
        for (const location of locations) {
            expect(location.toUpperCase()).to.contain(city.toUpperCase());
        }
    });

    Then(/^the apply link should be visible$/, async () => {
        const applyLinksVisibilities = await careerPage.applyLinks.map((link) => {
            return link.isDisplayed();
        })
        expect(applyLinksVisibilities.every(Boolean)).to.be.true;
    });

    When(/^I click on the apply link$/, async () => {
        lastPosition = await careerPage.getLastPosition();
        await careerPage.applyForPosition();
    });

    Then(/^the description of the position should contain the location (.+)$/, async (city) => {
        expect(await careerPage.jobHeader.getText()).to.be.contain(city);
    });

    Then(/^the description of the position should contain (.+) position$/, async (position) => {
        expect(await careerPage.jobHeader.getText(position)).to.be.contain(lastPosition);
    });

    Then(/^should have mandatory fields$/, async () => {
        expect(await careerPage.inputFirstName.getAttribute('aria-required')).to.equal('true');
        expect(await careerPage.inputLastName.getAttribute('aria-required')).to.equal('true');
        expect(await careerPage.inputEmail.getAttribute('aria-required')).to.equal('true');
    });

    Then(/^should have submit button$/, async () => {
        expect(await careerPage.submitButton.isDisplayed()).to.be.true;
    });