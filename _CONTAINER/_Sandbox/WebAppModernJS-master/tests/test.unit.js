'use strict';

/*
 * Unit Tests for PartyPlannerApp - 'user-events' module
 */

describe('PartyPlannerApp: Controllers: ', function() {

	beforeEach(angular.mock.module('PartyPlannerApp'));
	beforeEach(angular.mock.module('firebase'));
	beforeEach(angular.mock.module('user-events'));

	describe('Unit: EventsListCtrl', function () {

		var scope, ctrl;

		beforeEach(angular.mock.inject(function($rootScope, $controller) {
	 
	    	scope = $rootScope.$new();
	 
	    	ctrl = $controller('EventsListCtrl', {$scope: scope});

		}));

		it('should create "events" model', function() {

			expect(scope.events).toBeDefined();

		});

		it('should set the default value of orderProp model', function() {

			expect(scope.orderProp).toBe('date');

		});

	});

});

