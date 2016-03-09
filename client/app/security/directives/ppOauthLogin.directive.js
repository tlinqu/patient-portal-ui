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
        function OauthLoginController(utilityService, oauthAuthenticationService, oauthConfig, profileService, notificationService) {
            var vm = this;
            vm.login = login;
            vm.canSubmit = canSubmit;

            function login() {
                // TODO return promises and chain them
                oauthAuthenticationService.login(vm.user.email, vm.user.password)
                    .then(function () {
                            profileService.loadProfile(function (response) {
                                profileService.setProfile(response);
                                utilityService.redirectTo(oauthConfig.loginSuccessPath);
                            }, function () {
                                notificationService.error("No profile found");
                            });
                        },
                        function () {
                            vm.loginError = true;
                        });
            }

            function canSubmit(loginForm) {
                return loginForm.$dirty && loginForm.$valid;
            }
        }
    }
})();