console.log('Starting Daemon...');

require('daemon')();

var CronJob = require('cron').CronJob;
const NotificationCenter = require('node-notifier').NotificationCenter;
var request = require('request');
var config = require('./config');

var notifier = new NotificationCenter();

new CronJob('*/10 * * * * *', function() {
	let results = [];
	config.currencies.forEach(function(currency_id) {
		request("https://api.coinmarketcap.com/v1/ticker/" + currency_id + "/", function(error, response, body) {
			if(error) {
			  	notifier.notify({
			  		'title': 'CoinWatch',
			  		'subtitle': 'HTTP Error',
			  		'message': 'Fetching failed for ' + currency_id
			  	});
			} else {
				results.push(JSON.parse(body)[0])
		  	}
		});
	});
	setTimeout(function() {
		let i = 0;
		results.forEach(function(element) {
			setTimeout(function() {
				notifier.notify({
					'title': 'CoinWatch',
					'subtitle': element.name + ' is now at ' + element.price_usd + '$',
					'message': 'Which is a change of ' + element.percent_change_1h + '% since one hour.',
					'open': 'https://coinmarketcap.com/currencies/' + element.id
				})
			}, i * config.notif_delay);
			i++;
		});
	}, config.reqst_delay);
}, null, true, 'Europe/Berlin');

