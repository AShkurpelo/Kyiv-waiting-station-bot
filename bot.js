const eway = require('./eway');
const { url, token } = require('./config');
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(token);
bot.setWebHook(url);

bot.on('message', messageHandler);

async function messageHandler(msg) {
	let respMsg = 'Command format: <route number> <stop name>';
	const parsed = parseMsg(msg);
	if (parsed) {
		const { routeNumber, stopName } = parsed;
		respMsg = await eway.nextArrivalMsg(routeNumber, stopName);
	}

	bot.sendMessage(msg.chat.id, respMsg);
}

function parseMsg(msg) {
    console.log(`Incoming message with text: ${msg.text}`);
	let words = msg.text.split(' ');
	const routeNumber = words[0];
	if (/\d+\S?/.test(routeNumber) && words.length >= 2) {
		words = words.slice(1);
		if (words.length && words[0].length) {
			const stopName = words.join(' ');
			return { routeNumber, stopName };
		}
	}
	return null;
}

module.exports = bot;