// Headless ブラウザの生成
var page = require('webpage').create();

// URL を開く
page.open('http://www.google.co.jp', function(status) {
	if (status === 'success') {
		// スクリーンキャプチャ
		page.render('google.png');
		// ブラウザ内で JS を実行してデータを受け取る
		var title = page.evaluate(function() {
			var title = document.title;
			return title;
		});
		console.log(title);
	}
	// exit しないと終了しない
	phantom.exit();
});