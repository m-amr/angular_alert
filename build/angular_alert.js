/*! angular_alert - v1.0.0 - 2015-11-14 */ 
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

alertModule.directive('alertComponent', ['alertService', function(alertService){

    var _template =
        '<div class="absolute alert alert-warning alert-dismissible" role="alert">' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
        '<strong>Warning!</strong> Better check yourself,  not looking too good.'+
        '</div>';
    var _toggle = true;

    return {
        restricted : 'A',
        link : function(scope, element, attrs){
            console.log('Linking directive');
            scope.$on(alertService.getWarningEvent(), function(){
                if(_toggle){
                    element.html(_template);
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