angular.module('mainApp').directive('openjscad', function() {    
    return {
        restrict: 'E',
        scope: {
            viewer: '=viewer'
        },
        template: '<canvas/>'
    };
});

angular.module('mainApp').directive('parent', function() {    
    return {
        restrict: 'E',
        scope: {},
        compile: function(tElement, tAttributes) {
            //if (tElement.parent().prop('tagName').toLowerCase() != 'menubar') {
                var arrow = $("<img class='arrow' src='imgs/arrow.svg'/>");
                tElement.append(arrow);
            //}
        }
    };
});