const productinstance = require('../models/productinstance');

// Display list of all Product Instances
exports.productinstance_list = (req, res) => {
    res.send('Not Implemented: Product Instance List');
}

// Display detail page for a specific productinstance
exports.productinstance_detail = (req, res) => {
    res.send('Not Implemented: Product Instance Detail: ' + req.params.id);
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
