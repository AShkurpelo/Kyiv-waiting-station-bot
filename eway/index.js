const client = require('./client');

const routeArrivalMsgExpression = (route) => {
	const times = route.times.length > 0 
		? route.times.map((time) => time.arrival_time_formatted).join(', ') 
		: '-';
	return `${route.transport_name} ${route.route_name} (${route.direction_name}): ${times}`;
};

const getStopRoutes = async (routeCode, stopName) => {
	const routes = await client.getRoutesByCode(routeCode);
	const stops = await client.getStopsByName(routes, stopName);
	const stopRoutes = stops.flatMap((stop) => stop.data.routes).filter((route) => route.route_name == routeCode);

	return stopRoutes;
};

const nextArrivalMsg = async (routeCode, stopName) => {
	const stopRoutes = await getStopRoutes(routeCode, stopName);
	const arrivalMessages = stopRoutes.map(routeArrivalMsgExpression);

	return arrivalMessages.join('\r\n');
};

module.exports = {
	nextArrivalMsg
}

/* function getArrivalTimeOneLiner(routeCode, stopName) {
//     return getData(routesDataUrl)
//         .then(allRoutesData => Object.values(allRoutesData)
//             .flatMap(x => x.filter(route => route.rn == routeCode))
//             .map(route => getData(routeInfoUrl + route.ri)))
//         .then(routesP => Promise.all(routesP))
//         .then(routes => routes
//             .flatMap(route => route.stops.flatMap(stops => stops.filter(stop => stop.n == stopName)))
//             .map(stop => getData(stopUrl + stop.i)))
//         .then(stopsP => Promise.all(stopsP))
//         .then(stops => stops
//             .flatMap(stop => stop.data.routes.filter(route => route.route_name == routeCode))
//             .map(routeArrivalMsgExpression).join('\n'));
// } */