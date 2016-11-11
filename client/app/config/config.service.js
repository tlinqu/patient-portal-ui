﻿(function () {
    'use strict';

    angular
        .module('app.config')
        .factory('configService', configService);

    /* @ngInject */
    function configService(configConstants, notificationService) {

        var service = {};
        service.getBrandName = getBrandName;
        service.getBrandInitials = getBrandInitials;
        service.getOauthBasicKey = getOauthBasicKey;
        service.getPcmApiBaseUrl = getPcmApiBaseUrl;
        service.getPhrApiBaseUrl = getPhrApiBaseUrl;
        service.getTryPolicyApiBaseUrl = getTryPolicyApiBaseUrl;
        service.getUserInfo = getUserInfo;
        service.getPlsApiBaseUrl = getPlsApiBaseUrl;
        service.getTokenUrl = getTokenUrl;
        service.getVerificationUrl = getVerificationUrl;
        service.getActivationUrl = getActivationUrl;
        service.getForgotPasswordUrl = getForgotPasswordUrl;

        return service;

        function getConfigByPropertyKey(key, errorMessage) {
            if (checkKeyExistsInObject(configConstants, key)) {
                return accessPropertyByStringKey(configConstants, key);
            } else {
                notificationService.error('Failed to get configuration for ' + errorMessage);
            }
        }

        function getBrandName() {
            return getConfigByPropertyKey('branding.name', 'Brand Name');
        }

        function getBrandInitials() {
            return getConfigByPropertyKey('branding.initials', 'Brand Initials');
        }

        function getOauthBasicKey() {
            return getConfigByPropertyKey('oauth2.client.base64BasicKey', 'Oauth Basic Key');
        }

        function getPcmApiBaseUrl() {
            return getConfigByPropertyKey('securedApis.pcmApiBaseUrl', 'Pcm Base URL');
        }

        function getPhrApiBaseUrl() {
            return getConfigByPropertyKey('securedApis.phrApiBaseUrl', 'Phr Base URL');
        }

        function getTryPolicyApiBaseUrl() {
            return getConfigByPropertyKey('securedApis.tryPolicyApiBaseUrl', 'TryPolicy Base URL');
        }

        function getUserInfo() {
            return getConfigByPropertyKey('securedApis.userInfo', 'UserInfo Base URL');
        }

        function getPlsApiBaseUrl() {
            return getConfigByPropertyKey('unsecuredApis.plsApiBaseUrl', 'Pls Base URL');
        }

        function getTokenUrl() {
            return getConfigByPropertyKey('unsecuredApis.tokenUrl', 'Token URL');
        }

        function getVerificationUrl() {
            return getConfigByPropertyKey('unsecuredApis.verificationUrl', 'Verification URL');
        }

        function getActivationUrl() {
            return getConfigByPropertyKey('unsecuredApis.activationUrl', 'Activation URL');
        }

        function getForgotPasswordUrl() {
            return getConfigByPropertyKey('unsecuredApis.forgotPasswordUrl', 'ForgotPassword URL');
        }

        function checkKeyExistsInObject(obj, key) {
            var components = key.split(".");
            for (var i = 0; i < components.length; i++) {
                if ((typeof obj !== "object") || (!obj.hasOwnProperty(components[i]))) {
                    return false;
                }
                obj = obj[components[i]];
            }
            return true;
        }

        function accessPropertyByStringKey(obj, stringKey) {
            var parts = stringKey.split('.');
            var newObj = obj[parts[0]];
            if (parts[1]) {
                parts.splice(0, 1);
                var newString = parts.join('.');
                return accessPropertyByStringKey(newObj, newString);
            }
            return newObj;
        }
    }
})();