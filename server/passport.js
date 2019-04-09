const passport = require('passport');
const User = require('./database/models').User;
const Role = require('./database/models').Role;
const config = require('./config');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

passport.use(
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.appKey
    }, async function (jwtPayload, done) {
        try {
            const user = await User.findOne({
                where: {
                    id: jwtPayload.id
                },
                include: [{
                    model: Role, as: 'role'
                }]
            })

            if(!user) {
                return done(new Error(), false);
            }

            return done(null, user);

        } catch (error) {
            return done(new Error(), false)
        }
    })
)

module.exports = null;