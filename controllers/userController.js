const User = require('../models/user');
const Order = require('../models/order');
const async = require('async');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Users
exports.user_list = (req, res) => {
    User.find({}, 'name url')
    .sort('vendorCode')
    .exec((err, list_users) => {
        if(err){return next(err);}
        res.render('user_list',{title: 'All Users', users_list: list_users});
    });
}

// Display detail page for a specific user
exports.user_detail = (req, res) => {
    User.findById(req.params.id)
    .exec((err, user) => {
        if(err){return next(err);}
        if(user == null){
            let err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
        res.render('user_detail',{title: 'Users Profile', user});
    });
}

// Display user create form on GET
exports.user_create_get = (req, res) => {
    res.render('user_form', {title: 'Create User'});
}

// Handle user create on POST
exports.user_create_post = [
    // Validate that the name field is not empty.
    body('name', 'User name required').isLength({min:5}).trim(),
    body('vendorcode', 'Vendor Code required').isLength({min:1}).trim(),
    
    
    // Sanitize (trim and escape) the name field.
    sanitizeBody('*').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
            // Extract the validation errors from a request.
            const errors = validationResult(req);

            // Create a genre object with escaped and trimmed data.
            const user = new User(
                { 
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    address: req.body.address,
                    vendorCode: req.body.vendorcode }
            );

            if (!errors.isEmpty()) {
                // There are errors. Render the form again with sanitized values/error messages.
                res.render('user_form', { title: 'Create User', user: user, errors: errors.array()});
            return;
            }
            else {
                // Data from form is valid.
                // Check if Category with same name already exists.
                User.findOne({'vendorCode': req.body.vendorcode})
                .exec((err, found_user) => {
                    if(err){return next(err);}
                    if(found_user){
                        // Category exists, redirect to its detail page.
                        res.redirect('/dashboard/' + found_user.url)
                    }
                    else {
                        user.save((err) => {
                            if(err){return next(err);}
                            // Category saved. Redirect to category detail page. 
                            res.redirect('/dashboard/' + user.url);
                        })    
                    }
                })
            }
    }
]

// Display user update form on GET
exports.user_update_get = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if(err){return next(err);}
        res.render('user_form', {title: 'Update User', user: user});  
    });
}

// Handle user update form on POST
exports.user_update_post = [
    // Validate that the name field is not empty.
    body('name', 'User name required').isLength({min:5}).trim(),
    body('vendorcode', 'Vendor Code required').isLength({min:1}).trim(),
    
    
    // Sanitize (trim and escape) the name field.
    sanitizeBody('*').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
            // Extract the validation errors from a request.
            const errors = validationResult(req);

            // Create a genre object with escaped and trimmed data.
            const user = new User(
                { 
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    address: req.body.address,
                    vendorCode: req.body.vendorcode,
                    _id: req.params.id
                }
            );

            if (!errors.isEmpty()) {
                // There are errors. Render the form again with sanitized values/error messages.
                res.render('user_form', { title: 'Update User', user: user, errors: errors.array()});
            return;
            }
            else {
                // Data from form is valid.
                // Check if Category with same name already exists.
                User.findByIdAndUpdate(req.params.id, user, (err) => {
                    if(err){return next(err)}
                    res.redirect('/dashboard/' + user.url);
                });

            }
    }
]

// Display user delete form on GET
exports.user_delete_get = (req, res) => {
    async.parallel({
        user: (callback) => {
            User.findById(req.params.id).exec(callback);
        },
        user_orders: (callback) => {
            Order.find({'user': req.params.id}).exec(callback);
        } 
    }, (err, results) => {
        if(err){return next(err);}
        if(results.user == null){res.redirect('/dashboard/users')}

        res.render('user_delete', {title: 'Delete User', user: results.user, user_orders: results.user_orders});
    })
}

// Handle user delete form on POST
exports.user_delete_post = (req, res) => {
    async.parallel({
        user: (callback) => {
            User.findById(req.params.id).exec(callback);
        },
        user_orders: (callback) => {
            Order.find({'user': req.params.id}).exec(callback);
        } 
    }, (err, results) => {
        if(err){return next(err);}
        if(results.user_orders.length > 0){
            res.render('user_delete', {title: 'Delete User', user: results.user, user_orders: results.user_orders});
            return;
        }
        else {
            User.findByIdAndRemove(req.body.userid, (err) => {
                if (err) { return next(err); }
                // Success - go to author list
                res.redirect('/dashboard/users')
            })
        }
    })
}
