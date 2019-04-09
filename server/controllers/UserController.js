const User = require('../database/models').User;
const RoleModel = require('../database/models').Role;
const UserRole = require('../database/models').UserRole;
const { sequelize, Sequelize } = require('../database/models');
const Op = Sequelize.Op;
const UserCreatePolicy = require('../policies/UserCreatePolicy');

module.exports = {
    async users (req, res) {
        try {
            const users = await User.findAll()
            res.json(users);

        } catch (error) {
            res.json(error);  
        }
    },

    async store(req, res) {

        try {
            const { error, value } = UserCreatePolicy.validate(req);
                
            if (error) {
                throw error;
            } 

            const userRole = await RoleModel.findByPk(req.body.role_id);
            if (!userRole) {
                throw new Error('Role not found')
            }

            const user = await User.create({
                name: req.body.name,
                address: req.body.address,
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password
            });
            
            if (user) {
                await UserRole.create({
                    user_id: user.id,
                    role_id: userRole.id
                })
            }
            
            res.json(user);

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
  
    async find (req, res) {
        try {
            const user = await User.findByPk(req.params.id, {
                include: [{
                    model: RoleModel, as: 'role'
                }]
            })

            if (!user) {
                throw new Error('User not found')
            }

            res.json(user);

        } catch (error) {
            res.status(500).json({
                error
            });  
        }
    },
  
    async update (req, res) {
        try {
            let user = await User.findByPk(req.params.id)

            if (!user) {
                throw new Error('User not found')
            }

            const { error, value } = UserCreatePolicy.validateUserUpdate(req);
                
            if (error) {
                throw error;
            }

            const updatedUser = await user.update({
                name: req.body.name,
                address: req.body.address,
                phone: req.body.phone,
                email: req.body.email
            })

            res.json(updatedUser);

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
  
    async delete (req, res) {
        try {
            let user = await User.findByPk(req.params.id)

            if (!user) {
                throw new Error('User not found')
            }
            user.destroy({ force: true });

            res.json({
                message: 'User deleted successfully'
            });

        } catch (error) {
            res.status(500).json({
                error
            });  
        }
    }
}