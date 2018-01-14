const order = require('../models/order');

exports.index = (req, res) => {
    res.send('Not Implemented: Main Dashboard')
}

// Display list of all orders
exports.order_list = (req, res) => {
    res.send('Not Implemented: Order List');
}

// Display detail page for a specific order
exports.order_detail = (req, res) => {
    res.send('Not Implemented: Order Detail: ' + req.params.id);
}

// Display order create form on GET
exports.order_create_get = (req, res) => {
    res.send('Not Implemented: Order create GET');
}

// Handle order create on POST
exports.order_create_post = (req, res) => {
    res.send('Not Implemented: Order create POST');
}

// Display order update form on GET
exports.order_update_get = (req, res) => {
    res.send('Not Implemented: Order Update GET');
}

// Handle order update form on POST
exports.order_update_post = (req, res) => {
    res.send('Not Implemented: Order Update POST');
}

// Display order delete form on GET
exports.order_delete_get = (req, res) => {
    res.send('Not Implemented: Order Delete GET');
}

// Handle order delete form on POST
exports.order_delete_post = (req, res) => {
    res.send('Not Implemented: Order Delete POST');
}
