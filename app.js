const express = require('express');
const connectDB = require('./config/database');
const productRoutes = require('./routes/productRoutes');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use('/products', productRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Product Service running on port ${PORT}`));
