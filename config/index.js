require('dotenv').config();
module.exports = {
    url: process.env.BOT_API_URL,
    token: process.env.BOT_API_TOKEN,
    eway_api_routes: process.env.EWAY_API_ROUTES,
    eway_api_route: process.env.EWAY_API_ROUTE,
    eway_api_stop: process.env.EWAY_API_STOP,
    eway_referer: process.env.EWAY_REFERER_URL
};
