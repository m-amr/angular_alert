
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