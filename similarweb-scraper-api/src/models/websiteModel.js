const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
    url: { type: String, required: true, unique: true },
    site: { type: String, required: true },
    name: { type: String, required: true },
    globalRank: { type: String, required: true },
    countryRank: { type: String, required: true },
    categoryRank: { type: String, required: true },
    totalVisits: { type: String, required: true },
    bounceRate: { type: String, required: true },
    pagesPerVisit: { type: String, required: true },
    averageVisitDuration: { type: String, required: true },
    femaleDistribution: { type: String, required: true },
    maleDistribution: { type: String, required: true },
    ageDistribution: { type: Array, required: true },
    topCountries: { type: Array, required: true },
});

const Website = mongoose.model('Website', websiteSchema);

module.exports = Website;