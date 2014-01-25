/**
 * ng-pub-sub
 * @module application.config
 */
angular.module('application.config', [
        'service.notification',
        'messages',
        'stats',
        'ngRoute'
    ])

    .constant('DEV_MODE', true)

    .constant('NAV_ITEMS', [
        {title: 'Shout!', index: 'shout', hash: '#shout', icon: 'fa-bullhorn'},
        {title: 'Read posts', index: 'messages', hash: '#messages', icon: 'fa-list'}
    ])

    .config(function ($provide, DEV_MODE) {
        'use strict';

        $provide.decorator('$exceptionHandler',
            function ($delegate, $window) {
                return function(exception, cause) {
                    if (DEV_MODE) {
                        $delegate(exception, cause);
                    } else {
                        $window.location.href = '#/error';
                    }
                };
            });
    })

    .config(function ($routeProvider) {
        'use strict';

        $routeProvider
            .when('/', {
                redirectTo: '/messages'
            })
            .when('/error', {
                templateUrl: 'view/error.tpl.html',
                index: 'error'
            })
            .when('/404', {
                templateUrl: 'view/404.tpl.html',
                index: '404'
            })
            .otherwise({
                redirectTo: '/404'
            });
    });