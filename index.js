
var forever = require('forever');

console.log('CoinWatch daemon started!\nThe spawned child process has the id ' + 
			forever.startDaemon('coinwatch.js').pid + 
			', but this may be not the process you want to kill.\n' +
			'The preferred way to kill the daemon is:\n\n\t' +
			'kill -9 $(ps aux | grep coinwatch.js | awk \'{print $2}\')\n');