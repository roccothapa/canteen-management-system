const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');

const app = express();
app.use(morgan('combine'));
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

require('./passport')

// Routes
require('./routes')(app);

if(config.envrionment === 'development') {
    app.listen(config.port, () => {
		console.log(`Server running at ${config.app_url}`);
	});
} else {
    app.listen(config.port);
}