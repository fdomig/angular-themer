angular.module('angular-themer', [])

	.directive('themer', function() {
		"use strict";

		return {
			restrict: 'A',
			template:  '<link rel="stylesheet" ng-href="{{ ngModel }}" />',
			replace: true,
			scope: {
				ngModel: '='
			}
		};

	})

;