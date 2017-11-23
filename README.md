# Coinwatch

This is a daemon that checks the ticker for configured cryptocurrencies and notofies you about them. This currently works flawlessly when using one or two currencies. When using three or more, the notifications will appear too fast (I'm not sure if I want to fix this).

## Usage

0. `npm i`
1. Configure your currencies in `config.js`. Example: `module.exports = {currencies: ['monero', 'fantomcoin']}`
2. Start the daemon: `$ node index.js`

### Killing the daemon

HAHAHAHA! You will like this.

```
kill -9 $(ps aux | grep coinwatch/index.js | awk '{print $2}')
```

**Note that this will also try to kill the grep command, as it's pid is also returned. So ONE error message about `no such process` will always appear.**