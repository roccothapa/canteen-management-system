const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const FoodController = require('./controllers/FoodController');
const UserController = require('./controllers/UserController');
const RoleController = require('./controllers/RoleController');
const ConfigController = require('./controllers/ConfigController');
const OrderController = require('./controllers/OrderController');
const isAuthenticated = require('./policies/isAuthenticated');

module.exports = (app) => {
    app.post('/login', AuthenticationController.login);
    app.post('/register',  AuthenticationControllerPolicy.register, AuthenticationController.register);
    
    app.get('/config', ConfigController.index);

    // { role: ['admin'] }
    app.get('/users', isAuthenticated(), UserController.users);
    app.post('/user/store', isAuthenticated(), UserController.store);
    app.get('/user/:id', isAuthenticated(), UserController.find);
    app.put('/user/:id/update', isAuthenticated(), UserController.update);
    app.delete('/user/:id/delete', isAuthenticated(), UserController.delete);

    app.get('/roles', isAuthenticated(), RoleController.roles);

    // { role: ['canteen_manager', 'user'] }
    app.get('/foods', isAuthenticated(), FoodController.foods);
    app.get('/foods/search', isAuthenticated(), FoodController.search);

    // { role: ['canteen_manager'] }
    app.post('/food/store', isAuthenticated(), FoodController.store);
    app.get('/food/:id', isAuthenticated(), FoodController.find);
    app.put('/food/:id/update', isAuthenticated(), FoodController.update);
    app.delete('/food/:id/delete', isAuthenticated(), FoodController.delete);

    // { role: ['user', 'canteen_manager'] }
    app.get('/orders', isAuthenticated(), OrderController.orders);
    app.get('/order-histories', isAuthenticated(), OrderController.orderHistories);
    
    // { role: ['user'] }
    app.post('/order', isAuthenticated(), OrderController.placeOrder);
    app.get('/order/:id/fulfill', isAuthenticated(), OrderController.fulfill);
    app.get('/order/:id/cancel', isAuthenticated(), OrderController.cancel);
}