(function() {
	'use strict';
	angular.module('app')
	.controller('TokenController', TokenController);

	TokenController.$inject = ["HomeFactory", "token", "$state"];

	function TokenController(HomeFactory, token, $state) {
		var vm = this;
        HomeFactory.saveToken(token);
        setTimeout(function(){
            $state.go("Home")
        }, 3000)
	}
})();
