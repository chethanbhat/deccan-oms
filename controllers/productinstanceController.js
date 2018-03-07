const async = require('async');
const Order = require('../models/order');
const Product = require('../models/product');
const Category = require('../models/category');
const ProductInstance = require('../models/productinstance');
const Inventory = require('../models/inventory');
const User = require('../models/user');

// Display list of all Product Instances
exports.productinstance_list = (req, res) => {
    ProductInstance.find({})
    .populate('product')
    .exec(function(err, list_product_instances){
       if(err) { return next(err);}
       // Successful, so render
       res.render('product_instance_list', {title: 'All Products Instances', product_instance_list: list_product_instances});
   });
}

// Display detail page for a specific productinstance
exports.productinstance_detail = (req, res) => {

    ProductInstance.findById(req.params.id)
    .populate('product')
    .exec((err,product_instance) => {
        if(err){return next(err);}
        if(product_instance == null){
            let err = new Error('Product Instance not found');
            err.status = 404;
            return next(err);
        }
        res.render('product_instance_detail', {title: 'Product Instance Details', product_instance: product_instance});
    });
}

// Display productinstance create form on GET
exports.productinstance_create_get = (req, res) => {
    res.send('Not Implemented: Product Instance create GET');
}

// Handle productinstance create on POST
exports.productinstance_create_post = (req, res) => {
    res.send('Not Implemented: Product Instance create POST');
}

// Display productinstance update form on GET
exports.productinstance_update_get = (req, res) => {
    res.send('Not Implemented: Product Instance Update GET');
}

// Handle productinstance update form on POST
exports.productinstance_update_post = (req, res) => {
    res.send('Not Implemented: Product Instance Update POST');
}

// Display productinstance delete form on GET
exports.productinstance_delete_get = (req, res) => {
    res.send('Not Implemented: Product Instance Delete GET');
}

// Handle productinstance delete form on POST
exports.productinstance_delete_post = (req, res) => {
    res.send('Not Implemented: Product Instance Delete POST');
}
