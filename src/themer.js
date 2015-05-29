angular.module('angular-themer', [])

	.provider('themer', function() {
		"use strict";

		var _styles = [], _selected = { label: '', href: [''] }, _watchers = [];

		this.setStyles = function (styles) {
			_styles = styles;

			angular.forEach(_styles, function(style)
			{
				if (style.href === undefined || style.href === null) style.href = [];
				if (!Array.isArray(style.href)) style.href = [style.href];
			});
		};

		var addWatcher = function (watcher) {
			_watchers.push(watcher);
		};

		var getSelected = this.getSelected = function () {
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
			template:  '<link rel="stylesheet" ng-repeat="style in selected" ng-href="{{ style }}" />',
			replace: true,
			scope: true,
			controller: ['$scope', 'themer', function ($scope, themer) {
				$scope.selected = themer.getSelected().href;

				themer.addWatcher(function (style) {
					$scope.selected = style.href;
				});
			}]
		};

	})

	.directive('themerSwitcher', function () {
		"use strict";

		return {
			restrict: 'A',
			template: '<select ng-model="theme.selected"><option ng-repeat="style in theme.styles" value="{{ style.key }}">{{ style.label }}</option></select>',
			replace: true,
			scope: false,
			controller: ['$scope', 'themer', function ($scope, themer) {
				$scope.theme = {
					styles: themer.styles,
					selected: themer.getSelected()
				};

				$scope.$watch('theme.selected', function () {
					if (!$scope.theme.selected.key) { return; }
					themer.setSelected($scope.theme.selected.key);
				});
			}]
		};
	})
;
