alertModule.directive('alertComponent', ['alertService', '$compile', '$interpolate',  function(alertService, $compile, $interpolate){

    var _template =
        '<div class="absolute alert alert-{{className}} alert-dismissible" role="alert">' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
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
            scope.$on(alertService.getWarningEvent(), function($event, message){
                var _interpolatedTemplate = $interpolate(_template)(getModelData(message, alertService.getWarningEvent()));
                element.html(_interpolatedTemplate);
            });

            scope.$on(alertService.getInfoEvent(), function($event, message){
                var _interpolatedTemplate = $interpolate(_template)(getModelData(message, alertService.getInfoEvent()));
                element.html(_interpolatedTemplate);
            });

            scope.$on(alertService.getErrorEvent(), function($event, message){
                var _interpolatedTemplate = $interpolate(_template)(getModelData(message, alertService.getErrorEvent()));
                element.html(_interpolatedTemplate);
            });

        }
    };
}]);
