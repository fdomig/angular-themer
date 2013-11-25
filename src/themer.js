angular.module('angular-themer', [])

	.provider('themer', function() {
		"use strict";

		var _styles = [], _selected = { label: '', href: '' };

		this.setStyles = function (styles) {
			_styles = styles;
		};

		this.setSelected = function (selected) {
			_selected = selected;
		};

		this.$get = [function () {
			return {
				styles: _styles,
				selected: _selected
			};
		}];

	})

	.directive('themerLink', function() {
		"use strict";

		return {
			restrict: 'A',
			template:  '<link rel="stylesheet" ng-href="{{ selected.href }}" />',
			replace: true,
			scope: true,
			controller: ['$scope', 'themer', function ($scope, themer) {
				$scope.selected = themer.selected;
			}]
		};

	})

	.directive('themerSwitcher', function () {
		"use strict";

		return {
			restrict: 'A',
			template: '<select ng-model="theme.selected.href" ng-options="style.href as style.label for style in theme.styles"></select>',
			scope: false,
			controller: ['$scope', 'themer', function ($scope, themer) {
				$scope.theme = {
					styles: themer.styles,
					selected: themer.selected
				};
			}]
		};
	})

;