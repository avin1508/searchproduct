const Product = require('../models/Product');

const createProduct = async (req, res) => {
    try {
      const { name, quantity, description } = req.body;
      const product = new Product({ name, quantity, description });
      await product.save();
      res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  const getLowStockProducts = async (req, res) => {
    try {
      const lowStockProducts = await Product.find({ quantity: { $lt: 10 } });
      res.json(lowStockProducts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



  const getProducts = async (req, res) => {
    try {
      const { name, description, page = 1, limit = 10 } = req.query;
      const query = {};
      if (name && typeof name === 'string') {
        query.name = { $regex: name, $options: 'i' };
      }
      if (description && typeof description === 'string') {
        query.description = { $regex: description, $options: 'i' };
      }
      const pageNum = parseInt(page, 10) || 1;
      const limitNum = parseInt(limit, 10) || 10;
      const products = await Product.find(query)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum);
      const total = await Product.countDocuments(query);
  
      res.json({
        products,
        totalPages: Math.ceil(total / limitNum),
        currentPage: pageNum
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


  const storeProducts = async (req, res) => {
    try {
      const products = req.body.products; 
      const insertedProducts = await Product.insertMany(products);
  
      res.status(201).json(insertedProducts); 
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = {
    createProduct,
    getAllProducts,
    getLowStockProducts,
    getProducts,
    storeProducts
  };

 