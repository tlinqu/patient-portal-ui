(function () {
    'use strict';

    angular
        .module('app.security')
        .directive('ppOauthLogout', ppOauthLogout);

    function ppOauthLogout() {

        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/security/directives/oauthLogout.html',
            scope: {},
            bindToController: {},
            controller: OauthLogoutController,
            controllerAs: 'oauthLogoutVm'
        };

        return directive;

        /* @ngInject */
        function OauthLogoutController(tokenService, utilityService, oauthConfig, profileService) {
            var vm = this;
            vm.logout = logout;
            vm.name = profileService.getName();

            function logout() {
                tokenService.removeToken();
                utilityService.redirectTo(oauthConfig.loginPath);
            }
        }
    }
})();