const Food = require('../database/models').Food;
const FoodPolicy = require('../policies/FoodPolicy');
const { sequelize, Sequelize } = require('../database/models');
const Op = Sequelize.Op;


module.exports = {
  async foods(req, res) {
    try {
      let foods = ''
      if (req.user.role[0].role === 'canteen_manager') {
        foods = await sequelize.query(`SELECT * FROM foods where foods.quantity > 0 and canteen_manager_id = ${req.user.id}`, { type: Sequelize.QueryTypes.SELECT })
      } else if (req.user.role[0].role === 'user') {
        foods = await sequelize.query('SELECT * FROM foods where foods.quantity > 0 and date(foods.created_at) = curdate()', { type: Sequelize.QueryTypes.SELECT })
      } else {
        throw new Error('Unauthorized')
      }
      res.json(foods);

    } catch (error) {
      res.status(403).json(error);
    }
  },

  async search(req, res) {
    try {
      const foods = await sequelize.query('SELECT * FROM foods where title like :foodname and foods.quantity > 0 and date(foods.created_at) = curdate()',
        { replacements: { foodname: '%' + req.query.search + '%' }, type: Sequelize.QueryTypes.SELECT })
      res.json(foods);

    } catch (error) {
      res.status(403).json(error);
    }
  },

  async store(req, res) {
    try {
      const { error, value } = FoodPolicy.validate(req);

      if (error) {
        throw error;
      }

      const food = await Food.create({
        title: req.body.title,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
        canteen_manager_id: req.body.canteen_manager_id,
      });

      res.json(food);

    } catch (error) {
      if (error.isJoi !== undefined) {
        res.status(400).json({
          error
        });
      } else {
        res.status(500).json({
          error
        });
      }
    }
  },

  async find(req, res) {
    try {
      const food = await Food.findByPk(req.params.id)

      if (!food) {
        throw new Error('Food not found')
      }

      res.json(food);

    } catch (error) {
      res.status(500).json({
        error
      });
    }
  },

  async update(req, res) {
    try {
      let food = await Food.findByPk(req.params.id)

      if (!food) {
        throw new Error('Food not found')
      }

      const { error, value } = FoodPolicy.validate(req);

      if (error) {
        throw error;
      }

      const updatedFood = await food.update({
        title: req.body.title,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
        canteen_manager_id: req.body.canteen_manager_id,
      })

      res.json(updatedFood);

    } catch (error) {
      if (error.isJoi !== undefined) {
        res.status(400).json({
          error
        });
      } else {
        res.status(500).json({
          error
        });
      }
    }
  },

  async delete(req, res) {
    try {
      let food = await Food.findByPk(req.params.id)
      const deletedFood = food
      
      if (!food) {
        throw new Error('Food not found')
      }
      food.destroy({ force: true });

      res.json({
        message: `Food ${deletedFood.title} deleted successfully`,
        food: deletedFood
      });

    } catch (error) {
      res.status(500).json({
        error
      });
    }
  }
}