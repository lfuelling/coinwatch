module.exports = {
	currencies: ['monero', 'fantomcoin', 'bitcoin', 'iota'],
	interval: 10,
	reqst_delay: 5000,
	notif_delay: 2000
}

/*
	currencies: Array<String> containing lowercase names of currencies (eg. 'monero', 'fantomcoin')
	interval: Interval in minutes to poll and notify
	reqst_delay: Delay in milliseconds to wait for the fetching to finish
	notif_delay: Delay for each notification in milliseconds
 */