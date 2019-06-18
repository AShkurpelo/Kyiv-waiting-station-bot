const eway = require('./eway')

async function test() {
	const stopName = 'станція "Польова"';
	const routeCode = '820';

	const result = await getArrivalTimeMsg(routeCode, stopName);
	console.log(result);
}

test();
