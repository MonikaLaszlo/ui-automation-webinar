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
        this.selectedLocation = this.locationFilterBox.element(by.id('select-box-location-select-container'));
        this.skillFilterBox = this.searchForm.element(by.css('.default-label'));
        this.getSkill = this.searchForm.element(by.css('input[data-value="Software Test Engineering"]'));
        this.selectedSkill = this.getSkill.all(by.css('multi-select-dropdown-container'));

    }

    get searchResults() {
        return element.all(by.css('.search-result__item'));
    }

    async load(url = 'https://epam.com/careers') {
        await browser.get(url);
        await browser.wait(ec.visibilityOf(this.logo), GLOBAL_TIMEOUT);
    }

    async loadResults(country, city, ...skills) {
        const query = { country, city, department: skills };
        await this.load(`https://epam.com/careers/job-listings?${objToQueryString(query)}`);
        await browser.wait(async () => {
            return await this.getResultCount() > 0;
        }, GLOBAL_TIMEOUT);
    }

    async getResultCount() {
        try {
            return await this.searchResults.count();
        } catch {
            return 0;
        }
    }

};

module.exports = CareerPage;