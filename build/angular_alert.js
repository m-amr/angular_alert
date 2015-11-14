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
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
        '{{message}}'+
        '</div>';
    var _toggle = true;
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

    return {
        restricted : 'A',
        link : function(scope, element, attrs){
            scope.$on(alertService.getWarningEvent(), function($event, message){
                var _className = getAlertClassNameBasedOnEvent(alertService.getWarningEvent());
                if(_toggle){
                    var model = {
                        'message': message,
                        'className': _className
                    };
                    var _interpolatedTemplate = $interpolate(_template)(model);
                    element.html(_interpolatedTemplate);
                    _toggle = false;
                }else{
                    element.html('');
                    _toggle = true;
                }
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