const requestData = require('./requestData');
const { 
	eway_api_routes,
	eway_api_route,
	eway_api_stop
} = require('../config');

const getRoutesByCode = async (routeCode) => {
	const allRoutesData = await requestData(eway_api_routes);
	const routesP = Object.values(allRoutesData)
		.flatMap((x) => x.filter((route) => route.rn == routeCode))
		.map((route) => requestData(eway_api_route + route.ri));

	return Promise.all(routesP);
};

const getStopsByName = (routes, stopName) => {
	const stopsP = routes
		.flatMap((route) => route.stops)
		.flatMap((stops) => stops.filter((stop) => stop.n == stopName))
		.map((stop) => requestData(eway_api_stop + stop.i));

	return Promise.all(stopsP);
};

module.exports = {
    getStopsByName,
    getRoutesByCode
}