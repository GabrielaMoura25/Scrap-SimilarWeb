const puppeteer = require('puppeteer');
const Website = require('../models/websiteModel');

async function scrapeWebsite(url) {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/83.0.4103.97 Chrome/83.0.4103.97 Safari/537.36');

    await page.goto(`https://similarweb.com/website/${url}`);
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' })

    const site = await page.$eval('.wa-overview__title', element => element.textContent);
    const name = await page.$eval('.app-company-info__row > dd', element => element.textContent);

    const rank = await page.$$('.wa-rank-list__value');
    const globalRank = await rank[0].evaluate(element => element.textContent);
    const countryRank = await rank[1].evaluate(element => element.textContent);
    const categoryRank = await rank[2].evaluate(element => element.textContent);

    const engagement = await page.$$('.engagement-list__item-value');
    const totalVisits = await engagement[0].evaluate(element => element.textContent);
    const bounceRate = await engagement[1].evaluate(element => element.textContent);
    const pagesPerVisit = await engagement[2].evaluate(element => element.textContent);
    const averageVisitDuration = await engagement[3].evaluate(element => element.textContent);
    
    const demographics__gender = await page.$$('.wa-demographics__gender-legend-item-value');
    const femaleDistribution = await demographics__gender[0].evaluate(element => element.textContent);
    const maleDistribution = await demographics__gender[1].evaluate(element => element.textContent);
 
    const ageDistribution = await page.$$eval('.highcharts-root', elements => {
        const allAgeDistribution = [elements[3]].map(element => {
            const ageGroups = element.querySelectorAll('.highcharts-axis-labels > text');
            const percentages = element.querySelectorAll('.wa-demographics__age-data-label');

            const ageGroupsData = [];

            ageGroups.forEach((ageGroup, index) => {
                ageGroupsData.push({ ageGroup: ageGroup.textContent, percentage: percentages[index].textContent });
            });
            return ageGroupsData;
        });
        return allAgeDistribution.flat();
    });

    const topCountries = await page.$$eval('.wa-geography__chart-legend', elements => { 
        const allCountriesData = elements.map(element => {
            const countries = element.querySelectorAll('.wa-geography__country-name');
            const percentages = element.querySelectorAll('.wa-geography__country-traffic-value');

            const countriesData = [];

            countries.forEach((country, index) => {
                countriesData.push({ country: country.textContent, percentage: percentages[index].textContent });
            });
            return countriesData;
        });
        return allCountriesData.flat();
    });

    const website = new Website({
      url,
      site,
      name,
      globalRank,
      countryRank,
      categoryRank,
      totalVisits,
      bounceRate,
      pagesPerVisit,
      averageVisitDuration,
      femaleDistribution,
      maleDistribution,
      ageDistribution,
      topCountries,
    });

    const savedWebsite = await website.save();

    await browser.close();

    return savedWebsite;
  } catch (error) {
    console.error('Erro ao acessar a página:', error);
  }
}

async function getWebsiteInfo(url) {
    try {
        const websiteInfo = await Website.findOne({ url });

        return websiteInfo;
    } catch (error) {
        console.error('Erro ao buscar informações do site:', error);
    }
}

module.exports = { scrapeWebsite, getWebsiteInfo };
