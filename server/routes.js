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

    app.get('/users', isAuthenticated({ role: ['admin'] }), UserController.users);
    app.post('/user/store', isAuthenticated({ role: ['admin'] }), UserController.store);
    app.get('/user/:id', isAuthenticated({ role: ['admin'] }), UserController.find);
    app.put('/user/:id/update', isAuthenticated({ role: ['admin'] }), UserController.update);
    app.delete('/user/:id/delete', isAuthenticated({ role: ['admin'] }), UserController.delete);

    app.get('/roles', isAuthenticated({ role: ['admin'] }), RoleController.roles);

    app.get('/foods', isAuthenticated({ role: ['canteen_manager', 'user'] }), FoodController.foods);
    app.get('/foods/search', isAuthenticated({ role: ['canteen_manager', 'user'] }), FoodController.search);

    app.post('/food/store', isAuthenticated({ role: ['canteen_manager'] }), FoodController.store);
    app.get('/food/:id', isAuthenticated({ role: ['canteen_manager'] }), FoodController.find);
    app.put('/food/:id/update', isAuthenticated({ role: ['canteen_manager'] }), FoodController.update);
    app.delete('/food/:id/delete', isAuthenticated({ role: ['canteen_manager'] }), FoodController.delete);
 
    app.get('/orders', isAuthenticated({ role: ['user', 'canteen_manager'] }), OrderController.orders);
    app.get('/order-histories', isAuthenticated({ role: ['user', 'canteen_manager'] }), OrderController.orderHistories);
    
    app.post('/order', isAuthenticated({ role: ['user'] }), OrderController.placeOrder);

    app.get('/order/total-uncompleted-orders', isAuthenticated({ role: ['canteen_manager'] }), OrderController.totalUncompletedOrder);
    app.get('/order/:id/fulfill', isAuthenticated({ role: ['canteen_manager'] }), OrderController.fulfill);
    app.get('/order/:id/cancel', isAuthenticated({ role: ['canteen_manager'] }), OrderController.cancel);
}