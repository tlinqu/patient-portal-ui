(function () {
    'use strict';

    angular
        .module('app.security')
        .directive('ppOauthLogin', ppOauthLogin);

    function ppOauthLogin() {

        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/security/directives/oauthLogin.html',
            scope: {},
            bindToController: {},
            controller: OauthLoginController,
            controllerAs: 'oauthLoginVm'
        };

        return directive;

        /* @ngInject */
        function OauthLoginController(utilityService, authenticationService, oauthConfig, profileService, tokenService) {
            var vm = this;
            vm.login = login;
            vm.canSubmit = canSubmit;

            function login() {
                authenticationService.login(vm.user.email, vm.user.password)
                    .then(
                        function (response) {
                            tokenService.setToken(response);
                            profileService.loadProfile()
                                .then(
                                    function (data) {
                                        profileService.setProfile(data);
                                        utilityService.redirectTo(oauthConfig.loginSuccessPath);
                                    },
                                    function (error) {
                                        vm.profileError = true;
                                    }
                                );
                        }, function (error) {
                            tokenService.removeToken();
                            vm.loginError = true;
                        }
                    );
            }

            function canSubmit(loginForm) {
                return loginForm.$dirty && loginForm.$valid;
            }
        }
    }
})();