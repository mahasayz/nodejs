# Short notes on NodeJS

## HTML5 API
* Using native API directly could lead to problems
  - e.g. HTML5 built-in API bug fixes could have your production code being changed at multiple layers
  - Using FACADE pattern ensures you make changes to only a particular area/module
* Local Storage
  - keeps data forever
  - does not get cleaned up when user clears browser cache and cookies, only possible in developer mode
  - so responsibility of developer to clear local storage during migration
* Session Storage
  - Normally, session cookies keeps data as long as the session is active / broser window is open
  - BUT session storage keeps data as long as TAB is open
* Both types of storage only differ in time of storage
* Both allow you to do a persistence storage in user's browsers
* previously data stored in Cookies
PROBLEM : transmitted data with every request, increasing overhead
* Storage Events
  - say we have multiple tabs open for same site
  - we do some doc editing in one and save it to local storage
  - other tabs get event fired of change to local storage and synchronize their display with new data
* requestAnimationFrame
  - queues up visual updates to be made by browser during next repaint
  - browsers usually repaint as many times as the refresh rate of the monitor e.g. 60 Hz, 100 MHz
  
## NodeJS
- nodejs 1.js
	- process.argv[0] -> nodejs
	- process.argv[1] -> 1.js
- Asynquence
	- library to code sequences and asynchronous events
	- then() always returns done trigger followed by function parameters
	- then() -> synchronous
	- seq() -> asynchronous
	- if you don't need the done trigger, you could use val()
- npm.js.org
	- repository storing other peoples modules
- Read SEMANTIC VERSIONING
- package.json
	- properties for publishing your module via npm
	- for dependencies, use
	```
		"dependencies": {
			"minimist": "~0.0.8"
		}
	```
	- ~ only gets the patch updates and not the major/minor updates
	- npm modules bloat your FileSystem and adds to bandwidth
- Browserify
	- allows to use nodejs specific code in browser scripts
- Tools to run Build processes
	- Grunt : Configuration based approach
	- Gulp
- Streams
	- allows you to make use of buffer stream for I/O
	- makes working with larger file-sets easier
	- streams trigger events such as end-of-file, data reading, etc
	- you can pipe multiple streams into one another
		- e.g. piping http stream to csv parser and then piping to zipping utility
	- http://nodestreams.com
- Node a Server
	- FOREVER (process manager) : monitors node process and starts it if it dies
	- for routing mechanisms good to user EXPRESS FRAMEWORK

## WebSocket
- browser initiates HTTP request with header asking for server to communicate using WebSockets
- server acknowledges usage of WebSockets, if possible, and upgrades to WebSocket level communication followed by handshaking
- Dos and Don'ts
	- DON'T use for sending/broadcasting large data such as DB records, Image uploading, etc
	- DO use it for small/effective data sending such as stock feeds, single record updates, sending chat texts etc.
