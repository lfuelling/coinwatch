console.log('Starting Daemon...');

require('daemon')();

var CronJob = require('cron').CronJob;
var notifier = require('terminal-notifier');
var request = require('request');
var config = require('./config');

new CronJob('00 */' + config.interval + ' * * * *', function() {
	let results = [];
	config.currencies.forEach(function(currency_id) {
		request("https://api.coinmarketcap.com/v1/ticker/" + currency_id + "/", function(error, response, body) {
			if(error) {
			  	notifier(error.toString(), { title: 'CoinWatch', subtitle: 'HTTP Error', group: currency_id });
			} else {
				results.push(JSON.parse(body)[0])
		  	}
		});
	});
	setTimeout(function() {
		let i = 0;
		results.forEach(function(element) {
			setTimeout(function() {
				notifier('Which is a change of ' + element.percent_change_1h + '% since one hour.', { title: 'CoinWatch', subtitle: element.name + ' is now at ' + element.price_usd + '$', group: element.id, open: 'https://coinmarketcap.com/currencies/' + element.id });
			}, i * config.notif_delay);
			i++;
		});
	}, config.reqst_delay);
}, null, true, 'Europe/Berlin');

