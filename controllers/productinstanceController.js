const async = require('async');
const Order = require('../models/order');
const Product = require('../models/product');
const Category = require('../models/category');
const ProductInstance = require('../models/productinstance');
const Inventory = require('../models/inventory');
const User = require('../models/user');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

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
    Product.find({}).exec((err, list_products) => {
        if(err){return next(err);}
        res.render('product_instance_form', {title: 'Create Product Instance', product_list: list_products});
    })
}

// Handle productinstance create on POST
exports.productinstance_create_post = [

    // Validate that the title field is not empty.
    body('title', 'Product Title is required').isLength({min:5}).trim(),
    body('color', 'Product Color is required').isLength({min:3}).trim(),

    // Sanitize (trim and escape) the name field.
    sanitizeBody('*').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
            // Extract the validation errors from a request.
            const errors = validationResult(req);

            // Create a genre object with escaped and trimmed data.
            const productInstance = new ProductInstance(
                { 
                    title: req.body.title,
                    product: req.body.product,
                    color: req.body.color,
                    image: req.body.image,
                    availability: req.body.availability
                }
            );

            if (!errors.isEmpty()) {
                Product.find({}).exec((err, list_products) => {
                    if(err){return next(err);}
                    res.render('product_instance_form', {title: 'Create Product Instance', product_list: list_products, product_instance: productInstance, errors: errors.array()});
                });
            return;
            }
            else {
                // Data from form is valid.
                // Check if Category with same name already exists.
                ProductInstance.findOne({'title': req.body.title})
                .exec((err, found_product_instance) => {
                    if(err){return next(err);}
                    if(found_product_instance){
                        // Category exists, redirect to its detail page.
                        res.redirect('/dashboard/' + found_product_instance.url)
                    }
                    else {
                        productInstance.save((err) => {
                            if(err){return next(err);}
                            // Category saved. Redirect to category detail page. 
                            res.redirect('/dashboard/' + productInstance.url);
                        })    
                    }
                })
            }
    }
]

// Display productinstance update form on GET
exports.productinstance_update_get = (req, res, next) => {
    async.parallel({
        product_instance: (callback) => {
            ProductInstance.findById(req.params.id).populate('product').exec(callback);
        },
        product_list: (callback) => {
            Product.find(callback);
        }
    }, (err, results) => {
        if(err){return next(err)}
        if(results.product_instance == null){
            res.redirect('/dashboard/products');
        }
        res.render('product_instance_form', {title: 'Update Product Instance', product_instance: results.product_instance ,product_list: results.product_list});
    })
}

// Handle productinstance update form on POST
exports.productinstance_update_post = [

    // Validate that the title field is not empty.
    body('title', 'Product Title is required').isLength({min:5}).trim(),
    body('color', 'Product Color is required').isLength({min:3}).trim(),

    // Sanitize (trim and escape) the name field.
    sanitizeBody('*').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
            // Extract the validation errors from a request.
            const errors = validationResult(req);

            // Create a genre object with escaped and trimmed data.
            const productInstance = new ProductInstance(
                { 
                    title: req.body.title,
                    product: req.body.product,
                    color: req.body.color,
                    image: req.body.image,
                    availability: req.body.availability,
                    _id: req.params.id
                }
            );

            if (!errors.isEmpty()) {
                Product.find({}).exec((err, list_products) => {
                    if(err){return next(err);}
                    res.render('product_instance_form', {title: 'Update Product Instance', product_list: list_products, product_instance: productInstance, errors: errors.array()});
                });
            return;
            }
            else {
                // Data from form is valid.
                // Check if Category with same name already exists.
                ProductInstance.findByIdAndUpdate(req.params.id, productInstance, (err) => {
                    if(err){return next(err);}
                    res.redirect('/dashboard/' + productInstance.url);
                })

            }
    }
]

// Display productinstance delete form on GET
exports.productinstance_delete_get = (req, res, next) => {
    ProductInstance.findById(req.params.id, (err, product_instance) => {
        if(err){return next(err)}
        res.render('product_instance_delete', {title: 'Delete Product Instance', product_instance});
    });
    
}

// Handle productinstance delete form on POST
exports.productinstance_delete_post = (req, res) => {
    ProductInstance.findByIdAndRemove(req.params.id, (err) => {
        if(err){return next(err)}
        res.redirect('/dashboard/productinstances')
    });
}
