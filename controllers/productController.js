const product = require('../models/product');

// Display list of all Products
exports.product_list = (req, res) => {
    res.send('Not Implemented: Product List');
}

// Display detail page for a specific product
exports.product_detail = (req, res) => {
    res.send('Not Implemented: Product Detail: ' + req.params.id);
}

// Display product create form on GET
exports.product_create_get = (req, res) => {
    res.send('Not Implemented: Product create GET');
}

// Handle product create on POST
exports.product_create_post = (req, res) => {
    res.send('Not Implemented: Product create POST');
}

// Display product update form on GET
exports.product_update_get = (req, res) => {
    res.send('Not Implemented: Product Update GET');
}

// Handle product update form on POST
exports.product_update_post = (req, res) => {
    res.send('Not Implemented: Product Update POST');
}

// Display product delete form on GET
exports.product_delete_get = (req, res) => {
    res.send('Not Implemented: Product Delete GET');
}

// Handle product delete form on POST
exports.product_delete_post = (req, res) => {
    res.send('Not Implemented: Product Delete POST');
}
