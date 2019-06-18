const { eway_referer } = require('../config');
moduele.exports = (url) => {
	return new Promise(function (resolve, reject) {
		var headers = {
			'Sec-Fetch-Mode': 'cors',
			'Referer': eway_referer,
			'X-Requested-With': 'XMLHttpRequest'
		};

		var options = {
			url: url,
			headers: headers,
			encoding: 'utf8',
			json: true
		};
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				response.setEncoding('utf8');
				resolve(body);
			} else {
				reject(error ? error : response.statusCode);
			}
		});
	});
};