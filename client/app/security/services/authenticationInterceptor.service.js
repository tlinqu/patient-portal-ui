﻿(function () {

    'use strict';

    angular
        .module('app.security')
        .factory('authInterceptorService', authInterceptorService);

    /* @ngInject */
    function authInterceptorService($q, $location, utilityService, oauthTokenService,
                                    urlAuthorizationConfigurerService, securityConstants) {
        var service = {};
        service.request = request;
        service.responseError = responseError;

        return service;

        function request(config) {
            var currentPath = $location.path();
            //set Accept-Language - Wentao
            var lang = window.localStorage.lang || 'en';
            config.headers = config.headers || {};
            config.headers['Cache-Control'] = 'no-cache';
            config.headers.Pragma = 'no-cache';
            config.headers['Accept-Language'] = lang;

            var accessToken = oauthTokenService.getAccessToken();

            if (accessToken) {
                if (accessToken && oauthTokenService.isExpiredToken()) {
                    oauthTokenService.removeToken();
                    utilityService.redirectTo(securityConstants.loginPath);
                } else if (utilityService.isSecuredApi(config.url)) {
                    config.headers.Authorization = 'Bearer  ' + accessToken;
                }
            } else {
                if (urlAuthorizationConfigurerService.isAllowAccess(currentPath)) {
                    utilityService.redirectTo(currentPath);
                } else {
                    utilityService.redirectTo(securityConstants.loginPath);
                }
            }
            return config;
        }

        function responseError(rejection) {
            if (rejection.status === 401) {
                var authData = oauthTokenService.getToken();

                if (authData) {
                    if (oauthTokenService.isExpiredToken()) {
                        //authenticationService.logout();
                    } else {
                        // Got to Error page
                    }
                    return $q.reject(rejection);
                } else {
                    //authenticationService.logout();
                }
            }
            return $q.reject(rejection);
        }
    }
})();