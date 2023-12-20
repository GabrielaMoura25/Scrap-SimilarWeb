const express  = require('express');
const { scrapeWebsite, getWebsiteInfo } = require('../controllers/scrapingController');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: 'API is working!' });
});

router.post('/salve_info', async (req, res) => {
    const { url } = req.body;

    try {
        const savedWebsite = await scrapeWebsite(url);

        res.status(201).json({ 
            status: 'success',
            message: 'Data scraped successfully',
            websiteId: savedWebsite._id,
        });
    } catch (error) {
        console.error('Erro na rota /salve_info', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
});

router.post('/get_info', async (req, res) => {
    const { url } = req.body;

    try {
        const websiteInfo = await getWebsiteInfo(url);

        if (!websiteInfo) {
            return res.status(404).json({
                status: 'error',
                message: 'Website not found',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Data retrieved successfully',
            websiteInfo,
        });
    } catch (error) {
        console.error('Erro na rota /get_info', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
});

module.exports = router;