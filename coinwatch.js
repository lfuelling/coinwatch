console.log('Starting Daemon...');

const CronJob = require('cron').CronJob;
const NotificationCenter = require('node-notifier').NotificationCenter;	
const notifier = require('node-notifier');
const request = require('request');
const config = require('./config');


function notify(config) {
	if(process.platform === 'darwin') {
		var macNotifier = new NotificationCenter();
		macNotifier.notify(config);
	} else {
		notifier.notify({
			title: config.subtitle,
			message: config.message
		});
	}	
}

new CronJob('00 */' + config.interval + ' * * * *', function() {
	console.log('Polling...');
	let results = [];
	config.currencies.forEach(function(currency_id) {
		request("https://api.coinmarketcap.com/v1/ticker/" + currency_id + "/", function(error, response, body) {
			if(error) {
				console.error(error);
			  	notify({
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
				notify({
					'title': 'CoinWatch',
					'subtitle': element.name + ' is now at ' + element.price_usd + '$',
					'message': 'Which is a change of ' + element.percent_change_1h + '% since the last hour.',
					'open': 'https://coinmarketcap.com/currencies/' + element.id
				})
			}, i * config.notif_delay);
			i++;
		});
	}, config.reqst_delay);
}, null, true, 'Europe/Berlin');