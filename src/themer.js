angular.module('angular-themer', [])

	.provider('themer', function() {
		"use strict";

		var _storeTheme = false, _styles = [], _selected = { label: '', href: [''] }, _watchers = [];

		this.setStyles = function (styles) {
			_styles = styles;

			angular.forEach(_styles, function(style)
			{
				if (style.href === undefined || style.href === null) style.href = [];
				if (!Array.isArray(style.href)) style.href = [style.href];
			});
		};

		this.storeTheme = function (boolean) {
			if (typeof  boolean !== 'boolean') { return }
			_storeTheme = boolean;
		};

		this.getStoredTheme = function() {
			if (!_storeTheme || !localStorage) { return; }
			return localStorage.getItem('selectedTheme');
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
				storeTheme: _storeTheme,
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
			template: '<select ng-model="theme.selected" ng-options="style.key as style.label for style in theme.styles"></select>',
			replace: true,
			scope: false,
			controller: ['$scope', 'themer', function ($scope, themer) {
				$scope.theme = {
					styles: themer.styles,
					selected: themer.getSelected().key
				};

				$scope.$watch('theme.selected', function () {
					if (!$scope.theme.selected) { return; }
					themer.setSelected($scope.theme.selected);

					if (themer.storeTheme && localStorage) {
						localStorage.setItem('selectedTheme', $scope.theme.selected);
					}
				});
			}]
		};
	})
;
