let config = {};

/**
 * ---------------
 * APP CONFIG
 * ----------------
 */

config.envrionment  = process.env.ENVIRONMENT || 'development';
config.appname  = process.env.APPNAME || 'Canteen Management System';
config.host     = process.env.HOST || 'localhost';
config.port     = process.env.PORT || '9000';
config.app_url  = process.env.APP_URL ||  `http://${config.host}:${config.port}`;
config.appKey   = process.env.APP_KEY ||  'jhSkRYBVyZc+OMwzRFIOw3e4/S7X77RIbTLaF6PW9bU=';


/**
 * --------------
 *  Order 
 * ---------------
 * 24 hour format
 */
config.order = {
    startAt: 9,
    endAt: 12,
    placementStartAt: 12,
    placementEndAt: 14
}

/**
 * --------------
 *  TIME 
 * ---------------
 */
config.timezone     = 'Asia/Kathmandu';

module.exports =  config;