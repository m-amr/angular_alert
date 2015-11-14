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
