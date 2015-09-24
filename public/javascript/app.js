(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('Home',{
				url: '/',
				templateUrl: 'views/home.html'
			})
			.state("Token", {
				url: "/auth/token/:token",
				templateUrl: 'views/authenticating.html',
				controller: "TokenController",
				resolve: {
					token: ["$stateParams", function($stateParams) {
						return $stateParams.token;
					}]
				}

			})
		$urlRouterProvider.otherwise('/');
	}
})();
