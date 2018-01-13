#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

//Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async');
var Category = require('./models/category');
var Product = require('./models/product');
var Order = require('./models/order');
var Inventory = require('./models/inventory')
var ProductInstance = require('./models/productinstance');
var User = require('./models/user');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var products = [];
var categories = [];
var productinstances = [];
var inventory = [];
var orders = [];
var users = [];

function categoryCreate(title, cb){
    var categoryDetail = {title:title}

    var category = new Category(categoryDetail);

    category.save(function (err) {
        if (err) {
          cb(err, null)
          return
        }
        console.log('New Category: ' + category);
        categories.push(category)
        cb(null, category)
    });
}

function productCreate(title, price, dimensions, features, category, cb){
    var productDetail = {title:title, price:price, category: category}
    if(features != false) productDetail.features = features;
    if(dimensions != false) productDetail.dimensions = dimensions;

    var product = new Product(productDetail);

    product.save(function (err) {
        if (err) {
          cb(err, null)
          return
        }
        console.log('New Product: ' + product);
        products.push(product)
        cb(null, product)
    });
}

function productInstanceCreate(title, product, color, availability, cb){
    var productInstanceDetail = {title:title, product:product, color:color, availability: availability}

    var productInstance = new ProductInstance(productInstanceDetail);

    productInstance.save(function (err) {
        if (err) {
          cb(err, null)
          return
        }
        console.log('New Product Instance: ' + productInstance);
        productinstances.push(productInstance)
        cb(null, productInstance)
    });
}

function InventoryCreate(items, cb){
    var inventoryDetail = {items: items}

    var inventory = new Inventory(inventoryDetail);

    inventory.save(function (err) {
        if (err) {inventory
          cb(err, null)
          return
        }
        console.log('New Inventory: ' + inventory);
        cb(null, inventory)
    });
}

function OrderCreate(items, user, cb){
    var orderDetail = {items: items, user: user}

    var order = new Order(orderDetail);

    order.save(function (err) {
        if (err) {
          cb(err, null)
          return
        }
        console.log('New Order: ' + order);
        orders.push(order)
        cb(null, order)
    });
}

function UserCreate(name, email, phone, address, vendorCode, cb){
    var userDetail = {name: name};
    if(email != false) userDetail.email = email;
    if(phone != false) userDetail.phone = phone;
    if(address != false) userDetail.address = address;
    if(vendorCode != false) userDetail.vendorCode = vendorCode;


    var user = new User(userDetail);

    user.save(function (err) {
        if (err) {
          cb(err, null)
          return
        }
        console.log('New User: ' + user);
        users.push(user)
        cb(null, user)
    });
}

function createCategoryUsers(cb){
    async.parallel([
        function(callback) {
          UserCreate('Virat Kohli', 'vkohli@gmail.com', '9988776655', 'Kotla Delhi', 1, callback);
        },
        function(callback) {
            UserCreate('MS Dhoni', 'msd@gmail.com', '9988776644', 'Ranchi Stadium', 2, callback);
        },
        function(callback) {
            UserCreate('Sachin Tendulkar', 'srt@gmail.com', '9988776633', 'Wankhde, Mumbai', 3, callback);
        },
        function(callback) {
            UserCreate('Rahul Dravid', 'dravid@gmail.com', '9988776622', 'Chinnaswamy, Bangalore', 4, callback);
        },
        function(callback) {
            UserCreate('Anil Kumble', 'kumble@gmail.com', '9988776611', 'Mysore', 5, callback);
        },
        function(callback) {
            categoryCreate("Premium Relax Chairs", callback);
        },
        function(callback) {
            categoryCreate("Premium Arm Chairs", callback);
        },
        function(callback) {
            categoryCreate("Premium Dining Chairs", callback);
        },
        ],
        // optional callback
        cb);
}

function createProducts(cb){
    async.parallel([
        function(callback) {
            productCreate('Ferrari', 1500, '(H) 936 mm, (W) 615 mm, (D) 740 mm', 'Lorem Ipsum', categories[0], callback);
        },
        function(callback) {
            productCreate('Lotus', 1500, '(H) 936 mm, (W) 615 mm, (D) 740 mm', 'Lorem Ipsum', categories[0], callback);
        },
        function(callback) {
            productCreate('Buggati', 1000, '(H) 825 mm, (W) 585 mm, (D) 650 mm', 'Lorem Ipsum', categories[1], callback);
        },
        function(callback) {
            productCreate('Bently', 1000, '(H) 825 mm, (W) 585 mm, (D) 650 mm', 'Lorem Ipsum', categories[1], callback);
        },
        function(callback) {
            productCreate('Brezza', 800, '(H) 825 mm, (W) 585 mm, (D) 650 mm', 'Lorem Ipsum', categories[1], callback);
        },
        function(callback) {
            productCreate('Hexa', 800, '(H) 865 mm, (W) 415 mm, (D) 470 mm', 'Lorem Ipsum', categories[2], callback);
        },
        function(callback) {
            productCreate('Crysta', 800, '(H) 865 mm, (W) 415 mm, (D) 470 mm', 'Lorem Ipsum', categories[2], callback);
        },
        ],
        // optional callback
        cb);
}

function createProductInstances(cb){
    async.parallel([
        function(callback) {
            productInstanceCreate('Ferrari - TCO', products[0], 'TCO', 'Available', callback);
        },
        function(callback) {
            productInstanceCreate('Ferrari - DBR', products[0], 'DBR', 'Available', callback);
        },
        function(callback) {
            productInstanceCreate('Buggati - RWD', products[2], 'RWD', 'Available', callback);
        },
        function(callback) {
            productInstanceCreate('Lotus - DBK', products[1], 'DBK', 'Not Available', callback);
        },
        function(callback) {
            productInstanceCreate('Bently - RED', products[3], 'RED', 'Discontinued', callback);
        },
        function(callback) {
            productInstanceCreate('Hexa - CGN', products[5], 'CGN', 'Available', callback);
        },
        function(callback) {
            productInstanceCreate('Brezza - MHG', products[4], 'MHG', 'Not Available', callback);
        },
        function(callback) {
            productInstanceCreate('Crysta - SWD', products[6], 'SWD', 'Available', callback);
        },
        ],
        // optional callback
        cb);
}

function createInventory(cb){
    async.parallel([
        function(callback) {
            InventoryCreate([
                {   
                    item: productinstances[0],
                    quantity: 500
                },
                {   
                    item: productinstances[1],
                    quantity: 450
                },
                {   
                    item: productinstances[2],
                    quantity: 400
                },
                {   
                    item: productinstances[3],
                    quantity: 350
                },
                {   
                    item: productinstances[4],
                    quantity: 300
                },
                {   
                    item: productinstances[5],
                    quantity: 250
                },
                {   
                    item: productinstances[6],
                    quantity: 100
                },
                {   
                    item: productinstances[7],
                    quantity: 100
                }
            ], callback);
        }
        ],
        // optional callback
        cb);
}


function createOrder(cb) {
    async.parallel([
        function(callback) {
          OrderCreate([
            {
            item: productinstances[0],
                quantity: 30
            },
            {
            item: productinstances[1],
                quantity: 15
            },
            {
                item: productinstances[2],
                quantity: 5
            },              
            {
                item: productinstances[3],
                quantity: 10
            }
            ], users[0], callback);
        },
        function(callback) {
            OrderCreate([
            {
                item: productinstances[3],
                quantity: 10
            },
            {
                item: productinstances[6],
                quantity: 25
            },
            {
                item: productinstances[1],
                quantity: 5
            },              
            {
                item: productinstances[2],
                quantity: 10
            }
              ], users[1], callback);
          },
          function(callback) {
            OrderCreate([
                {
                    item: productinstances[4],
                    quantity: 2
                },
                {
                  item: productinstances[5],
                  quantity: 1
              }
              ], users[2], callback);
          },
          function(callback) {
            OrderCreate([
                {
                    item: productinstances[6],
                    quantity: 6
                },
                {
                  item: productinstances[5],
                  quantity: 4
              },
              {
                  item: productinstances[3],
                  quantity: 2
              }
              ], users[3], callback);
          },
          function(callback) {
            OrderCreate([
                {
                    item: productinstances[7],
                    quantity: 2
                }
              ], users[2], callback);
          },
          function(callback) {
            OrderCreate([
                {
                    item: productinstances[2],
                    quantity: 1
                },
                {
                  item: productinstances[3],
                  quantity: 3
              },
              {
                  item: productinstances[5],
                  quantity: 5
              },              
              {
                  item: productinstances[6],
                  quantity: 7
              }
              ], users[1], callback);
          },
          function(callback) {
            OrderCreate([
                {
                    item: productinstances[1],
                    quantity: 3
                },
                {
                  item: productinstances[2],
                  quantity: 6
              },
              {
                  item: productinstances[4],
                  quantity: 9
              },              
              {
                  item: productinstances[7],
                  quantity: 12
              }
              ], users[4], callback);
          },
        ],
        // optional callback
        cb);
}

async.series([
    createCategoryUsers,
    createProducts,
    createProductInstances,
    createInventory,
    createOrder
],
// optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Orders: '+orders);
        
    }
    //All done, disconnect from database
    mongoose.connection.close();
});

function cb(error, result){
    if(error){console.log(error)}
    if(result){console.log(result)}
}

