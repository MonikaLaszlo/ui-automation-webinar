'use strict';

const { element, by, browser } = require("protractor");

const objToQueryString = obj => {
    const params = [];
    for (const [key, value] of Object.entries(obj)) {

        if (Array.isArray(value)) {
            for (const el of value) {
                params.push(`${key}=${el}`);
            }
        } else {
            params.push(`${key}=${value}`);
        }
    }

    return params.join('&');
}

class CareerPage {
    constructor() {
        this.logo = element(by.css('img.header__logo'));
        this.searchForm = element(by.css('.recruiting-search-ui'));
        this.locationFilterBox = this.searchForm.element(by.css('.select2-results__option'));
        this.getCountry = this.locationFilterBox.element(by.css('li[aria-label="Hungary"] strong'));
        this.getCity = this.locationFilterBox.element(by.css('[title="Debrecen"]'));
        this.skillFilterBox = this.searchForm.element(by.css('.default-label'));
        this.getSkill = this.searchForm.element(by.css('input[data-value="Software Test Engineering"]'));
        this.cookieButton = element(by.css('.cookie-disclaimer button'));
        this.jobHeader = element(by.css('h1'));
        this.applyForm = element(by.css('.form-apply-for-job'));
        this.inputFirstName = this.applyForm.element(by.name('applicantFirstName'));
        this.inputLastName = this.applyForm.element(by.name('applicantLastName'));
        this.inputEmail = this.applyForm.element(by.name('applicantEmail'));
        this.submitButton = element(by.css('.button-ui-wrapper .button-ui'));
    }

    get searchResults() {
        return element.all(by.css('.search-result__item'));
    }

    get selectedSkill() {
        return element(by.css('.selected-items .filter-tag'));
    }

    get locations() {
        return element.all(by.css('.search-result__location'));
    }

    get applyLinks() {
        return element.all(by.css('.search-result__item-apply'));
    }

    async load(url = 'https://epam.com/careers') {
        await browser.get(url);
        await browser.wait(ec.visibilityOf(this.logo), GLOBAL_TIMEOUT);
    }

    async loadResults(country, city, ...skills) {
        const query = { country, city, department: skills };
        await this.load(`https://epam.com/careers/job-listings?${objToQueryString(query)}`);
    }

    async applyForPosition() {
        const lastLink = this.applyLinks.last();
        await browser.wait(ec.elementToBeClickable(lastLink), GLOBAL_TIMEOUT);
        try {
            const isVisible = await this.cookieButton.isDisplayed();
            if (isVisible) {
                await this.cookieButton.click();
            }
        } catch {
            // NOOP
        } finally {
            await lastLink.click();
        }
    }

    getLastPosition() {
        const lastPositionName = this.searchResults.last().element(by.css('h5'));
        return lastPositionName.getText();
    }

    async selectLocation() {
        //click on location filter box
        await browser.wait(ec.visibilityOf(careerPage.locationFilterBox), GLOBAL_TIMEOUT);
        await careerPage.locationFilterBox.click();
        //select country/city
        await browser.wait(ec.visibilityOf(careerPage.getCountry), GLOBAL_TIMEOUT);
        await careerPage.getCountry.click();
        await browser.wait(ec.visibilityOf(careerPage.getCity), GLOBAL_TIMEOUT);
        await careerPage.getCity.click();
    }

    async selectSkill() {
        //click on skills filter box
        await browser.wait(ec.visibilityOf(careerPage.skillFilterBox), GLOBAL_TIMEOUT);
        await careerPage.skillFilterBox.click();
        //select a skill
        await browser.wait(ec.visibilityOf(careerPage.getSkill), GLOBAL_TIMEOUT);
        await careerPage.getSkill.click();
    }
};

module.exports = CareerPage;