
alertModule.service('alertService', ['$rootScope', function($rootScope){

    var _service = this;
    var _alertEventName = 'event:alert';
    var _alertInfoEventName = _alertEventName +':info';
    var _alertWarningEventName = _alertEventName +':warning';
    var _alertErrorEventName = _alertEventName +':error';
    var _alertSuccessEventName = _alertEventName +':success';

    _service.getInfoEvent = function(){
        return _alertInfoEventName;
    };

    _service.getWarningEvent = function(){
        return _alertWarningEventName;
    };

    _service.getErrorEvent = function(){
        return _alertErrorEventName;
    };

    _service.getSuccessEvent = function(){
        return _alertSuccessEventName;
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

    _service.success = function(message){
        $rootScope.$broadcast(_service.getSuccessEvent(), message);
    };

}]);