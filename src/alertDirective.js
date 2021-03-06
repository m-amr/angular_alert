alertModule.directive('alertComponent', ['alertService', '$compile', '$interpolate',  function(alertService, $compile, $interpolate){

    var _template =
        '<div class="absolute alert alert-{{className}} alert-dismissible" role="alert">' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true" ng-click="closeClicked()">&times;</span></button>' +
        '{{message}}'+
        '</div>';

    var _infoClassName = 'info';
    var _warningClassName = 'warning';
    var _errorClassName = 'danger';
    var _successClassName = 'success';

    var getAlertClassNameBasedOnEvent = function(eventName){
        switch (eventName){
            case alertService.getWarningEvent():
                return _warningClassName;
            case alertService.getInfoEvent():
                return _infoClassName;
            case alertService.getErrorEvent():
                return _errorClassName;
            case alertService.getSuccessEvent:
                return _successClassName;

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

            scope.$on(alertService.getSuccessEvent(), function($event, message){
                var _interpolatedTemplate = $interpolate(_template)(getModelData(message, alertService.getSuccessEvent()));
                var _compiledTemplate = $compile(_interpolatedTemplate)(scope);
                element.append(_compiledTemplate)
            });

        }
    };
}]);
