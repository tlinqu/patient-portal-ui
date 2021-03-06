/**
 * Created by Jiahao.Li on 3/24/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('c2sPopover', c2sPopover);

    /* @ngInject */
    function c2sPopover() {

        var directive = {
            restrict: 'E',
            template: '<i class="fa fa-info-circle"></i>',
            scope: {
                popoverTitle: "=",
                popoverContent: "="
            },
            link: linkFunc
        };

        return directive;

        /* @ngInject */
        function linkFunc(scope, element, attributes) {
            element.popover({
                trigger: 'click',
                html: true,
                title: generateTitle(),
                content: generateContent(),
                placement: attributes.popoverPlacement,
                template: '<div class="popover popover-width-medium c2s-popover-selector"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title text-navy-blue custom-no-margin-top"></h3><div class="popover-content text-navbar-dark-blue"><p></p></div></div></div>'
            });

            element.on('click', function (event) {
                event.stopPropagation();

            });

            function generateTitle() {
                var title = "";
                if (angular.isDefined(scope.popoverTitle)) {
                    title += "<div>" + scope.popoverTitle + "</div>";
                }
                return title;
            }

            function generateContent() {
                var content = "";
                if (angular.isDefined(scope.popoverContent)) {
                    if (angular.isDefined(scope.popoverContent.items)) {
                        var contentList = scope.popoverContent.items;
                        for (var i = 0; i < contentList.length; i++) {
                            content += "<li style='min-width: 255px;'>" + contentList[i] + "</li>";
                        }
                    } else {
                        content += scope.popoverContent;
                    }
                }
                return content;
            }
        }
    }
})();