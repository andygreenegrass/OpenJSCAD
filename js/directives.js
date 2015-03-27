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

angular.module('mainApp').directive('workspace', function() {    
    return {
        restrict: 'E',
        scope: {},
        compile: function(tElement, tAttributes) {
            var startX = 0;
            var originalWidth = 0;
            
            function mousemove(event) {
                //console.log(event.screenX);
                var newWidth = originalWidth + (startX - event.screenX);
                if (newWidth < 155) {
                    newWidth = 155;
                }
                tElement.width(newWidth);
            }
            
            function mouseup(event) {
                //console.log('mouse up...');
                console.log(tElement.width());
                $(document).off('mousemove', mousemove);
                $(document).off('mouseup', mouseup);
            }
            
            var handle = tElement.children('.size-handle');
            handle.on('mousedown', function(event) {
                //console.log(tElement.width());
                originalWidth = tElement.width();
                startX = event.screenX;
                console.log(startX);
                $(document).on('mousemove', mousemove);
                $(document).on('mouseup', mouseup);
            });
        }
    };
});