const TelegramBot = require('node-telegram-bot-api');
const { port, url, token } = require('./config');

const options = {
	webHook: {
		port: port
	}
};
const bot = new TelegramBot(token, options);
bot.setWebHook(`${url}/bot${token}`);

bot.on('message', async msg => {
	let respMsg = 'Command format: <route number> <stop name>';
	const parsed = parseMsg(msg.text);
	if (parsed) {
		const {routeNumber, stopName} = parsed;
		const respMsg = await eway.getArrivalTimeMsg(routeNumber, stopName);
	}

	bot.sendMessage(msg.chat.id, respMsg);
});

const parseMsg = msg => {
	const words = msg.text.split(' ');
	const routeNumber = words[0];
	if (/\d+\S?/.test(routeNumber)){
		words = words.slice(0);
		if (words.length && words[0].length) {
			const stopName = words.join(' ');
			return { routeNumber, stopName };
		}
	}
	return null;
}
