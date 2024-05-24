const express = require('express');
const { createProduct, getAllProducts, getLowStockProducts, getProducts, storeProducts } = require('../controllers/productController');
const { authUser, authAdmin } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { createProductSchema } = require('../validations/productValidation');

const router = express.Router();

router.post('/createproduct', authAdmin, validate(createProductSchema), createProduct);
router.get('/allproduct', authUser, getAllProducts);
router.get('/low-stock', authAdmin, getLowStockProducts);
router.get('/', getProducts);
router.post('/storeproduct',storeProducts);

module.exports = router;