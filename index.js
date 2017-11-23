console.log('Starting Daemon...');

require('daemon')();

var CronJob = require('cron').CronJob;
var notifier = require('terminal-notifier');
var request = require('request');
var config = require('./config');

new CronJob('00 */5 * * * *', function() {
	var timeout = 0;
	for (currency_id of config.currencies) {
		setTimeout(function() {
			console.log('Doing request...')
			request("https://api.coinmarketcap.com/v1/ticker/" + currency_id + "/", function(error, response, body) {
			  if(error) {
			  	notifier(error.toString(), { title: 'CoinWatch', subtitle: 'HTTP Error', group: currency_id });
			  	console.error(error);
			  } else {
			  	let resObj = JSON.parse(body)[0];
				notifier('Which is a change of ' + resObj.percent_change_1h + '% since one hour.', { title: 'CoinWatch', subtitle: resObj.name + ' is now at ' + resObj.price_usd + '$', group: currency_id, open: 'https://coinmarketcap.com/currencies/' + resObj.id });
				console.log(body);
			  }
			});
		}, timeout);
		if(timeout === 0) {
			timeout = 5000;
		} else {
			timeout = 0;
		}
	}
}, null, true, 'Europe/Berlin');