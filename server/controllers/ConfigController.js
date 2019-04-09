const config = require('../config');

module.exports = {
    index (req, res) {
        res.json(config.order);
    }
}