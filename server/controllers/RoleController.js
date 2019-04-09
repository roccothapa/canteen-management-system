const Role = require('../database/models').Role;
const { sequelize, Sequelize } = require('../database/models');
const Op = Sequelize.Op;

module.exports = {
    async roles (req, res) {
        try {
            const roles = await Role.findAll({ where: {
                role: {
                    [Op.ne]: 'admin'
                }
            }})
            res.json(roles);

        } catch (error) {
            res.json(error);  
        }
    }
}