const async = require('async');
// const Order = require('../models/order');
const Product = require('../models/product');
const Category = require('../models/category');
const ProductInstance = require('../models/productinstance');
// const Inventory = require('../models/inventory');
// const User = require('../models/user');


// Display list of all Categories
exports.category_list = (req, res) => {
    Category.find({})
            .exec((err, list_categories) => {
                if (err) {
                    return next(err);
                }
                res.json(list_categories);
            });
}

// Display detail page for a specific Category
exports.category_detail = (req, res) => {
    async.parallel({
        category: (callback) => {Category.findById(req.params.id).exec(callback);},
        category_products: (callback) => {Product.find({'category': req.params.id}).exec(callback);},   
    }, (err, results) => {
        if(err){return next(err);}
        if(results.category == null){
            let err = new Error('Category not found');
            err.status = 404;
            console.log("No categories");
            return next(err);
        }
        // Successful, so render
        res.json(results);
    });
}

exports.category_products_instances_list = (req,res) => {
    async.waterfall([
        function(callback){
            Category.findById(req.params.id).exec(callback, 'category');
        }, 
        function(category, callback){
            Product.find({'category': category }).exec(callback, 'product');
        },
        function(product, callback){
            ProductInstance.find({'product': product }).exec(callback);
        }
    ], (err, results) => {
        console.log('reached callback');
        if(err){
            console.log(err);
            return next(err);
        }
        if(results == null){
            let err = new Error('Category not found');
            err.status = 404;
            console.log("No categories");
            return next(err);
        }
        // Successful, so render
        res.json(results);
    });
}

// Display list of all Products
exports.product_list = (req, res) => {
    Product.find({})
         .populate('category')
         .exec(function(err, list_products){
            if(err) { return next(err);}
            // Successful, so render
            res.json(list_products);
        });
}

// Display detail page for a specific product
exports.product_detail = (req, res) => {
    async.parallel({
        product: (callback) => {
            Product.findById(req.params.id)
            .populate('category')
            .exec(callback);
        },
        product_instances: (callback) => {
            ProductInstance.find({'product': req.params.id })
            .exec(callback);
        }
    }, (err, results) => {
        if(err){return next(err);}
        if(results.product == null){
            let err = new Error('Product not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        res.json(results);
    });
}