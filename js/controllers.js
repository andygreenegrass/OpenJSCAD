$(document).ready(function() {
    $('#viewerContext').on('contextmenu', function(e) {
        e.preventDefault();
        // create our own context menu
    });
});

// ------------------------------------------------------------------------

var version = '0.023 (2015/02/14)';
var appContext = document.location.toString().match(/^file:/)?'web-offline':'web-online'; // me: {cli, web-offline, web-online}
var gMemFs = [];              // associated array, contains file content in source gMemFs[i].{name,source}
var _includePath = './js/';

viewIcon = function (classes) {
    return "<svg class='icon " + classes + "' width='100%' preserveAspectRatio='xMinYMin meet' viewBox='0 0 500 500' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve' style='fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;'><g><g id='Layer1' transform='matrix(1,0,0,1,2.89949,2.89949)'><g id='Faces'><g id='Top' transform='matrix(0.988535,0,0,0.988535,-19.8039,-19.8039)'><path d='M26.6942,27l138.246,137.941l212.169,-2.05025l135.73,-135.89l-486.146,0Z' style='fill:#ffb83f;'/></g><g id='Bottom' transform='matrix(0.988535,0,0,-0.988535,-12.7262,514.005)'><path d='M26.6942,27l138.246,137.941l212.169,-2.05025l135.73,-135.89l-486.146,0Z' style='fill:#ffb83f;'/></g><g id='Left' transform='matrix(-4.81376e-15,0.988535,0.988535,4.81376e-15,-20.1062,-19.5016)'><path d='M26.6942,27l138.246,137.941l212.169,-2.05025l135.73,-135.89l-486.146,0Z' style='fill:#ffb83f;'/></g><g id='Right' transform='matrix(4.81376e-15,0.988535,-0.988535,4.81376e-15,513.847,-19.5016)'><path d='M26.6942,27l138.246,137.941l212.169,-2.05025l135.73,-135.89l-486.146,0Z' style='fill:#ffb83f;'/></g><g id='Back' transform='matrix(0.988535,0,0,0.988535,-19.8039,-19.8039)'><rect x='164.941' y='164.941' width='212.169' height='212.169' style='fill:#ffb83f;'/></g><g id='Front' transform='matrix(0.988535,0,0,0.988535,-19.8039,-19.8039)'><path d='M27,27l486,-1.42109e-14l1.93268e-12,486l-486,0Z' style='fill:#ffb83f;'/></g></g><g id='Frame' transform='matrix(0.988535,0,0,0.988535,-19.8039,-19.8039)'><g><g transform='matrix(1,2.39667e-17,2.39667e-17,0.902149,0,1.95703)'><path d='M520,27.7593c0,-4.28532 -3.13401,-7.75925 -7,-7.75925l-486,0c-3.86599,0 -7,3.47394 -7,7.75925c0,4.28532 3.13401,7.75925 7,7.75925l486,0c3.86599,0 7,-3.47394 7,-7.75925Z' style='fill:#cc8d00;'/></g><g transform='matrix(1,2.39667e-17,2.39667e-17,0.902149,-3.19744e-14,487.957)'><path d='M520,27.7593c0,-4.28532 -3.13401,-7.75925 -7,-7.75925l-486,0c-3.86599,0 -7,3.47394 -7,7.75925c0,4.28532 3.13401,7.75925 7,7.75925l486,0c3.86599,0 7,-3.47394 7,-7.75925Z' style='fill:#cc8d00;'/></g><g transform='matrix(7.8557e-15,-1,0.902149,7.04211e-15,487.957,540)'><path d='M520,27.7593c0,-4.28532 -3.13401,-7.75925 -7,-7.75925l-486,0c-3.86599,0 -7,3.47394 -7,7.75925c0,4.28532 3.13401,7.75925 7,7.75925l486,0c3.86599,0 7,-3.47394 7,-7.75925Z' style='fill:#cc8d00;'/></g><g transform='matrix(7.8557e-15,-1,0.902149,7.04211e-15,1.95703,540)'><path d='M520,27.7593c0,-4.28532 -3.13401,-7.75925 -7,-7.75925l-486,0c-3.86599,0 -7,3.47394 -7,7.75925c0,4.28532 3.13401,7.75925 7,7.75925l486,0c3.86599,0 7,-3.47394 7,-7.75925Z' style='fill:#cc8d00;'/></g></g><g transform='matrix(3.58564e-15,-0.456439,0.902149,7.04211e-15,137.847,393.238)'><path d='M520,27.7593c0,-4.28532 -6.86621,-7.75925 -15.3361,-7.75925l-469.328,0c-8.4699,0 -15.3361,3.47394 -15.3361,7.75925c0,4.28532 6.86621,7.75925 15.3361,7.75925l469.328,0c8.4699,0 15.3361,-3.47394 15.3361,-7.75925Z' style='fill:#cc8d00;'/></g><g transform='matrix(3.58564e-15,-0.456439,0.902149,7.04211e-15,352.067,393.238)'><path d='M520,27.7593c0,-4.28532 -6.86621,-7.75925 -15.3361,-7.75925l-469.328,0c-8.4699,0 -15.3361,3.47394 -15.3361,7.75925c0,4.28532 6.86621,7.75925 15.3361,7.75925l469.328,0c8.4699,0 15.3361,-3.47394 15.3361,-7.75925Z' style='fill:#cc8d00;'/></g><g transform='matrix(0.456439,1.62164e-15,-3.16045e-15,0.902149,146.762,137.847)'><path d='M520,27.7593c0,-4.28532 -6.86621,-7.75925 -15.3361,-7.75925l-469.328,0c-8.4699,0 -15.3361,3.47394 -15.3361,7.75925c0,4.28532 6.86621,7.75925 15.3361,7.75925l469.328,0c8.4699,0 15.3361,-3.47394 15.3361,-7.75925Z' style='fill:#cc8d00;'/></g><g transform='matrix(0.285781,0.285781,-0.637915,0.637915,34.0427,-1.37342)'><path d='M520,27.7593c0,-4.28532 -7.75447,-7.75925 -17.3201,-7.75925l-465.36,0c-9.56563,0 -17.3201,3.47394 -17.3201,7.75925c0,4.28532 7.75447,7.75925 17.3201,7.75925l465.36,0c9.56563,0 17.3201,-3.47394 17.3201,-7.75925Z' style='fill:#cc8d00;'/></g><g transform='matrix(0.285781,0.285781,-0.637915,0.637915,387.052,351.636)'><path d='M520,27.7593c0,-4.28532 -7.75447,-7.75925 -17.3201,-7.75925l-465.36,0c-9.56563,0 -17.3201,3.47394 -17.3201,7.75925c0,4.28532 7.75447,7.75925 17.3201,7.75925l465.36,0c9.56563,0 17.3201,-3.47394 17.3201,-7.75925Z' style='fill:#cc8d00;'/></g><g transform='matrix(0.285781,-0.285781,0.637915,0.637915,351.636,152.948)'><path d='M520,27.7593c0,-4.28532 -7.75447,-7.75925 -17.3201,-7.75925l-465.36,0c-9.56563,0 -17.3201,3.47394 -17.3201,7.75925c0,4.28532 7.75447,7.75925 17.3201,7.75925l465.36,0c9.56563,0 17.3201,-3.47394 17.3201,-7.75925Z' style='fill:#cc8d00;'/></g><g transform='matrix(0.285781,-0.285781,0.637915,0.637915,-1.37342,505.957)'><path d='M520,27.7593c0,-4.28532 -7.75447,-7.75925 -17.3201,-7.75925l-465.36,0c-9.56563,0 -17.3201,3.47394 -17.3201,7.75925c0,4.28532 7.75447,7.75925 17.3201,7.75925l465.36,0c9.56563,0 17.3201,-3.47394 17.3201,-7.75925Z' style='fill:#cc8d00;'/></g><g transform='matrix(0.456439,1.62164e-15,-3.16045e-15,0.902149,146.762,352.067)'><path d='M520,27.7593c0,-4.28532 -6.86621,-7.75925 -15.3361,-7.75925l-469.328,0c-8.4699,0 -15.3361,3.47394 -15.3361,7.75925c0,4.28532 6.86621,7.75925 15.3361,7.75925l469.328,0c8.4699,0 15.3361,-3.47394 15.3361,-7.75925Z' style='fill:#cc8d00;'/></g></g></g></g></svg>";
}

// ----------------------------------------------------------------------------

angular.module('mainApp').controller('mainController', ['$scope', function($scope) {

    $scope.version = version;
    
    $scope.state = {
        editor: {
            show: false
        },
        toolbar: {
            hover: false
        },
        workspace: {
            hover: false
        }
    };

    $scope.currentFile = null;
    $scope.paramDefinitions = [];
    
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    
    $scope.$watch("currentFile.lang", function(newValue, oldValue) {
        //alert(newValue);
        if (newValue === 'jscad' || newValue === 'scad') {
            $scope.state.editor.show = true;
        } else {
            $scope.state.editor.show = false;
        }
    }, true);
    
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------

    $scope.fetchExample = function(f) {
        fetchFile("examples/" + f.file);
    };

    $scope.refreshParams = function() {
        setParamDefinitions(misc.gProcessor.paramDefinitions);
    }

    $scope.render = function() {
        //alert(JSON.stringify($scope.paramDefinitions));
        misc.gProcessor.rebuildSolid($scope.paramDefinitions);
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
        misc.gProcessor.viewer.gl.resizeCanvas();
    }
    
    var newFile = function() {
        fetchFile("new.jscad", "[Untitled]");
    }
    
    var fetchFile = function(filePath, fnOverride) {
        // get filename from path
        // TODO - make this a function
        var fn = filePath.replace(/^.*(\\|\/|\:)/, '');
        if (typeof(fnOverride) === 'undefined') {
            fnOverride = fn;
        }
        // get extension from filename
        // TODO - make this a function
        var lang = fn.replace(/.*\./, '');
        
        $scope.paramDefinitions = [];
        misc.fetchExample(filePath);
        $scope.currentFile = {name: fnOverride, lang: lang};
    };
    
    var setParamDefinitions = function(paramDefs) {
        pd = $scope.paramDefinitions = paramDefs;
    };
    
    // TODO - Check new paramDefs against current.
    // Try to merge them so that any changed values
    // are not lost
    var setJsCad = function(source, filename) {
        $scope.paramDefinitions = [];
        misc.gProcessor.setJsCad(source, filename);
        setParamDefinitions(misc.gProcessor.paramDefinitions);
        $scope.$digest();
    };
    
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    
    Menu = function() {

        // OpenJSCAD
        // -------------
        this.openjscad = {};
        this.openjscad.about = function() {
            $('#about').attr('visible', 'true');
            return false;
        };
        this.openjscad.recentUpdates = function() {
            var url = "https://plus.google.com/115007999023701819645";
            window.open(url, '_blank');
        };

        // File
        // -------------
        this.file = {};
        this.file.new = function() {
            newFile();
        };
        this.file.open = function() {
            //f = Folder.selectDialog("wot");
            //alert (f);
        };

        // Design
        // -------------
        this.design = {};
        this.design.toggleAutoReload = function() {
            $scope.userPrefs.autoReload = !$scope.userPrefs.autoReload;
            misc.setAutoReload();
        };

        // View
        // -------------
        this.view = {};
        this.view.toggleAxes = function() {
            $scope.userPrefs.view.axes.show = !$scope.userPrefs.view.axes.show;
            misc.gProcessor.viewer.onDraw();
        };
        this.view.toggleGrid = function() {
            $scope.userPrefs.view.grid.show = !$scope.userPrefs.view.grid.show;
            misc.gProcessor.viewer.onDraw();
        };
        this.view.top = function() {
            var view = misc.gProcessor.viewer.getView();
            view.angle = {x: 0, y: 0, z: 0};
            misc.gProcessor.viewer.setView(view);
        };
        this.view.bottom = function() {
            var view = misc.gProcessor.viewer.getView();
            view.angle = {x: 180, y: 0, z: 0};
            misc.gProcessor.viewer.setView(view);
        };
        this.view.front = function() {
            var view = misc.gProcessor.viewer.getView();
            view.angle = {x: 270, y: 0, z: 0};
            misc.gProcessor.viewer.setView(view);
        };
        this.view.back = function() {
            var view = misc.gProcessor.viewer.getView();
            view.angle = {x: 270, y: 0, z: 180};
            misc.gProcessor.viewer.setView(view);
        };
        this.view.right = function() {
            var view = misc.gProcessor.viewer.getView();
            view.angle = {x: 270, y: 0, z: 270};
            misc.gProcessor.viewer.setView(view);
        };
        this.view.left = function() {
            var view = misc.gProcessor.viewer.getView();
            view.angle = {x: 270, y: 0, z: 90};
            misc.gProcessor.viewer.setView(view);
        };
        this.view.diagonal = function() {
            var view = misc.gProcessor.viewer.getView();
            view.angle = {x: 300, y: 0, z: 315};
            misc.gProcessor.viewer.setView(view);
        };
        this.view.center = function() {
            var view = misc.gProcessor.viewer.getView();
            view.viewpoint = {x: 0, y: 0, z: view.viewpoint.z};
            misc.gProcessor.viewer.setView(view);
        };
        this.view.resetView = function() {
            var view = misc.gProcessor.viewer.getView();
            view.angle = {x: 300, y: 0, z: 315};
            view.viewpoint = {x: 0, y: -5, z: misc.gProcessor.initialViewerDistance};
            misc.gProcessor.viewer.setView(view);
        };

        // Help
        // -------------
        this.help = {};
        this.help.documentation = function() {
            var url = "https://github.com/Spiritdude/OpenJSCAD.org/wiki/User-Guide";
            window.open(url, '_blank');
        };
        this.help.community = function() {
            var url = "https://plus.google.com/communities/114958480887231067224";
            window.open(url, '_blank');
        };

    };

    $scope.menu = new Menu();
    
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    
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
    
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    
    var misc = {};
    
    misc.browser = 'unknown';
    if (navigator.userAgent.match(/(opera|chrome|safari|firefox|msie)/i))
        misc.browser = RegExp.$1.toLowerCase();
    misc.autoReloadTimer = null;
    misc.gProcessor = null;
    misc.editor = null;
    var gCurrentFiles = [];       // linear array, contains files (to read)
    var gMemFsCount = 0;          // async reading: count of already read files
    var gMemFsTotal = 0;          // async reading: total files to read (Count==Total => all files read)
    var gMemFsChanged = 0;        // how many files have changed
    var gRootFs = [];             // root(s) of folders
    var previousScript = null;

    // ------------------------------------------------------------------------
    
    misc.setAutoReload = function(value) {
        if (value) {
            misc.autoReloadTimer = setInterval(function() {
                //parseFile(gCurrentFile,false,true);
                misc.superviseAllFiles();
            }, 1000);
        } else {
            if (misc.autoReloadTimer !== null) {
                clearInterval(misc.autoReloadTimer);
                misc.autoReloadTimer = null;
            }
        }
    };
    
    // ------------------------------------------------------------------------
    
    misc.onload = function() {
        // -- http://ace.ajax.org/#nav=howto
        misc.editor = ace.edit("editor");
        misc.editor.setTheme("ace/theme/chrome");
        //document.getElementById('ace_gutter').style.background = 'none';
        misc.editor.getSession().setMode("ace/mode/javascript");
        misc.editor.getSession().on('change', function(e) {
            ;
        });
        ['Shift-Return'].forEach(function(key) {
            misc.editor.commands.addCommand({
                name: 'myCommand',
                bindKey: { win: key, mac: key },
                exec: function(editor) {
                    var src = misc.editor.getValue();
                    if(src.match(/^\/\/\!OpenSCAD/i)) {
                        misc.editor.getSession().setMode("ace/mode/scad");
                        src = openscadOpenJscadParser.parse(src);
                    } else {
                        misc.editor.getSession().setMode("ace/mode/javascript");
                    }
                    gMemFs = [];
                    setJsCad(src);
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

        misc.gProcessor = new OpenJsCad.Processor(document.getElementById("viewerContext"), $scope.userPrefs);
        misc.setupDragDrop();
        //gProcessor.setDebugging(debugging); 
        if (appContext == 'web-online') {    // we are online, fetch first example
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
                    misc.fetchExample(data.file,data.url);
                    document.location = document.URL.replace(/#.*$/,'#');       // this won't reload the entire web-page
                }
                xhr.send(); 
            } else if (document.URL.match(/#(examples\/\S+)$/)) {    // local example, e.g. http://openjscad.org/#examples/example001.jscad
                var fn = RegExp.$1;
                misc.fetchExample(fn);
                document.location = document.URL.replace(/#.*$/,'#');
            } else {
                newFile();
            }
        } else {
            setJsCad(misc.editor.getValue());
        }
    };
    
    // ------------------------------------------------------------------------
    
    misc.fetchExample = function(fn, url) {
        gMemFs = []; gCurrentFiles = [];

        //$('#editor').show();

        if (fn.match(/\.[^\/]+$/)) {     // -- has extension
            ;                                  // -- we could already check if valid extension (later)
        } else {                              // -- folder referenced
            if (!fn.match(/\/$/)) 
                fn += "/";      // add tailing /
            fn += 'main.jscad';
        }

        //echo("checking gMemFs");
        //if(gMemFs[fn]) {
        //   console.log("found locally:",gMemFs[i].name);
        //}
        if (1) {     // doesn't work off-line yet
            var xhr = new XMLHttpRequest();
            xhr.open("GET", fn, true);
            if (fn.match(/\.(stl|gcode)$/i)) {
                xhr.overrideMimeType("text/plain; charset=x-user-defined");    // our pseudo binary retrieval (works with Chrome)
            }
            status("Loading "+fn+" <img id=busy src='imgs/busy.gif'>");
            xhr.onload = function() {
                var source = this.responseText;
                var editorSource = source;
                var asyncComputation = false;
                var path = fn;

                _includePath = path.replace(/\/[^\/]+$/,'/');

                misc.editor.getSession().setMode("ace/mode/javascript");
                if (fn.match(/\.jscad$/i)||fn.match(/\.js$/i)) {
                    status("Processing "+fn+" <img id=busy src='imgs/busy.gif'>");
                    //if(url) editorSource = "// Remote retrieved <"+url+">\n"+editorSource;
                    misc.putSourceInEditor(editorSource,fn);
                    setJsCad(source,fn);

                } else if (fn.match(/\.scad$/i)) {
                    status("Converting "+fn+" <img id=busy src='imgs/busy.gif'>");
                    editorSource = source;
                    //if(url) editorSource = "// Remote retrieved <"+url+">\n"+editorSource;
                    if(!editorSource.match(/^\/\/!OpenSCAD/i)) {
                        editorSource = "//!OpenSCAD\n"+editorSource;
                    }
                    source = openscadOpenJscadParser.parse(editorSource);
                    if (0) {
                        source = "// OpenJSCAD.org: scad importer (openscad-openjscad-translator) '"+fn+"'\n\n"+source;
                    }
                    misc.editor.getSession().setMode("ace/mode/scad");
                    misc.putSourceInEditor(editorSource,fn);
                    setJsCad(source,fn);

                } else if (fn.match(/\.(stl|obj|amf|gcode)$/i)) {
                    status("Converting "+fn+" <img id=busy src='imgs/busy.gif'>");
                    if (!fn.match(/\.amf/)) {
                        // import STL/OBJ/AMF via Worker() (async computation) as it takes quite some time
                        // RANT: the whole Blob() & Worker() is anything but a clean concept, mess over mess:
                        //       for example, to pass a DOM variable to worker via postMessage may create a circular reference
                        //       as the data is serialized, e.g. you cannot pass document and in the Worker access document.window.
                        //       Dear Google / JavaScript developers: don't make JS unuseable with this mess!
                        var blobURL = new Blob([document.querySelector('#conversionWorker').textContent]);
                        // -- the messy part coming here:
                        //var url = window.URL; url = url.replace(/#.*$/,''); url = url.createObjectURL(blobURL);
                        var worker = new Worker(window.webkitURL!==undefined?window.webkitURL.createObjectURL(blobURL):window.URL.createObjectURL(blobURL));
                        //var worker = new Worker(window.URL.createObjectURL(blobURL));
                        worker.onmessage = function(e) {    // worker finished
                            var data = e.data;
                            //echo("worker end:",data.source,data.filename);
                            if (e.url) data.source = "// Remote retrieve <"+e.url+">\n"+data.source;
                            //putSourceInEditor(data.source,data.filename);
                            misc.putSourceInEditor("",data.filename);
                            setJsCad(data.source,data.filename);
                        };
                        var u = document.location.href;
                        u = u.replace(/#.*$/,'');
                        u = u.replace(/\?.*$/,'');
                        worker.postMessage({me: appContext, version: misc.version, url: u, remote: url, source: source, filename: fn }); // start worker
                        asyncComputation = true;

                    } else {       // async (disabled)
                        status("Converting "+fn+" <img id=busy src='imgs/busy.gif'>");
                        fn.match(/\.(stl|obj|amf|gcode)$/i);
                        var type = RegExp.$1;
                        if(type=='obj') {
                            editorSource = source = parseOBJ(source,fn);   
                        } else if(type=='amf') {
                            editorSource = source = parseAMF(source,fn);   
                        } else if(type=='gcode') {
                            editorSource = source = parseGCode(source,fn);   
                        } else {
                            editorSource = source = parseSTL(source,fn);   
                        }
                        //if(url) editorSource = source = "// Remote retrieved <"+url+">\n"+editorSource;
                        //putSourceInEditor(source,fn);
                    }
                    if (!asyncComputation) {
                        setJsCad(source,fn);
                    }
                }
            }
            xhr.send();
        }
    };
    
    // ------------------------------------------------------------------------
    
    misc.putSourceInEditor = function(src, fn) {
        misc.editor.setValue(src); 
        misc.editor.clearSelection();
        misc.editor.navigateFileStart();

        previousFilename = fn;
        previousScript = src;
        gPreviousModificationTime = "";
    };
    
    // ------------------------------------------------------------------------
    
    misc.setupDragDrop = function() {
        // Check for the various File API support.
        if (window.File && window.FileReader && window.FileList) {
            // Great success! All the File APIs are supported.
        } else {
            throw new Error("Error: Your browser does not fully support the HTML File API");
        }
        var dropZone = window;
        dropZone.addEventListener('dragover', function(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            $('#drop-view').addClass('shown');
            evt.dataTransfer.dropEffect = 'copy';
        }, false);
        dropZone.addEventListener('drop', misc.handleFileSelect, false);
        dropZone.addEventListener('dragleave', function(evt) {
            $('#drop-view').removeClass('shown');
            evt.stopPropagation();
            evt.preventDefault();
        }, false);
    };
    
    // ------------------------------------------------------------------------
    
    misc.handleFileSelect = function(evt) {
        $('#drop-view').removeClass('shown');
        evt.stopPropagation();
        evt.preventDefault();
        gMemFs = []; gMainFile = null;
        if (!evt.dataTransfer) throw new Error("Not a datatransfer (1)");
        if (!evt.dataTransfer.files) throw new Error("Not a datatransfer (2)");

        if (evt.dataTransfer.items && evt.dataTransfer.items.length) {     // full directories, let's try
            var items = evt.dataTransfer.items;
            gCurrentFiles = [];
            gMemFsCount = 0;
            gMemFsTotal = 0;
            gMemFsChanged = 0;
            gRootFs = [];
            for (var i=0; i<items.length; i++) {
                misc.walkFileTree(items[i].webkitGetAsEntry());
                gRootFs.push(items[i].webkitGetAsEntry());
            }
        }
        if (misc.browser == 'firefox' || appContext == 'web-offline') {     // -- fallback, walkFileTree won't work with file://
            if (evt.dataTransfer.files.length>0) {
                gCurrentFiles = [];                              // -- be aware: gCurrentFiles = evt.dataTransfer.files won't work, as rewriting file will mess up the array
                for (var i=0; i<evt.dataTransfer.files.length; i++) {
                    gCurrentFiles.push(evt.dataTransfer.files[i]);  // -- need to transfer the single elements
                }
                misc.loadLocalFiles();
            } else {
                throw new Error("Please drop a single jscad, scad, stl file, or multiple jscad files");
            }
        }
    };
    
    // ------------------------------------------------------------------------
    
    misc.walkFileTree = function(item, path) {
        // this is the core of the drag'n'drop:
        //    1) walk the tree
        //    2) read the files (readFileAsync)
        //    3) re-render if there was a change (via readFileAsync)

        path = path || "";
        //console.log("item=",item);
        if (item.isFile) {
            item.file(function(file) {                // this is also asynchronous ... (making everything complicate)
                if (file.name.match(/\.(jscad|js|scad|obj|stl|amf|gcode)$/)) {   // for now all files OpenJSCAD can handle
                    console.log("walkFileTree File: " + path + item.name);
                    gMemFsTotal++;
                    gCurrentFiles.push(file);
                    misc.readFileAsync(file);
                }
            });
        } else if (item.isDirectory) {
            var dirReader = item.createReader();
            console.log("walkFileTree Folder: "+item.name);
            dirReader.readEntries(function(entries) {
                // console.log("===",entries,entries.length);
                for (var i=0; i<entries.length; i++) {
                    //console.log(i,entries[i]);
                    //walkFileTree({item:entries[i], path: path+item.name+"/"});
                    misc.walkFileTree(entries[i],path+item.name+"/");
                }
            });
        }
    };
    
    // ------------------------------------------------------------------------
    
    misc.loadLocalFiles = function() {               // this is the linear drag'n'drop, a list of files to read (when folders aren't supported)
        var items = gCurrentFiles;
        console.log("loadLocalFiles",items);
        gMemFsCount = 0;
        gMemFsTotal = items.length;      
        gMemFsChanged = 0;

        for (var i=0; i<items.length; i++) {
            var f = items[i];
            console.log(f);
            misc.readFileAsync(f);
            //gMemFs[f.name] = f;
        }
    };
    
    // ------------------------------------------------------------------------
    
    misc.setCurrentFile = function(file) {              // set one file (the one dragged) or main.jscad
        $scope.currentFile = file;
        gPreviousModificationTime = "";

        console.log("execute: "+file.name);
        if (file.name.match(/\.(jscad|js|scad|stl|obj|amf|gcode)$/i)) {
            $scope.currentFile.lang = RegExp.$1;
        } else {
            throw new Error("Please drop a file with .jscad, .scad or .stl extension");
        }
        if (file.size == 0) {
            throw new Error("You have dropped an empty file");
        }
        misc.fileChanged(file);
    };
    
    // ------------------------------------------------------------------------
    
    misc.readFileAsync = function(f) {                // RANT: JavaScript at its finest: 50 lines code to read a SINGLE file 
        var reader = new FileReader();           //       this code looks complicate and it is complicate.

        console.log("request: " + f.name + " (" + f.fullPath + ")");
        reader.onloadend = function(evt) {
            if (evt.target.readyState == FileReader.DONE) {
                var source = evt.target.result;

                console.log("done reading: " + f.name,source?source.length:0);   // it could have been vanished while fetching (race condition)
                gMemFsCount++;

                if (!gMemFs[f.name] || gMemFs[f.name].source != source)     // note: assigning f.source = source too make gMemFs[].source the same, therefore as next
                    gMemFsChanged++;

                f.source = source;                 // -- do it after comparing

                gMemFs[f.name] = f;                // -- we cache the file (and its actual content)

                if (gMemFsCount == gMemFsTotal) {                // -- are we done reading all?
                    console.log("all "+gMemFsTotal+" files read.");
                    if (gMemFsTotal > 1 || gMemFsCount > 1) {         // we deal with multiple files, so we hide the editor to avoid confusion
                        //$('#editor').hide();
                    } else {
                        //$('#editor').show();
                    }

                    if (gMemFsTotal > 1) {
                        if (gMemFs['main.jscad']) {
                            gMainFile = gMemFs['main.jscad'];
                        } else if (gMemFs['main.js']) {
                            gMainFile = gMemFs['main.js'];
                        } else {
                            for (var fn in gMemFs) {
                                if (gMemFs[fn].name.match(/\/main.jscad$/)||gMemFs[fn].name.match(/\/main.js$/)) {
                                    gMainFile = gMemFs[fn];
                                }
                            }
                        }
                    } else {
                        gMainFile = f;
                    }
                    if (gMemFsChanged > 0) {
                        if (!gMainFile)
                            throw("No main.jscad found");
                        console.log("update & redraw " + gMainFile.name);
                        misc.setCurrentFile(gMainFile);
                    }
                }
            } else {
                throw new Error("Failed to read file");
                if (misc.gProcessor) misc.gProcessor.clearViewer();
                previousScript = null;
            }
        };
        if (f.name.match(/\.(stl|gcode)$/)) {
            reader.readAsBinaryString(f,"UTF-8");
        } else {
            reader.readAsText(f,"UTF-8");
        }
    };
    
    // ------------------------------------------------------------------------
    
    misc.fileChanged = function(f) {               // update the dropzone visual & call the main parser
        $scope.currentFile = f;
//        if (gCurrentFile) {
//            var txt;
//            if (gMemFsTotal>1) {
//                txt = "Current file: "+gCurrentFile.name+" (+ "+(gMemFsTotal-1)+" more files)";
//            } else {
//                txt = "Current file: "+gCurrentFile.name;
//            }
//        }
        misc.parseFile(f,false,false);
    };
    
    // ------------------------------------------------------------------------
    
    misc.superviseAllFiles = function(p) {           // check if there were changes: (re-)load all files and check if content was changed
       //var f = gMainFile;                   // note: main functionality lies in readFileAsync()
       console.log("superviseAllFiles()");

       gMemFsCount = gMemFsTotal = 0;
       gMemFsChanged = 0;

       if(p&&p.forceReload) 
          gMemFsChanged++;

       if (!gRootFs || gRootFs.length==0 || appContext == 'web-offline') {              // walkFileTree won't work with file:// (regardless of chrome|firefox)
         for (var i=0; i<gCurrentFiles.length; i++) {
            console.log("[offline] checking "+gCurrentFiles[i].name);
            gMemFsTotal++;
            misc.readFileAsync(gCurrentFiles[i]);
          }
       } else {
          for(var i=0; i<gRootFs.length; i++) {
             misc.walkFileTree(gRootFs[i]);
          }
       }
    };
    
    // ------------------------------------------------------------------------
    
    misc.parseFile = function(f, debugging, onlyifchanged) {     // here we convert the file to a renderable source (jscad)
        if (arguments.length == 2) {
            debugging = arguments[1];
            onlyifchanged = arguments[2];
            f = $scope.currentFile;
        }
        //gCurrentFile = f;
        var source = f.source;
        var editorSource = source;
        if (source == "") {
            if (document.location.toString().match(/^file\:\//i)) {
                throw new Error("Could not read file. You are using a local copy of OpenJSCAD.org; if you are using Chrome, you need to launch it with the following command line option:\n\n--allow-file-access-from-files\n\notherwise the browser will not have access to uploaded files due to security restrictions.");
            } else {
                throw new Error("Could not read file.");
            }
        } else {
            if (misc.gProcessor && ((!onlyifchanged) || (previousScript !== source))) {
                var fn = $scope.currentFile.name;
                fn = fn.replace(/^.*\/([^\/]*)$/,"$1");     // remove path, leave filename itself
                misc.gProcessor.setDebugging(debugging); 
                //echo(gCurrentFile.lang);
                misc.editor.getSession().setMode("ace/mode/javascript");
                var asyncComputation = false;
                
                if ($scope.currentFile.lang=='jscad' || $scope.currentFile.lang=='js') {
                    ; // default
                } else if ($scope.currentFile.lang=='scad') {
                    editorSource = source;
                    if (!editorSource.match(/^\/\/!OpenSCAD/i)) {
                        editorSource = "//!OpenSCAD\n"+editorSource;
                    }
                    source = openscadOpenJscadParser.parse(editorSource);
                    if (0) {
                        source = "// OpenJSCAD.org: scad importer (openscad-openjscad-translator) '"+fn+"'\n\n"+source;
                    }
                    misc.editor.getSession().setMode("ace/mode/scad");  
                } else if ($scope.currentFile.lang.match(/(stl|obj|amf|gcode)/i)) {
                    status("Converting " + fn + " <img id=busy src='imgs/busy.gif'>");
                    if (!fn.match(/amf/i)) {     // -- if you debug the STL parsing, change it to 'if(0&&...' so echo() works, otherwise in workers
                        //    echo() is not working.., and parseAMF requires jquery, which seem not working in workers
                        var blobURL = new Blob([document.querySelector('#conversionWorker').textContent]);
                        // -- the messy part coming here:
                        var worker = new Worker(window.webkitURL!==undefined?window.webkitURL.createObjectURL(blobURL):window.URL.createObjectURL(blobURL));
                        worker.onmessage = function(e) {
                            var data = e.data;
                            //echo("finished converting, source:",data.source);
                            if (data && data.source && data.source.length) {              // end of async conversion
                                misc.putSourceInEditor(data.source, data.filename);
                                gMemFs[data.filename].source = data.source;
                                setJsCad(data.source,data.filename);
                            } else {
                                // worker responds gibberish (likely echo(), but format unknown)
                                // echo("STL worker",data);
                            }
                        };
                        var u = document.location.href;
                        u = u.replace(/#.*$/,'');
                        u = u.replace(/\?.*$/,'');
                        worker.postMessage({me: appContext, version: misc.version, url: u, source: source, filename: fn });
                        asyncComputation = true;
                    } else {
                        fn.match(/\.(stl|obj|amf|gcode)$/i);
                        var type = RegExp.$1;
                        if (type=='obj') {
                            editorSource = source = parseOBJ(source,fn);   
                        } else if(type=='amf') {
                            editorSource = source = parseAMF(source,fn);   
                        } else if(type=='gcode') {
                            editorSource = source = parseGCode(source,fn);   
                        } else {
                            editorSource = source = parseSTL(source,fn);   
                        }
                    }
                } else {
                    throw new Error("Please drop a file with .jscad, .scad or .stl extension");
                }
                if (!asyncComputation) {                   // end of synchronous conversion
                    misc.putSourceInEditor(editorSource,fn);
                    gMemFs[fn].source = source;
                    setJsCad(source,fn);
                }
            }
        }
    };
    
    // ------------------------------------------------------------------------
    
    misc.setCookie = function(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else var expires = "";
        document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
    };

    // ------------------------------------------------------------------------
    
    misc.getCookie = function(name) {
        var nameEQ = escape(name) + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length, c.length));
        }
        return null;
    };
    
    // ------------------------------------------------------------------------

    misc.deleteCookie = function(name) {
        createCookie(name, "", -1);
    };
    
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------
    
    // User Preferences Stuff
    // ----------------------------------------------

    $scope.userPrefs = $scope.userPrefs = new UserPrefs();
    {
        var temp = misc.getCookie('userPrefs');
        if (temp != null && temp != "") {
            // TODO - Try/Catch for parse
            $scope.userPrefs = JSON.parse(temp);
        }
    }
    $scope.$watch("userPrefs", function(newValue, oldValue) {
        misc.setCookie('userPrefs', JSON.stringify(newValue), 365)
    }, true);

    // ----------------------------------------------
    
    // Show all exceptions to the user:
    OpenJsCad.AlertUserOfUncaughtExceptions();
    
    setTimeout(function() {
        $scope.setViewerContextSize()
    }, 0);
    
    misc.onload();
    misc.setAutoReload($scope.userPrefs.autoReload);
    
    // TODO - get from gProcessor
    $scope.formatInfo = misc.gProcessor.formatInfo();
    
}]);