'use strict';

(function () {


    angular
        .module('app.consent')
        .controller('ConsentListController', ConsentListController);

    /**
     * @memberof app.consent
     * @ngdoc controller
     * @name ConsentListController
     * @param consentList {Abject} Resolved list of consent
     *
     * @ngInject
     */
    function ConsentListController(consentList){
        var ConsentListVm = this;
        ConsentListVm.consentList = consentList;
    }
})();