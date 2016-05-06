var util = require('util');
var vm = require('vm');

var myContext = {
		require: function (module) {
			// return require(module);
			var DDPClient = require("ddp");
			var ddpclient = new DDPClient({
			  host : "localhost",
			  port : 3000,
			  ssl  : false,
			  autoReconnect : true,
			  autoReconnectTimer : 500,
			  maintainCollections : true,
			  ddpVersion : '1',  // ['1', 'pre2', 'pre1'] available
			  useSockJs: false
			  // url: 'wss://example.com/websocket'
			});

			ddpclient.connect(function(error, wasReconnect) {
			  if (error) {
			    console.log('DDP connection error!');
			    return;
			  }
			  if (wasReconnect) {
			    console.log('Reestablishment of a connection.');
			  }
			  console.log('connected!');
			});

			ddpclient.call( 'callIt', ['foo', 'bar'], function (err, result) {
			  console.log('called function, result: ' + err);
			});

			setTimeout(function () {
				ddpclient.close();
			}, 2000);
	
		}
}

// vm.runInNewContext("http = require('http'); var util = require('util'); var options = { host: 'www.google.co.in', path:'/?gfe_rd=cr&amp;ei=7lMsV6alNs-L8QeP-YeABg' }; callback = function(response) { var str = '';response.on('data', function (chunk) { str += chunk; }); response.on('end', function () {util.log(str); }); }; http.request(options, callback).end();", myContext);	

vm.runInNewContext("require('http')", myContext);