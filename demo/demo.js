angular.module('demoApp', ['angular-themer'])

	.config(['themerProvider', function (themerProvider) {
		var styles = [
			{ key: 'LIGHT', label: 'Light Theme', href: 'demo/light.css'},
			{ key: 'DARK', label: 'Dark Theme', href: 'demo/dark.css'},
			{ key: 'DRACULA', label: 'Dracula Theme', href: 'demo/dracula.css'}
		];

		themerProvider.setStyles(styles);
		themerProvider.setSelected(styles[0].key);
	}])

	.controller('DemoCtrl', function($scope) {
		
	});