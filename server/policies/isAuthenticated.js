const passport = require('passport');

module.exports = (options = {}) => {
    return (req, res, next) => {
        passport.authenticate('jwt', (err, user) => {
            if(err || !user) {
                return res.status(403).json({
                    error: 'Unauthorized access'
                })
            } else {
                const filterUser = user.toJSON();
                delete filterUser.password;

                // check user role
                if(Object.keys(options).length) {
                    if (options.role.length) {
                        if (!options.role.includes(filterUser.role[0].role)) {
                            return res.status(403).json({
                                error: 'Unauthorized access'
                            })
                        }
                    } 
                }
                req.user = filterUser;
                next();
            }
        })(req, res, next)
    }
}