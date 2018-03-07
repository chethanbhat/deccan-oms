const User = require('../models/user');

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
    res.send('Not Implemented: User create GET');
}

// Handle user create on POST
exports.user_create_post = (req, res) => {
    res.send('Not Implemented: User create POST');
}

// Display user update form on GET
exports.user_update_get = (req, res) => {
    res.send('Not Implemented: User Update GET');
}

// Handle user update form on POST
exports.user_update_post = (req, res) => {
    res.send('Not Implemented: User Update POST');
}

// Display user delete form on GET
exports.user_delete_get = (req, res) => {
    res.send('Not Implemented: User Delete GET');
}

// Handle user delete form on POST
exports.user_delete_post = (req, res) => {
    res.send('Not Implemented: User Delete POST');
}
