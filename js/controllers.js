var mainApp = angular.module('mainApp', []);

mainApp.controller('mainController', ['$scope', function($scope) {
    // User Preferences Stuff
    // ----------------------------------------------

    $scope.userPrefs = $scope.userPrefs = new UserPrefs();
    {
        var temp = getCookie('userPrefs');
        if (temp != null && temp != "") {
            // TODO - Try/Catch for parse
            $scope.userPrefs = JSON.parse(temp);
        }
    }
    $scope.$watch("userPrefs", function(newValue, oldValue) {
        setCookie('userPrefs', JSON.stringify(newValue), 365)
    }, true);

    // ----------------------------------------------

    $scope.state = {
        editor: {
            show: true
        },
        toolbar: {
            hover: false
        },
        workspace: {
            hover: false
        }
    };

    $scope.menu = new Menu();

    $scope.examples = [
        {
            title: 'Basics',
            files: [
                { file:'box.jscad', title: 'Just a box' },
                { file:'example001.jscad', title: 'Sphere with cutouts', spacing: true },
                { file:'example002.jscad', title: 'Cone with cutouts' },
                { file:'example003.jscad', title: 'Cube with cutouts' },
                // { file:'example004.jscad', title: 'Cube minus sphere' },
                { file:'example005.jscad', title: 'Pavillon' }
                // { file:'center.jscad', title: 'Centers of Primitives' },
            ]
        },
        {
            title: 'Extrusion',
            files: [
                { file:'rectangular_extrude.jscad', title: 'Rectangular_extrude()' },
                { file:'linear_extrude.jscad', title: 'Linear_extrude()' },
                { file:'rotate_extrude.jscad', title: 'Rotate_extrude()' }
            ]
        },
        {
            title: 'Slices',
            files: [
                { file:'slices/double-screw.jscad', title: 'SolidFromSlices(): Double Screw', new: true, spacing: true },
                { file:'slices/four2three.jscad', title: 'SolidFromSlices(): 4 to 3', new: true },
                { file:'slices/four2three-round.jscad', title: 'SolidFromSlices(): 4 to 3 round', new: true },
                { file:'slices/spring.jscad', title: 'SolidFromSlices(): Spring', new: true },
                { file:'slices/tor.jscad', title: 'SolidFromSlices(): Tor (multi-color)', new: true },
                { file:'slices/rose.jscad', title: 'SolidFromSlices(): Rose Curve', new: true }
            ]
        },
        {
            title: 'Interactive Params',
            files: [
                { file:'servo.jscad', title: 'Interactive Params: Servo Motor', wrap: true },
                { file:'gear.jscad', title: 'Interactive Params: Gear' },
                { file:'s-hook.jscad', title: 'Interactive Params: S Hook' },
                { file:'grille.jscad', title: 'Interactive Params: Grille' },
                { file:'axis-coupler.jscad', title: 'Interactive Params: Axis Coupler' },
                { file:'lamp-shade.jscad', title: 'Interactive Params: Lamp Shade' },
                { file:'celtic-knot-ring.jscad', title: 'Interactive Params: Celtic Knot Ring' },
                { file:'stepper-motor.jscad', title: 'Interactive Params: Stepper Motor' },
                { file:'iphone4-case.jscad', title: 'Interactive Params: iPhone4 Case' },
                { file:'name_plate.jscad', title: 'Interactive Params: Name Plate', new: true }
            ]
        },
        {
            title: 'Misc',
            files: [
                { file:'bunch-cubes.jscad', title: 'Bunch of Cubes', new: true },
                { file:'lookup.jscad', title: 'Lookup()', spacing: true },
                { file:'expand.jscad', title: 'Expand()' },
                { file:'polyhedron.jscad', title: 'Polyhedron()' },
                { file:'hull.jscad', title: 'Hull()', new: true },
                { file:'chain_hull.jscad', title: 'Chain_hull()', new: true },
                { file:'torus.jscad', title: 'Torus()' },
                { file:'text.jscad', title: 'Vector_text()', new: true, spacing: true },
                { file:'transparency.jscad', title: 'Transparency', new: true, spacing: true },
                { file:'transparency2.jscad', title: 'Transparency 2', new: true },
                { file:'globe.jscad', title: 'Globe', new: true },
                { file:'platonics/', title: 'Recursive Include(): Platonics', new: true, spacing: true }
            ]
        },
        {
            title: 'STL',
            files: [
                { file:'3d_sculpture-VernonBussler.stl', title: '3D Model: 3D Sculpture (Vernon Bussler)', type: 'STL', spacing: true },
                { file:'frog-OwenCollins.stl', title: '3D Model: Frog (Owen Collins)', type: 'STL' },
                { file:'thing_7-Zomboe.stl', title: '3D Model: Thing 7 / Flower (Zomboe)', type: 'STL' },
                // { file:'organic_flower-Bogoboy23.stl', title: '3D Model: Organic Flower (Bogoboy23)', type: 'STL' }, // all wrong normals!!
                { file:'yoda-RichRap.stl', title: '3D Model: Yoda (RichRap)', type: 'STL' }
            ]
        },
        {
            title: 'SCAD',
            files: [
                { file:'example001.scad', title: 'Sphere with cutouts', type: 'OpenSCAD' },
                { file:'example002.scad', title: 'Cone with cutouts', type: 'OpenSCAD' },
                { file:'example003.scad', title: 'Cube with cutouts', type: 'OpenSCAD' }
            ]
        },
        {
            title: 'AMF',
            files: [
                { file:'logo.amf', title: 'OpenJSCAD.org Logo', type: 'AMF', new: true },
                { file:'transparency.amf', title: 'Transparency', type: 'AMF', new: true }
            ]
        }
    ];

    $scope.paramDefinitions = [];
    $scope.setParamDefinitions = function(paramDefs) {
        pd = $scope.paramDefinitions = paramDefs;
    }

    $scope.fetchExample = function(f) {
        $scope.fetchFile("examples/" + f.file, f.file);
    };
    $scope.fetchFile = function(filePath, fn) {
        $scope.paramDefinitions = [];
        fetchExample(filePath, null, function() {
            $scope.setParamDefinitions(gProcessor.paramDefinitions);
            $scope.$digest();
        });
        $scope.currentFile = fn;
    };

    $scope.currentFile = "[Untitled]";

    $scope.newFile = function() {
        $scope.fetchFile("new.jscad", "[Untitled]");
    }

    $scope.refreshParams = function() {
        $scope.setParamDefinitions(gProcessor.paramDefinitions);
    }

    $scope.toggleGrid = function() {
        $scope.userPrefs.view.grid.show = !$scope.userPrefs.view.grid.show;
        gProcessor.viewer.onDraw();
    }

    $scope.toggleAxes = function() {
        $scope.userPrefs.view.axes.show = !$scope.userPrefs.view.axes.show;
        gProcessor.viewer.onDraw();
    }

    $scope.toggleAutoReload = function() {
        $scope.userPrefs.autoReload = !$scope.userPrefs.autoReload;
    };

    $scope.onload = function() {
        // -- http://ace.ajax.org/#nav=howto
        editor = ace.edit("editor");
        editor.setTheme("ace/theme/chrome");
        //document.getElementById('ace_gutter').style.background = 'none';
        editor.getSession().setMode("ace/mode/javascript");
        editor.getSession().on('change', function(e) {
            ;
        });
        ['Shift-Return'].forEach(function(key) {
            editor.commands.addCommand({
                name: 'myCommand',
                bindKey: { win: key, mac: key },
                exec: function(editor) {
                    var src = editor.getValue();
                    if(src.match(/^\/\/\!OpenSCAD/i)) {
                        editor.getSession().setMode("ace/mode/scad");
                        src = openscadOpenJscadParser.parse(src);
                    } else {
                        editor.getSession().setMode("ace/mode/javascript");
                    }
                    gMemFs = [];
                    gProcessor.setJsCad(src);
                },
            });
        });
        if (0) {     // for reload when drag'n'dropped file(s) ([Reload] equivalent)
            viewer.onkeypress = function(evt) {
                if(evt.shiftKey&&evt.keyCode=='13') {   // Shift + Return
                    superviseFiles({forceReload:true});
                }
            };
        }

        gProcessor = new OpenJsCad.Processor(document.getElementById("viewerContext"), $scope.userPrefs);
        setupDragDrop();
        //gProcessor.setDebugging(debugging); 
        if (me=='web-online') {    // we are online, fetch first example
            //    gProcessor.setJsCad(editor.getValue());

            if (document.URL.match(/#(http:\/\/\S+)$/)||
                document.URL.match(/#(https:\/\/\S+)$/)) {   // remote file referenced, e.g. http://openjscad.org/#http://somewhere/something.ext
                var u = RegExp.$1;
                var xhr = new XMLHttpRequest();
                //echo("fetching",u);
                xhr.open("GET",'./remote.pl?url='+u,true);
                if(u.match(/\.(stl|gcode)$/i)) {
                    xhr.overrideMimeType("text/plain; charset=x-user-defined");    // our pseudo binary retrieval (works with Chrome)
                }
                status("Fetching "+u+" <img id=busy src='imgs/busy.gif'>");
                xhr.onload = function() {
                    //echo(this.responseText);
                    var data = JSON.parse(this.responseText);
                    //echo(data.url,data.filename,data.file);
                    fetchExample(data.file,data.url);
                    document.location = document.URL.replace(/#.*$/,'#');       // this won't reload the entire web-page
                }
                xhr.send(); 
            } else if (document.URL.match(/#(examples\/\S+)$/)) {    // local example, e.g. http://openjscad.org/#examples/example001.jscad
                var fn = RegExp.$1;
                fetchExample(fn);
                document.location = document.URL.replace(/#.*$/,'#');
            } else {
                $scope.newFile();
            }
        } else {
            gProcessor.setJsCad(editor.getValue());
        }
    }
    $scope.onload();
    setAutoReload($scope.userPrefs.autoReload);

    // TODO - get from gProcessor
    $scope.formatInfo = gProcessor.formatInfo();

    $scope.render = function() {
        //alert(JSON.stringify($scope.paramDefinitions));
        gProcessor.rebuildSolid($scope.paramDefinitions);
    }

    $scope.setViewerContextSize = function() {
        if ($scope.userPrefs.toolbar.pinned) {
            $('#viewerContext').css('left', '70px'); // subtract 20px to keep it centered
        } else {
            $('#viewerContext').css('left', '0px');
        }
        if ($scope.userPrefs.workspace.pinned) {
            $('#viewerContext').css('right', 'calc(35% - 20px)');
        } else {
            $('#viewerContext').css('right', '0px');
        }
        gProcessor.viewer.gl.resizeCanvas();
    }

    setTimeout(function() {
        $scope.setViewerContextSize()
    }, 0);
}]);

//    angular.module('mc.resizer', []).directive('resizer', function($document) {
//        return function($scope, $element, $attrs) {
//            $element.on('mousedown', function(event) {
//                event.preventDefault();
//                
//                $document.on('mousemove', mousemove);
//                $document.on('mouseup', mouseup);
//            });
//            function mousemove(event) {
//                
//                if ($attrs.resizer == 'vertical') {
//                    // Handle vertical resizer
//                    var x = event.pageX;
//                    
//                    if ($attrs.resizerMax && x > $attrs.resizerMax) {
//                        x = parseInt($attrs.resizerMax);
//                    }
//                    
//                    $element.css({
//                        left: x + 'px'
//                    });
//                    
//                    $($attrs.resizerLeft).css({
//                        width: x + 'px'
//                    });
//                    $($attrs.resizerRight).css({
//                        left: (x + parseInt($attrs.resizerWidth)) + 'px'
//                    });
//                    
//                } else {
//                    // Handle horizontal resizer
//                    var y = window.innerHeight - event.pageY;
//                    
//                    $element.css({
//                        bottom: y + 'px'
//                    });
//                    
//                    $($attrs.resizerTop).css({
//                        bottom: (y + parseInt($attrs.resizerHeight)) + 'px'
//                    });
//                    $($attrs.resizerBottom).css({
//                        height: y + 'px'
//                    });
//                }
//            }
//            function mouseup() {
//                $document.unbind('mousemove', mousemove);
//                $document.unbind('mouseup', mouseup);
//            }
//        };
//    });