const User = require('../database/models').User;
const Role = require('../database/models').Role;
const jwt = require('jsonwebtoken');
const config = require('../config');

function jwtSignUser (user) {
    const ONE_MONTH = 60 * 60 * 24 * 30;
    return jwt.sign(user, config.appKey, {
        expiresIn: ONE_MONTH
    })
}

module.exports = {
    async register (req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (error) {
            res.status(400).json({
                error: error.errors
            });
        }
    },

    async login (req, res) {
        try {
            const { email, password } = req.body;

            if(email == '' || password == '') {
                return res.status(400).json({
                    error: 'Email and Password is required'
                });
            }

            const user = await User.findOne({
                where: {
                    email
                },
                include: [{
                    model: Role, as: 'role'
                }]
            });

            // user not found
            if(!user) {
                return res.status(403).json({
                    error: 'The login credential was incorrect'
                });
            }
            // password doesn't match
            const isPasswordValid = user.comparePassword(password);
            if(!isPasswordValid) {
                return res.status(403).json({
                    error: 'The login credential was incorrect'
                });
            }

            // remove password
            const filterUser = user.toJSON();
            delete filterUser.password;

            res.json({
                user: filterUser,
                token: jwtSignUser(filterUser)
            });

        } catch (error) {
            res.status(500).json({
                error: error
            });
        }
    }
}