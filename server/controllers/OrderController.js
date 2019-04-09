const Order = require('../database/models').Order;
const Food = require('../database/models').Food;
const User = require('../database/models').User;
const { sequelize, Sequelize } = require('../database/models');
const Op = Sequelize.Op;
const config = require('../config');

module.exports = {
    async orders (req, res) {
        try {
            const orders = await Order.findAll({
                where : {
                    status: 'pending',
                    // canteen_manager_id: req.user.id
                },
                include: [{
                    model: Food,  as:'food'
                },
                {
                    model: User,  as:'user'
                }]
            })
            res.json(orders);

        } catch (error) {
            res.json(error);  
        }
    },

    async orderHistories (req, res) {
        try {
            const orders = await Order.findAll({
                where : {
                    user_id: req.user.id
                },
                include: [{
                    model: Food,  as:'food'
                }]
            })
            res.json(orders);

        } catch (error) {
            res.json(error);  
        }
    },

    placeOrder (req, res) {
        const now = (new Date()).getHours()
        
        // check placement time
        // if (!(now >= config.order.placementStartAt && now <= config.order.placementEndAt) {
        //     res.status(500).json({
        //         message: `Sorry, You can't place your order now`
        //     })
        // }

        if (!req.body.length) {
            return res.status(400).json({
                error: new Error('Order not found')
            });
        }

        req.body.forEach((foodOrder) => {
            sequelize.transaction(t => {
                return Promise.all([
                    Order.create(foodOrder, {transaction: t}).then(order => {
                        return Food.findByPk(order.food_id, {transaction: t}).then((food) => {
                            return food.update({
                                quantity: food.quantity - order.quantity
                            }, {transaction: t})
                        })
                    }) 
                ])               
            }).then(placedOrder => {
                res.json({
                    message: 'Order Placed Successfully'
                });
            }).catch(error => {
                res.status(500).json({
                    error: error.toString()
                });
            });
        })
    },

    async fulfill (req, res) {
        const now = (new Date()).getHours()
        
        // check placement time
        // if (!(now >= config.order.placementStartAt && now <= config.order.placementEndAt)) {
        //     res.status(500).json({
        //         message: `Sorry, You can't fullfill order now`
        //     })
        // } 

        // fulfill order
        try {
            const order = await Order.findByPk(req.params.id)
            const updatedOrder = await order.update({
                status: 'completed'
            })

            res.json(updatedOrder)

        } catch (error) {
            res.status(500).json(error);  
        }
    },

    async cancel (req, res) {
        const now = (new Date()).getHours()
        
        // check placement time
        // if (!(now >= config.order.placementStartAt && now <= config.order.placementEndAt)) {
        //     res.status(500).json({
        //         message: `Sorry, You can't cancel order now`
        //     })
        // } 

        // cancel order
        try {
            const order = await Order.findByPk(req.params.id)
            const updatedOrder = await order.update({
                status: 'canceled'
            })
            const food = await Food.findByPk(order.food_id);
            await food.update({
                quantity: food.quantity + order.quantity
            })
            
            res.json(updatedOrder)

        } catch (error) {
            res.status(500).json(error);  
        }
    }
}