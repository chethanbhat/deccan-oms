const express = require('express');
const router = express.Router();

const Category = require('../models/category');

const category_controller = require('../controllers/categoryController');
const product_controller = require('../controllers/productController');
const productinstance_controller = require('../controllers/productinstanceController');
const inventory_controller = require('../controllers/inventoryController');
const order_controller = require('../controllers/orderController');
const user_controller = require('../controllers/userController');

const api_controller = require('../controllers/apiController') ;

// Category Routes

// Get Request for all categories
router.get('/categories', api_controller.category_list);

// Get Request for one Category
router.get('/category/:id', api_controller.category_detail);

// Get Request for all Products under selected Category
router.get('/category/:id/products/', api_controller.category_products_instances_list);

// Product Routes

// Get Request for all Products
router.get('/products', api_controller.product_list);

// Get Request for one Product
router.get('/product/:id', api_controller.product_detail);

module.exports = router;
