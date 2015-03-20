angular.module('mainApp').directive('openjscad', ['$scope', function($scope) {
    $scope.viewer = {
        var gl = GL.create();
        this.gl = gl;
        this.view = {
            angle: {x: 300, y: 0, z: 315},
            viewpoint: {x: 0, y: -5, z: initialdepth}
        };
        this.userPrefs = userPrefs;

        this.touch = {
            lastX: 0,
            lastY: 0,
            scale: 0,
            ctrl: 0,
            shiftTimer: null,
            shiftControl: null,
            cur: null //current state
        };

        // Draw axes flag:
        this.drawAxes = true;
        // Draw triangle lines:
        this.drawLines = false;
        // Set to true so lines don't use the depth buffer
        this.lineOverlay = false;

        // Set up the viewport
        this.gl.canvas.width  = $(containerelement).width();
        this.gl.canvas.height = $(containerelement).height();
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.matrixMode(this.gl.PROJECTION);
        this.gl.loadIdentity();
        this.gl.perspective(45, this.gl.canvas.width / this.gl.canvas.height, 0.5, 50000);
        this.gl.matrixMode(this.gl.MODELVIEW);

        // Set up WebGL state
        this.gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        this.gl.clearColor(0.93, 0.93, 0.93, 1);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.polygonOffset(1, 1);

        this.getView = function() {
            // Hacky way of making a copy...
            return JSON.parse(JSON.stringify(this.view));
        };

        this.viewStepper = function(newView, numFrames) {
            if (numFrames <= 0) {
                // Correct any angles outside of [0,360]
                for (var axis in newView.angle) {
                    newView.angle[axis] = this.correctAngle(newView.angle[axis]);
                }
                this.view = newView;
                this.onDraw();
                return;
            }

            // Update the angles
            for (var axis in newView.angle) {
                this.view.angle[axis] += (newView.angle[axis] - this.view.angle[axis]) / numFrames;
            }

            // Update the viewpoints
            for (var axis in newView.viewpoint) {
                this.view.viewpoint[axis] += (newView.viewpoint[axis] - this.view.viewpoint[axis]) / numFrames;
            }

            this.onDraw();
            var _this = this;
            setTimeout(function() {_this.viewStepper(newView, numFrames-1);}, 1000/60);
        }

        this.setView = function(newView) {

            // Ensure the shortest path is taken for the animation
            // This could result in angles outside of [0,360]
            // The last frame will correct this.
            for (var axis in newView.angle) {
                // Ensure the angle is between 0 and 360
                newView.angle[axis] = this.correctAngle(newView.angle[axis]);
                var delta = newView.angle[axis] - this.view.angle[axis];
                if (delta < -180) {
                    newView.angle[axis] += 360;
                } else if (delta > 180) {
                    newView.angle[axis] -= 360;
                }
            }

            this.viewStepper(newView, 20);
        };

        // Black shader for wireframe
        this.blackShader = new GL.Shader('\
            void main() {\
                gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;\
            }', '\
            void main() {\
                gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);\
            }'
        );

        // Shader with diffuse and specular lighting
        this.lightingShader = new GL.Shader('\
            varying vec3 color;\
            varying float alpha;\
            varying vec3 normal;\
            varying vec3 light;\
            void main() {\
            const vec3 lightDir = vec3(1.0, 2.0, 3.0) / 3.741657386773941;\
            light = lightDir;\
            color = gl_Color.rgb;\
            alpha = gl_Color.a;\
            normal = gl_NormalMatrix * gl_Normal;\
            gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;\
            }',
                                                    '\
            varying vec3 color;\
            varying float alpha;\
            varying vec3 normal;\
            varying vec3 light;\
            void main() {\
            vec3 n = normalize(normal);\
            float diffuse = max(0.0, dot(light, n));\
            float specular = pow(max(0.0, -reflect(light, n).z), 10.0) * sqrt(diffuse);\
            gl_FragColor = vec4(mix(color * (0.3 + 0.7 * diffuse), vec3(1.0), specular), alpha);\
            }'
        );

        var _this=this;

        var shiftControl = $('<div class="shift-scene"><div class="arrow arrow-left" />\
            <div class="arrow arrow-right" />\
            <div class="arrow arrow-top" />\
            <div class="arrow arrow-bottom" /></div>');
        this.touch.shiftControl = shiftControl;

        $(containerelement).append(this.gl.canvas)
            .append(shiftControl)
            .hammer({//touch screen control
            drag_lock_to_axis: true
        }).on("transform", function(e){
            if (e.gesture.touches.length >= 2) {
                _this.clearShift();
                _this.onTransform(e);
                e.preventDefault();
            }
        }).on("touch", function(e) {
            if (e.gesture.pointerType != 'touch'){
                e.preventDefault();
                return;
            }

            if (e.gesture.touches.length == 1) {
                var point = e.gesture.center;
                _this.touch.shiftTimer = setTimeout(function(){
                    shiftControl.addClass('active').css({
                        left: point.pageX + 'px',
                        top: point.pageY + 'px'
                    });
                    _this.touch.shiftTimer = null;
                    _this.touch.cur = 'shifting';
                }, 500);
            } else {
                _this.clearShift();
            }
        }).on("drag", function(e) {
            if (e.gesture.pointerType != 'touch') {
                e.preventDefault();
                return;
            }

            if (!_this.touch.cur || _this.touch.cur == 'dragging') {
                _this.clearShift();
                _this.onPanTilt(e);
            } else if (_this.touch.cur == 'shifting') {
                _this.onShift(e);
            }
        }).on("touchend", function(e) {
            _this.clearShift();
            if (_this.touch.cur) {
                shiftControl.removeClass('active shift-horizontal shift-vertical');
            }
        }).on("transformend dragstart dragend", function(e) {
            if ((e.type == 'transformend' && _this.touch.cur == 'transforming') || 
                (e.type == 'dragend' && _this.touch.cur == 'shifting') ||
                (e.type == 'dragend' && _this.touch.cur == 'dragging'))
                _this.touch.cur = null;
            _this.touch.lastX = 0;
            _this.touch.lastY = 0;
            _this.touch.scale = 0;
        });

        this.gl.onmousemove = function(e) {
            _this.onMouseMove(e);
        };

        this.gl.ondraw = function() {
            _this.onDraw();
        };

        this.gl.resizeCanvas = function() {
            var canvasWidth  = _this.gl.canvas.clientWidth;
            var canvasHeight = _this.gl.canvas.clientHeight;
            if (_this.gl.canvas.width  != canvasWidth ||
                _this.gl.canvas.height != canvasHeight) {
                _this.gl.canvas.width  = canvasWidth;
                _this.gl.canvas.height = canvasHeight;
                _this.gl.viewport(0, 0, _this.gl.canvas.width, _this.gl.canvas.height);
                _this.gl.matrixMode( _this.gl.PROJECTION );
                _this.gl.loadIdentity();
                _this.gl.perspective(45, _this.gl.canvas.width / _this.gl.canvas.height, 0.5, 1000 );
                _this.gl.matrixMode( _this.gl.MODELVIEW );
                _this.onDraw();
            }
        };
        // only window resize is available, so add an event callback for the canvas
        window.addEventListener( 'resize', this.gl.resizeCanvas );

        this.gl.onmousewheel = function(e) {
            var wheelDelta = 0;    
            if (e.wheelDelta) {
                wheelDelta = e.wheelDelta;
            } else if (e.detail) {
                // for firefox, see http://stackoverflow.com/questions/8886281/event-wheeldelta-returns-undefined
                wheelDelta = e.detail * -40;     
            }
            if (wheelDelta) {
                var factor = Math.pow(1.003, -wheelDelta);
                var coeff = _this.getZoom();
                coeff *= factor;
                _this.setZoom(coeff);
            }
        };

        this.clear();
    };
    
    return {
        restrict: 'E',
        scope: {
            viewer: '=viewer'
        },
        template: '<canvas/>'
    };
}]);