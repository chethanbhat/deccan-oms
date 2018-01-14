const express = require('express');
const router = express.Router();

const category_controller = require('../controllers/categoryController');
const product_controller = require('../controllers/productController');
const productinstance_controller = require('../controllers/productinstanceController');
const inventory_controller = require('../controllers/inventoryController');
const order_controller = require('../controllers/orderController');
const user_controller = require('../controllers/userController');
// Get Dashboard Index Page

router.get('/', order_controller.index);

// Category Routes

// Get Request for all categories
router.get('/categories', category_controller.category_list);

// GET Request to create Category
router.get('/category/create', category_controller.category_create_get);

// POST Request to create Category
router.post('/category/create', category_controller.category_create_post);

// GET Request to update Category
router.get('/category/:id/update', category_controller.category_update_get)

// POST Request to update Category
router.post('/category/:id/update', category_controller.category_update_post);

// GET Request to delete Category
router.get('/category/:id/delete', category_controller.category_delete_get)

// POST Request to delete Category
router.post('/category/:id/delete', category_controller.category_delete_post);

// Get Request for one Category
router.get('/category/:id', category_controller.category_detail);

// Product Routes

// Get Request for all Products
router.get('/products', product_controller.product_list);

// GET Request to create Product
router.get('/product/create', product_controller.product_create_get);

// POST Request to create Product
router.post('/product/create', product_controller.product_create_post);

// GET Request to update Product
router.get('/product/:id/update', product_controller.product_update_get)

// POST Request to update Product
router.post('/product/:id/update', product_controller.product_update_post);

// GET Request to update Product
router.get('/product/:id/delete', product_controller.product_delete_get)

// POST Request to update Product
router.post('/product/:id/delete', product_controller.product_delete_post);

// Get Request for one Product
router.get('/product/:id', product_controller.product_detail);

// Product Instance Routes

// Get Request for all Product Instances
router.get('/productinstances', productinstance_controller.productinstance_list);

// GET Request to create Product Instance
router.get('/productinstance/create', productinstance_controller.productinstance_create_get);

// POST Request to create Product Instance
router.post('/productinstance/create', productinstance_controller.productinstance_create_post);

// GET Request to update Product Instance
router.get('/productinstance/:id/update', productinstance_controller.productinstance_update_get)

// POST Request to update Product Instance
router.post('/productinstance/:id/update', productinstance_controller.productinstance_update_post);

// GET Request to delete Product Instance
router.get('/productinstance/:id/delete', productinstance_controller.productinstance_delete_get)

// POST Request to delete Product Instance
router.post('/productinstance/:id/delete', productinstance_controller.productinstance_delete_post);

// Get Request for one Product Instance
router.get('/productinstance/:id', productinstance_controller.productinstance_detail);

// Inventory Routes

// Get Request for Inventory
router.get('/inventory', inventory_controller.inventory_list);

// GET Request to create Inventory
router.get('/inventory/create', inventory_controller.inventory_create_get);

// POST Request to create Inventory
router.post('/inventory/create', inventory_controller.inventory_create_post);

// GET Request to update Inventory
router.get('/inventory/:id/update', inventory_controller.inventory_update_get)

// POST Request to update Inventory
router.post('/inventory/:id/update', inventory_controller.inventory_update_post);

// GET Request to delete Inventory
router.get('/inventory/:id/delete', inventory_controller.inventory_delete_get)

// POST Request to delete Inventory
router.post('/inventory/:id/delete', inventory_controller.inventory_delete_post);

// Get Request for one Inventory
router.get('/inventory/:id', inventory_controller.inventory_detail);

// Order Routes

// Get Request for all Orders
router.get('/orders', order_controller.order_list);

// GET Request to create Order
router.get('/order/create', order_controller.order_create_get);

// POST Request to create Order
router.post('/order/create', order_controller.order_create_post);

// GET Request to update Order
router.get('/order/:id/update', order_controller.order_update_get)

// POST Request to update Order
router.post('/order/:id/update', order_controller.order_update_post);

// GET Request to delete Order
router.get('/order/:id/delete', order_controller.order_delete_get)

// POST Request to delete Order
router.post('/order/:id/delete', order_controller.order_delete_post);

// Get Request for one Order
router.get('/order/:id', order_controller.order_detail);

// User Routes

// Get Request for all Users
router.get('/users', user_controller.user_list);

// GET Request to create User
router.get('/user/create', user_controller.user_create_get);

// POST Request to create User
router.post('/user/create', user_controller.user_create_post);

// GET Request to update User
router.get('/user/:id/update', user_controller.user_update_get)

// POST Request to update Order
router.post('/user/:id/update', user_controller.user_update_post);

// GET Request to delete Order
router.get('/user/:id/delete', user_controller.user_delete_get)

// POST Request to delete Order
router.post('/user/:id/delete', user_controller.user_delete_post);

// Get Request for one Order
router.get('/user/:id', user_controller.user_detail);

module.exports = router;
