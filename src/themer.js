angular.module('angular-themer', [])

	.provider('themer', function() {
		"use strict";

		var _styles = [], _selected = { label: '', href: '' }, _watchers = [];

		this.setStyles = function (styles) {
			_styles = styles;
		};

		var addWatcher = function (watcher) {
			_watchers.push(watcher);
		};

		var getSelected = function () {
			return angular.copy(_selected);
		};

		var setSelected = this.setSelected = function (key) {
			angular.forEach(_styles, function (style) {
				if (style.key === key) {
					_selected = style;
					angular.forEach(_watchers, function (watcher) {
						watcher(getSelected());
					});
				}
			});
		};

		this.$get = [function () {
			return {
				styles: _styles,
				getSelected: getSelected,
				setSelected: setSelected,
				addWatcher: addWatcher
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
				$scope.selected = themer.getSelected();

				themer.addWatcher(function (style) {
					$scope.selected = style;
				});
			}]
		};

	})

	.directive('themerSwitcher', function () {
		"use strict";

		return {
			restrict: 'A',
			template: '<select ng-model="theme.selected"><option ng-repeat="style in theme.styles" value="{{ style.key }}">{{ style.label }}</option></select>',
			scope: false,
			controller: ['$scope', 'themer', function ($scope, themer) {
				$scope.theme = {
					styles: themer.styles,
					selected: themer.getSelected().key
				};

				$scope.$watch('theme.selected', function () {
					if (!$scope.theme.selected) { return; }
					themer.setSelected($scope.theme.selected);
				});
			}]
		};
	})

;