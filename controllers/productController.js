const async = require('async');
const Order = require('../models/order');
const Product = require('../models/product');
const Category = require('../models/category');
const ProductInstance = require('../models/productinstance');
const Inventory = require('../models/inventory');
const User = require('../models/user');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Products
exports.product_list = (req, res) => {
    Product.find({}, 'title')
         .populate('category')
         .exec(function(err, list_products){
            if(err) { return next(err);}
            // Successful, so render
            res.render('product_list', {title: 'All Products', product_list: list_products});
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
        res.render('product_detail', {title: 'Product Details', product: results.product, product_instances: results.product_instances});
    });
}

// Display product create form on GET
exports.product_create_get = (req, res) => {
    Category.find({}).exec((err, list_categories) => {
        if(err){return next(err);}
        res.render('product_form', {title: 'Create Product', category_list: list_categories});
    })
    
}

// Handle product create on POST
exports.product_create_post = [

        // Validate that the title field is not empty.
        body('title', 'Product name required').isLength({min:1}).trim(),
        body('price', 'Product price required').isLength({min:1}).trim(),
    
        // Sanitize (trim and escape) the name field.
        sanitizeBody('*').trim().escape(),
    
        // Process request after validation and sanitization.
        (req, res, next) => {
                // Extract the validation errors from a request.
                const errors = validationResult(req);
    
                // Create a genre object with escaped and trimmed data.
                const product = new Product(
                    { 
                        title: req.body.title,
                        price: req.body.price,
                        category: req.body.category,
                        features: req.body.features,
                        dimensions: req.body.dimensions,
                    }
                );
    
                if (!errors.isEmpty()) {
                    Category.find({}).exec((err, list_categories) => {
                        if(err){return next(err);}
                        res.render('product_form', {title: 'Create Product', category_list: list_categories, product: product, errors: errors.array()});
                    });
                return;
                }
                else {
                    // Data from form is valid.
                    // Check if Category with same name already exists.
                    Product.findOne({'title': req.body.title})
                    .exec((err, found_product) => {
                        if(err){return next(err);}
                        if(found_product){
                            // Category exists, redirect to its detail page.
                            res.redirect('/dashboard/' + found_product.url)
                        }
                        else {
                            product.save((err) => {
                                if(err){return next(err);}
                                // Category saved. Redirect to category detail page. 
                                res.redirect('/dashboard/' + product.url);
                            })    
                        }
                    })
                }
        }
]

// Display product update form on GET
exports.product_update_get = (req, res, next) => {
    async.parallel({
        product: (callback) => {
            Product.findById(req.params.id).populate('category').exec(callback);
        },
        category_list: (callback) => {
            Category.find(callback);
        }
    }, (err, results) => {
        if(err){return next(err)}
        if(results.product == null){
            res.redirect('/dashboard/products');
        }
        res.render('product_form', {title: 'Update Product', product: results.product ,category_list: results.category_list});
    })
}

// Handle product update form on POST
exports.product_update_post = [

    // Validate that the title field is not empty.
    body('title', 'Product name required').isLength({min:1}).trim(),
    body('price', 'Product price required').isLength({min:1}).trim(),

    // Sanitize (trim and escape) the name field.
    sanitizeBody('*').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
            // Extract the validation errors from a request.
            const errors = validationResult(req);

            // Create a genre object with escaped and trimmed data.
            const product = new Product(
                { 
                    title: req.body.title,
                    price: req.body.price,
                    category: req.body.category,
                    features: req.body.features,
                    dimensions: req.body.dimensions,
                    _id: req.params.id
                }
            );

            if (!errors.isEmpty()) {
                Category.find({}).exec((err, list_categories) => {
                    if(err){return next(err);}
                    res.render('product_form', {title: 'Create Product', category_list: list_categories, product: product, errors: errors.array()});
                });
            return;
            }
            else {
                // Data from form is valid.
                // Check if Category with same name already exists.
                Product.findByIdAndUpdate(req.params.id, product, (err) => {
                    if(err){return next(err)}
                    res.redirect('/dashboard/' + product.url);
                })
            }
    }
]

// Display product delete form on GET
exports.product_delete_get = (req, res, next) => {
    async.parallel({
        product: (callback) => {
            Product.findById(req.params.id).exec(callback);
        },
        product_instances: (callback) => {
            ProductInstance.find({'product': req.params.id}).exec(callback);
        } 
    }, (err, results) => {
        if(err){return next(err);}
        if(results.product == null){res.redirect('/dashboard/products')}

        res.render('product_delete', {title: 'Delete Product', product: results.product, product_instances: results.product_instances});
    })
}

// Handle product delete form on POST
exports.product_delete_post = (req, res) => {
    async.parallel({
        product: (callback) => {
            Product.findById(req.params.id).exec(callback);
        },
        product_instances: (callback) => {
            ProductInstance.find({'product': req.params.id}).exec(callback);
        },
    }, (err, results) => {
        if (err) { return next(err); }
        // Success
        if (results.product_instances.length > 0) {
            // Category has products. Render in same way as for GET route.
            res.render('product_delete', { title: 'Delete Product', product: results.product, product_instances: results.product_instances } );
            return;
        }
        else {
            // Category has no products. Delete object and redirect to the list of categories.
            Product.findByIdAndRemove(req.params.id, function deleteProduct(err) {
                if (err) { return next(err); }
                // Success - go to author list
                res.redirect('/dashboard/products')
            })
        }
    });
}
