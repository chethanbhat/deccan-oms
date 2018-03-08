const async = require('async');
const Order = require('../models/order');
const Product = require('../models/product');
const Category = require('../models/category');
const ProductInstance = require('../models/productinstance');
const Inventory = require('../models/inventory');
const User = require('../models/user');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


// Display list of all Categories
exports.category_list = (req, res) => {
    Category.find({},'title')
            .exec((err, list_categories) => {
                if(err){return next(err);}
                res.render('category_list', {title: 'All Categories', category_list: list_categories});
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
        res.render('category_detail', {title: 'Category Details', category: results.category, category_products: results.category_products});
    });
}

// Display Category create form on GET
exports.category_create_get = (req, res) => {
    res.render('category_form', {title: 'Create Category'});    
}

// Handle Category create on POST
exports.category_create_post = [
    // Validate that the name field is not empty.
    body('title', 'Category name required').isLength({min:1}).trim(),
    
    // Sanitize (trim and escape) the name field.
    sanitizeBody('title').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
            // Extract the validation errors from a request.
            const errors = validationResult(req);

            // Create a genre object with escaped and trimmed data.
            const category = new Category(
                { title: req.body.title }
            );

            if (!errors.isEmpty()) {
                // There are errors. Render the form again with sanitized values/error messages.
                res.render('category_form', { title: 'Create Category', category: category, errors: errors.array()});
            return;
            }
            else {
                // Data from form is valid.
                // Check if Category with same name already exists.
                Category.findOne({'title': req.body.title})
                .exec((err, found_category) => {
                    if(err){return next(err);}
                    if(found_category){
                        // Category exists, redirect to its detail page.
                        res.redirect('/dashboard/' + found_category.url)
                    }
                    else {
                        category.save((err) => {
                            if(err){return next(err);}
                            // Category saved. Redirect to category detail page. 
                            res.redirect('/dashboard/' + category.url);
                        })    
                    }
                })
            }
    }
]

// Display Category update form on GET
exports.category_update_get = (req, res, next) => {
    Category.findById(req.params.id, (err, category) => {
        if(err){return next(err);}
        res.render('category_form', {title: 'Update Category', category: category});  
    })
    
}

// Handle Category update form on POST
exports.category_update_post = [
    // Validate that the name field is not empty.
    body('title', 'Category name required').isLength({min:1}).trim(),
    
    // Sanitize (trim and escape) the name field.
    sanitizeBody('title').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
            // Extract the validation errors from a request.
            const errors = validationResult(req);

            // Create a genre object with escaped and trimmed data.
            const category = new Category(
                { title: req.body.title,
                _id: req.params.id}
            );

            if (!errors.isEmpty()) {
                // There are errors. Render the form again with sanitized values/error messages.
                res.render('category_form', { title: 'Create Category', category: category, errors: errors.array()});
            return;
            }
            else {
                // Data from form is valid.
                // Check if Category with same name already exists.
                Category.findByIdAndUpdate(req.params.id, category, function updateCategory(err){
                    if(err){return next(err);}
                    res.redirect('/dashboard/' + category.url)
                });
            }
    }
]

// Display Category delete form on GET
exports.category_delete_get = (req, res, next) => {
    async.parallel({
        category: (callback) => {
            Category.findById(req.params.id).exec(callback);
        },
        category_products: (callback) => {
            Product.find({'category': req.params.id}).exec(callback);
        } 
    }, (err, results) => {
        if(err){return next(err);}
        if(results.category == null){res.redirect('/dashboard/categories')}

        res.render('category_delete', {title: 'Delete Category', category: results.category, category_products: results.category_products});
    })
}

// Handle Category delete form on POST
exports.category_delete_post = (req, res, next) => {
    async.parallel({
        category: (callback) => {
          Category.findById(req.params.id).exec(callback)
        },
        category_products: (callback) => {
          Product.find({ 'category': req.params.id }).exec(callback)
        },
    }, (err, results) => {
        if (err) { return next(err); }
        // Success
        if (results.category_products.length > 0) {
            // Category has products. Render in same way as for GET route.
            res.render('category_delete', { title: 'Delete Category', category: results.category, category_products: results.category_products } );
            return;
        }
        else {
            // Category has no products. Delete object and redirect to the list of categories.
            Category.findByIdAndRemove(req.params.id, function deleteCategory(err) {
                if (err) { return next(err); }
                // Success - go to author list
                res.redirect('/dashboard/categories')
            })
        }
    });
}
