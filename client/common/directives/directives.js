﻿(function () {

    'use strict';

    /**
     * pageTitle - Directive for set Page title - mata title
     */
    function PageTitle($rootScope, $timeout) {
        return {
            link: function (scope, element) {
                var listener = function (event, toState, toParams, fromState, fromParams) {
                    // Default title - load on Dashboard 1
                    var title = 'TESTBED | Login';
                    // Create your own title pattern
                    if (toState.data && toState.data.pageTitle) {
                        title = 'TESTBED | ' + toState.data.pageTitle;
                    }
                    $timeout(function () {
                        element.text(title);
                    });
                };
                $rootScope.$on('$stateChangeStart', listener);
            }
        };
    }

    /**
     * sideNavigation - Directive for run metsiMenu on sidebar navigation
     */
    function SideNavigation($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                // Call the metsiMenu plugin and plug it to sidebar navigation
                $timeout(function () {
                    element.metisMenu();

                });
            }
        };
    }

    function IboxTools($timeout) {
        return {
            restrict: 'A',
            scope: {
                total: '@',
                ppCollapsed: '=?',
                ppChevronPreventDefault: '=?'
            },
            templateUrl: 'common/tmpl/ibox_tools.tpl.html',
            controller: function ($scope, $element) {
                $scope.ppChevronPreventDefault = !!$scope.ppChevronPreventDefault;
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');

                if ($scope.ppCollapsed) {
                    content.slideUp(0);
                }

                $scope.toggleCollapsed = function () {
                    if (!$scope.ppChevronPreventDefault) {
                        $scope.ppCollapsed = !$scope.ppCollapsed;
                    }
                };

                // Function for collapse ibox
                $scope.showhide = function () {
                    content.slideToggle(200);
                    // Toggle icon from up to down
                    icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                    //ibox.toggleClass('').toggleClass('border-bottom');
                    $timeout(function () {
                        ibox.resize();
                        ibox.find('[id^=map-]').resize();
                    }, 50);
                };
                // Function for close ibox
                $scope.closebox = function () {
                    var ibox = $element.closest('div.ibox');
                    ibox.remove();
                };

                //handle expand event
                $scope.$on('ExpandAccordions', function (event, args) {

                    if (args.expand) {
                        //Accordion down
                        content.slideDown(200);

                        if (icon.hasClass('fa-chevron-down')) {
                            icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                        }

                        ibox.toggleClass('');
                        $timeout(function () {
                            ibox.resize();
                            ibox.find('[id^=map-]').resize();
                        }, 50);
                    }
                });

                $scope.$on('CollapseAccordions', function (event, args) {

                    if (args.collapse) {
                        //Accordion down
                        content.slideUp(200);

                        if (icon.hasClass('fa-chevron-up')) {
                            icon.toggleClass('fa-chevron-down').toggleClass('fa-chevron-up');
                        }

                        ibox.toggleClass('');
                        $timeout(function () {
                            ibox.resize();
                            ibox.find('[id^=map-]').resize();
                        }, 50);
                    }
                });

                $scope.$watch('ppCollapsed', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        $scope.showhide();
                    }
                });
            }
        };
    }

    /**
     * minimalizaSidebar - Directive for minimalize sidebar
     */
    function MinimalizaSidebar($timeout) {
        return {
            restrict: 'A',
            scope: {
                togglesidebar: "&"
            },
            template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary dark-green"  ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
            controller: function ($scope, $element) {

                $scope.minimalize = function () {

                    $scope.togglesidebar();

                    // Side Navbar
                    $("body").toggleClass("mini-navbar");

                    if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                        // Hide menu in order to smoothly turn on when maximize menu
                        $('#side-menu').hide();
                        // For smoothly turn on menu
                        setTimeout(
                            function () {
                                $('#side-menu').fadeIn(500);
                            }, 100);
                    } else if ($('body').hasClass('fixed-sidebar')) {
                        $('#side-menu').hide();
                        setTimeout(
                            function () {
                                $('#side-menu').fadeIn(500);
                            }, 300);
                    } else {
                        // Remove all inline style from jquery fadeIn function to reset menu state
                        $('#side-menu').removeAttr('style');
                    }
                };
            }
        };
    }

    /**
     * Icheck directive
     */
    function Icheck($timeout) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function ($scope, element, $attrs, ngModel) {
                return $timeout(function () {
                    var value;
                    value = $attrs.value;

                    $scope.$watch($attrs.ngModel, function (newValue) {
                        $(element).iCheck('update');
                    });

                    return $(element).iCheck({
                        checkboxClass: 'icheckbox_square-green',
                        radioClass: 'iradio_square-green'

                    }).on('ifChanged', function (event) {
                        if ($(element).attr('type') === 'checkbox' && $attrs.ngModel) {
                            $scope.$apply(function () {
                                return ngModel.$setViewValue(event.target.checked);
                            });
                        }
                        if ($(element).attr('type') === 'radio' && $attrs.ngModel) {
                            return $scope.$apply(function () {
                                return ngModel.$setViewValue(value);
                            });
                        }
                    });
                });
            }

        };
    }

    /**
     * Wraps the main content to display
     * @returns {{restrict: string, transclude: boolean, scope: {title: string}, templateUrl: string}}
     * @constructor
     */
    function ContentWrapper() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {title: '@'},
            templateUrl: 'common/tmpl/content-wrapper.tpl.html'
        };
    }

    function DatePickerRange() {
        return {
            restrict: 'EA',
            scope: {
                tolabel: "@",
                fromlabel: "@",
                ngModel: "="
            },
            templateUrl: 'common/tmpl/datepicker-range.tpl.html',
            bindToController: true,
            controllerAs: 'DatePickerVm',
            controller: function ($scope) {
                var DatePickerVm = this;

                DatePickerVm.consent = DatePickerVm.ngModel;

                function doFormatDate(dateObj) {
                    var today = new Date(dateObj);
                    var day = today.getDate();
                    var month = today.getMonth() + 1;
                    var year = today.getFullYear();
                    if (day < 10) {
                        day = "0" + day;
                    }
                    if (month < 10) {
                        month = "0" + month;
                    }
                    var formatDate = month + "/" + day + "/" + year;

                    return formatDate;
                }

                var setDateRange = function (startDate, endDate) {
                    if (!startDate || !endDate) {
                        return;
                    }
                    DatePickerVm.error = "";
                    var fd = doFormatDate(new Date());
                    if (Date.parse(startDate) < Date.parse(fd)) {
                        DatePickerVm.error = ' Consent must start from today';
                    } else if (Date.parse(startDate) > Date.parse(endDate)) {
                        DatePickerVm.error = ' The start date cannot occur after the end date';
                    } else {
                        DatePickerVm.ngModel = DatePickerVm.consent;
                    }

                    DatePickerVm.showError = DatePickerVm.error.length;
                };

                var validateDate = function () {

                };

                var today = new Date();
                var initStartDate = doFormatDate(today);
                var initEndDate = today.setDate(today.getDate() + 365);
                $scope.DatePickerVm.consent.consentStart = initStartDate;
                $scope.DatePickerVm.consent.consentEnd = doFormatDate(initEndDate);
                $scope.$watch('DatePickerVm.consent.consentStart', function (startDate) {
                    setDateRange(startDate, DatePickerVm.consent.consentEnd);
                });
                $scope.$watch('DatePickerVm.consent.consentEnd', function (endDate) {
                    setDateRange(DatePickerVm.consent.consentStart, endDate);
                });
            },

            link: function (scope, element) {
                element.datepicker({todayBtn: "linked", autoclose: true});
            }
        };
    }

    angular.module('app.directivesModule', [])
        .directive('pageTitle', PageTitle)
        .directive('sideNavigation', SideNavigation)
        .directive('iboxTools', IboxTools)
        .directive('minimalizaSidebar', MinimalizaSidebar)
        .directive('icheck', Icheck)
        .directive('contentWrapper', ContentWrapper)
        .directive('datepickerRange', DatePickerRange);
})();