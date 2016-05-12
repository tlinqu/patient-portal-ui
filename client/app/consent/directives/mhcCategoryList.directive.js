/**
 * Created by Jiahao.Li on 3/20/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.consent')
        .directive('mhcCategoryList', mhcCategoryList);

    function mhcCategoryList() {

        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/consent/directives/categoryList.html',
            scope: {
                bindModel: '=categoryModel',
                bindObj: '=categoryObj',
                bindTitle: '=categoryTitle',
                bindContent: '=categoryContent'
            },
            controller: CategoryListController
        };
        return directive;
    }

    /* @ngInject */
    function CategoryListController() {
    }
})();