angular.module('demoApp', ['angular-themer'])

	.controller('DemoCtrl', function($scope) {
		
		$scope.theme = {
			styles: [
				{ label: 'Light Theme', href: 'light.css'},
				{ label: 'Dark Theme', href: 'dark.css'},
				{ label: 'Dracula Theme', href: 'dracula.css'}
			]
		};

		$scope.theme.selected = $scope.theme.styles[0].href;

	});