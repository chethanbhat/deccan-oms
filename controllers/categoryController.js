const category = require('../models/category');

// Display list of all Categories
exports.category_list = (req, res) => {
    res.send('Not Implemented: Category List');
}

// Display detail page for a specific Category
exports.category_detail = (req, res) => {
    res.send('Not Implemented: Category Detail: ' + req.params.id);
}

// Display Category create form on GET
exports.category_create_get = (req, res) => {
    res.send('Not Implemented: Category create GET');
}

// Handle Category create on POST
exports.category_create_post = (req, res) => {
    res.send('Not Implemented: Category create POST');
}

// Display Category update form on GET
exports.category_update_get = (req, res) => {
    res.send('Not Implemented: Category Update GET');
}

// Handle Category update form on POST
exports.category_update_post = (req, res) => {
    res.send('Not Implemented: Category Update POST');
}

// Display Category delete form on GET
exports.category_delete_get = (req, res) => {
    res.send('Not Implemented: Category Delete GET');
}

// Handle Category delete form on POST
exports.category_delete_post = (req, res) => {
    res.send('Not Implemented: Category Delete POST');
}
