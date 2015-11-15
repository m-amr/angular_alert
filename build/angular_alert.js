/*! angular_alert - v1.0.0 - 2015-11-15 */ 
(function(){

if(typeof angular === 'undefined'){
    throw 'angular.js is not found.';
}

var alertModule = angular.module('alertModule', []);

alertModule.service('alertService', ['$rootScope', function($rootScope){

    var _service = this;
    var _alertEventName = 'event:alert';
    var _alertInfoEventName = _alertEventName +':info';
    var _alertWarningEventName = _alertEventName +':warning';
    var _alertErrorEventName = _alertEventName +':error';

    _service.getInfoEvent = function(){
        return _alertInfoEventName;
    };

    _service.getWarningEvent = function(){
        return _alertWarningEventName;
    };

    _service.getErrorEvent = function(){
        return _alertErrorEventName;
    };

    _service.info = function(message){
        $rootScope.$broadcast(_service.getInfoEvent(), message);
    };

    _service.warning = function(message){
        $rootScope.$broadcast(_service.getWarningEvent(), message);
    };

    _service.error = function(message){
        $rootScope.$broadcast(_service.getErrorEvent(), message);
    };

}]);
alertModule.directive('alertComponent', ['alertService', '$compile', '$interpolate',  function(alertService, $compile, $interpolate){

    var _template =
        '<div class="absolute alert alert-{{className}} alert-dismissible" role="alert">' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true" ng-click="closeClicked()">&times;</span></button>' +
        '{{message}}'+
        '</div>';

    var _infoClassName = 'info';
    var _warningClassName = 'warning';
    var _errorClassName = 'danger';

    var getAlertClassNameBasedOnEvent = function(eventName){
        switch (eventName){
            case alertService.getWarningEvent():
                return _warningClassName;
            case alertService.getInfoEvent():
                return _infoClassName;
            case alertService.getErrorEvent():
                return _errorClassName;

            default:
                throw eventName+' is not defined.';
        }


    };

    var getModelData = function(message, evenName){
        return {
            'message' : message,
            'className': getAlertClassNameBasedOnEvent(evenName)
        }
    };

    return {
        restricted : 'A',
        link : function(scope, element, attrs){
            scope.closeClicked = function(){
                console.log('close is clicked..');
                element.html('');
            };

            scope.$on(alertService.getWarningEvent(), function($event, message){
                var _interpolatedTemplate = $interpolate(_template)(getModelData(message, alertService.getWarningEvent()));
                var _compiledTemplate = $compile(_interpolatedTemplate)(scope);
                element.append(_compiledTemplate)
            });

            scope.$on(alertService.getInfoEvent(), function($event, message){
                var _interpolatedTemplate = $interpolate(_template)(getModelData(message, alertService.getInfoEvent()));
                var _compiledTemplate = $compile(_interpolatedTemplate)(scope);
                element.append(_compiledTemplate)
            });

            scope.$on(alertService.getErrorEvent(), function($event, message){
                var _interpolatedTemplate = $interpolate(_template)(getModelData(message, alertService.getErrorEvent()));
                var _compiledTemplate = $compile(_interpolatedTemplate)(scope);
                element.append(_compiledTemplate)
            });

        }
    };
}]);


if(typeof define === 'function'){
    define([], function(){
        return angular.module('alertModule');
    });
}

})();