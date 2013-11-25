angular.module('demoApp', ['angular-themer'])

	.config(['themerProvider', function (themerProvider) {
		var styles = [
			{ label: 'Dark Theme', href: 'dark.css'},
			{ label: 'Light Theme', href: 'light.css'},
			{ label: 'Dracula Theme', href: 'dracula.css'}
		];

		themerProvider.setStyles(styles);
		themerProvider.setSelected(styles[0]);
	}])

	.controller('DemoCtrl', function($scope) {
		
	});