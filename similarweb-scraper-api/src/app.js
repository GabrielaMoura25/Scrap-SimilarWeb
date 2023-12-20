const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/similarweb', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(apiRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint Not found' });
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));