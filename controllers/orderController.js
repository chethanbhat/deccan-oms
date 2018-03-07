const async = require('async');
const Order = require('../models/order');
const Product = require('../models/product');
const Category = require('../models/category');
const ProductInstance = require('../models/productinstance');
const Inventory = require('../models/inventory');
const User = require('../models/user');

exports.index = (req, res) => {
    async.parallel({
        product_count: (callback) => {Product.count(callback);},
        category_count: (callback) => {Category.count(callback);},
        product_instance_count: (callback) => {ProductInstance.count(callback);},
        order_count: (callback) => {Order.count(callback);},
        user_count: (callback) => {User.count(callback);},
        inventory_count: (callback) => {Inventory.count(callback);},

    } , function(err, results){
        res.render('index', {title: 'OMS Dashboard', error: err, data: results});
    }

    )
}

// Display list of all orders
exports.order_list = (req, res) => {
    Order.find({}, '_id user date')
        .populate('user')
        .exec(function(err, list_orders){
            if(err) { return next(err);}
            // Successful, so render
            res.render('order_list', {title: 'Orders', order_list: list_orders});
        });
}

// Display detail page for a specific order
exports.order_detail = (req, res, next) => {
    Order.findById(req.params.id)
        .populate('items.item')
        .populate('user')
        .exec((err, order) => {
        if(err){return next(err);}
        if(order == null){
            let err = new Error('Order not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        res.render('order_detail', {title: 'Order Details', order});
    });
}

// Display order create form on GET
exports.order_create_get = (req, res) => {
    res.send('Not Implemented: Order create GET');
}

// Handle order create on POST
exports.order_create_post = (req, res) => {
    res.send('Not Implemented: Order create POST');
}

// Display order update form on GET
exports.order_update_get = (req, res) => {
    res.send('Not Implemented: Order Update GET');
}

// Handle order update form on POST
exports.order_update_post = (req, res) => {
    res.send('Not Implemented: Order Update POST');
}

// Display order delete form on GET
exports.order_delete_get = (req, res) => {
    res.send('Not Implemented: Order Delete GET');
}

// Handle order delete form on POST
exports.order_delete_post = (req, res) => {
    res.send('Not Implemented: Order Delete POST');
}
