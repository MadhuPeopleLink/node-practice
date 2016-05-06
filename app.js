var util = require('util');
var vm = require('vm');

var myContext = {
		require: function (module) {
			return require(module);
		}
}

vm.runInNewContext("http = require('http'); var util = require('util'); var options = { host: 'www.google.co.in', path:'/?gfe_rd=cr&amp;ei=7lMsV6alNs-L8QeP-YeABg' }; callback = function(response) { var str = '';response.on('data', function (chunk) { str += chunk; }); response.on('end', function () {util.log(str); }); }; http.request(options, callback).end();", myContext);	





