var steps = [];
var testindex = 0;
var loadInProgress = false;

// ******settings********//
var webPage = require('webpage');
var page = webPage.create();
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36';
page.settings.loadImages = false;
phantom.cookiesEnable = true;
phantom.javascriptEnable = true;
// ******settings********//

console.log('ALL settings loaded, start with execution');
page.onConsoleMessage = function(msg) {
	console.log(msg);
}
// *******define steps that fantom sould do************ //
steps = [

	// step1 - open twitter login page
	function(){
		console.log('step 1 - open twitter login page');
		page.open("https://twitter.com", function(status){

		});
	},
	// step 2 populate and submit the login form
	function(){
		console.log('step 2 populate and submit the login form');
		page.evaluate(function(){
			document.getElementsByName("session[username_or_email]")[1].value = username; //username
			document.getElementsByName("session[password]")[1].value = password; //password
			document.getElementsByClassName("flex-table-btn")[0].click();
		});
	},
	// step 3 - wait for loading twitter home page and extract the content
	function(){
		console.log("step 3 - wait for loading twitter home page and extract the content");
		var fs = require("fs");
		var result = page.evaluate(function(){
			var pageTweets = document.getElementsByClassName('js-tweet-text');
			var result = new Array();
			for(var i=0; i; pageTweets.length; i++){
				result.push(pageTweets[i].innerHTML);
			}
			return JSON.stringfy(result);
		});
		fs.write("tweets.txt", result, "w");
	},
];
// *******define steps that fantom sould do************ //

// execute steps one by one
interval = setInterval(executeRequestsStepByStep, 50);

function executeRequestsStepByStep(){
	if(loadInProgress == false && typeof steps[testindex] == "function"){
		steps[testindex]();
		testindex++;
	}
	if(typeof steps[testindex] != "function"){
		console.log("test complete!");
		phantom.exit();
	}
}

