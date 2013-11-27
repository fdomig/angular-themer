angular.module('demoApp', ['angular-themer'])

	.config(['themerProvider', function (themerProvider) {
		var styles = [
			{ key: 'DARK', label: 'Dark Theme', href: 'dark.css'},
			{ key: 'LIGHT', label: 'Light Theme', href: 'light.css'},
			{ key: 'DRACULA', label: 'Dracula Theme', href: 'dracula.css'}
		];

		themerProvider.setStyles(styles);
		themerProvider.setSelected(styles[0].key);
	}])

	.controller('DemoCtrl', function($scope) {
		
	});