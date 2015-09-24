(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	HomeFactory.$inject = ['$http', '$q'];

	function HomeFactory($http, $q) {
		var o = {};
		o.saveToken = function(token) {
			window.localStorage.setItem("token", token);
		}
		return o;
	}
})();
