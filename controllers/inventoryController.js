const inventory = require('../models/inventory');

// Display list of all inventories
exports.inventory_list = (req, res) => {
    res.send('Not Implemented: Inventory Detail: ' + req.params.id);   
}

// Display detail page for a specific inventory
exports.inventory_detail = (req, res) => {
    res.send('Not Implemented: Inventory Detail');
}

// Display inventory create form on GET
exports.inventory_create_get = (req, res) => {
    res.send('Not Implemented: Inventory create GET');
}

// Handle inventory create on POST
exports.inventory_create_post = (req, res) => {
    res.send('Not Implemented: Inventory create POST');
}

// Display inventory update form on GET
exports.inventory_update_get = (req, res) => {
    res.send('Not Implemented: Inventory Update GET');
}

// Handle inventory update form on POST
exports.inventory_update_post = (req, res) => {
    res.send('Not Implemented: Inventory Update POST');
}

// Display inventory delete form on GET
exports.inventory_delete_get = (req, res) => {
    res.send('Not Implemented: Inventory Delete GET');
}

// Handle inventory delete form on POST
exports.inventory_delete_post = (req, res) => {
    res.send('Not Implemented: Inventory Delete POST');
}
