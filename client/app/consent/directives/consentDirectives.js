/**
 * Created by tomson.ngassa on 9/30/2015.
 */

(function () {

    'use strict';

    function CreateConsent() {
        return {
            restrict: 'AE',
            templateUrl: 'app/consent/tmpl/consent-create-edit.tpl.html',
            controllerAs: 'CreateConsentVm',
            bindToController: true,
            controller: ['ConsentService', function (ConsentService) {
                var CreateConsentVm = this;
                CreateConsentVm.authorize = "Authorize";
                CreateConsentVm.disclosure = "Disclosure";
            }]
        };
    }

    function SelectProvider($modal, ProviderService, ConsentService) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'app/consent/tmpl/consent-select-provider.tpl.html',
            require: '?ngModel',
            scope: {
                modaltitle:"="
            },
            bindToController: true,
            controllerAs: 'SelectProviderVm',
            controller: ['$scope', 'ConsentService','$modal', 'ProviderService', function ($scope, ConsentService, $modal, ProviderService) {
                var SelectProviderVm = this;
                //SelectProviderVm.selectedProviders = ConsentService.getSelectedProviders();

                SelectProviderVm.fieldplaceholder = SelectProviderVm.modaltitle === 'Authorize' ? "The following individual or organization" : "To disclose my information to";

                ProviderService.getProviders(function(response){
                    SelectProviderVm.providers = response;
                }, function(error){
                    console.log("Error: in getting providers");
                });

                function SelectProviderModalController ($scope, $modalInstance, notificationService, data, ProviderService, ConsentService) {

                    $scope.selectedProviders = ConsentService.getSelectedProviders();

                    $scope.title = data.modalTitle;
                    $scope.consent = {
                        selectedProviders:[]
                    };
                    $scope.providerData = ConsentService.prepareProviderList($scope.selectedProviders, data.providers);

                    $scope.isOrganizationProvider = function(provider){
                        return ProviderService.isOrganizationProvider(provider);
                    };

                    $scope.isIndividualProvider = function(provider){
                        return ProviderService.isIndividualProvider(provider);
                    };

                    $scope.ok = function () {
                        ConsentService.setSelectedProviders($scope.consent.selectedProviders);
                        $modalInstance.close();
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }

                SelectProviderVm.openSelectProviderModal = function () {
                    var modalInstance = $modal.open({
                        templateUrl: 'app/consent/tmpl/consent-select-provider-modal.tpl.html',

                        resolve: {
                            data: function () {
                                return {
                                    modalTitle:  SelectProviderVm.modaltitle,
                                   providers: SelectProviderVm.providers
                            };
                            }
                        },
                        controller: SelectProviderModalController
                    });
                };
            }],
        };
    }

    function MedicalInformation($modal) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'app/consent/tmpl/consent-medical-information.tpl.html',
            require: '?ngModel',
            scope: {
                data:"="
            },
            bindToController: true,
            controllerAs: 'MedicalInformationVm',
            controller: ['$scope', 'ConsentService','$modal', function ($scope, ConsentService, $modal) {
                var MedicalInformationVm = this;

                function MedicalInformationModalController ($scope, $modalInstance) {
                    $scope.ok = function () {
                        $modalInstance.close();
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }

                MedicalInformationVm.openPrivacySettingsModal = function () {
                    var modalInstance = $modal.open({
                        templateUrl: 'app/consent/tmpl/consent-medical-information-modal.tpl.html',

                        resolve: {
                            data: function () {
                                return MedicalInformationVm.data;
                            }
                        },
                        controller: MedicalInformationModalController
                    });
                };
            }],
        };
    }

    function PurposeOfUse() {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'app/consent/tmpl/consent-purpose-of-use.tpl.html',
            require: '?ngModel',
            bindToController: true,
            controllerAs: 'PurposeOfUseVm',
            controller: ['$scope', 'ConsentService','$modal', function ($scope, ConsentService, $modal) {
                var PurposeOfUseVm = this;

                function PurposeOfUseModalController ($scope, $modalInstance) {
                    $scope.ok = function () {
                        $modalInstance.close();
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }

                PurposeOfUseVm.openSelectPurposeModal = function () {
                    var modalInstance = $modal.open({
                        templateUrl: 'app/consent/tmpl/consent-purpose-of-use-modal.tpl.html',

                        resolve: {
                            data: function () {
                                return PurposeOfUseVm.data;
                            }
                        },
                        controller: PurposeOfUseModalController
                    });
                };
            }],
        };
    }

    function ConsentTerm() {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'app/consent/tmpl/consent-term.tpl.html',
            require: '?ngModel',
            bindToController: true,
            controllerAs: 'ConsentTermVm',
            controller: ['$scope', function ($scope) {
                var ConsentTermVm = this;
            }]
        };
    }

    function ConsentCard() {
        var directive = {
            scope: {consent: '='},
            restrict: 'E',
            templateUrl: 'app/consent/tmpl/consent-card.tpl.html',
            controller: ['ConsentService', consentCardController],
            controllerAs: 'ConsentCardVm'
        };
        return directive;

        function consentCardController(ConsentService){

        }
    }

    function ConsentCardList() {
        var directive = {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/consent/tmpl/consent-card-list.tpl.html',
            controller: ['ConsentService', ConsentCardListController],
            controllerAs: 'ConsentCardListVm'
        };
        return directive;

        function ConsentCardListController(ConsentService) {
            var ConsentCardListVm = this;
            ConsentCardListVm.consentList = ConsentService.listConsent(1);
            console.log(ConsentCardListVm.consentList);
        }
    }

    angular.module("app.consentDirectives",
        [
            'app.consentServices',
            'app.providerService',
            'app.providerFiltersModule',
            'checklist-model'
        ])
        .directive('createConsent', CreateConsent)
        .directive('consentCard', ConsentCard)
        .directive('consentCardList', ConsentCardList)
        .directive('selectProvider', SelectProvider)
        .directive('medicalInformation', MedicalInformation)
        .directive('purposeOfUse', PurposeOfUse)
        .directive('consentTerm', ConsentTerm);
})();
