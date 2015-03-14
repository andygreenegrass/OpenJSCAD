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
    this.file.open = function() {
        //f = Folder.selectDialog("wot");
        //alert (f);
    };

    // Design
    // -------------
    this.design = {};
    this.design.autoReload = function() {
//        userPrefs2.autoReload = !userPrefs2.autoReload;
    };

    // View
    // -------------
    this.view = {};
    this.view.showAxes = function() {
//        userPrefs2.view.axes.show = !userPrefs2.view.axes.show;
//        gProcessor.viewer.onDraw();
    };
    this.view.showGrid = function() {
//        userPrefs2.view.grid.show = !userPrefs2.view.grid.show;
//        gProcessor.viewer.onDraw();
    };
    this.view.top = function() {
        var view = gProcessor.viewer.getView();
        view.angle.x = 0;
        view.angle.y = 0;
        view.angle.z = 0;
        gProcessor.viewer.setView(view);
    };
    this.view.bottom = function() {
        var view = gProcessor.viewer.getView();
        view.angle.x = 180;
        view.angle.y = 0;
        view.angle.z = 0;
        gProcessor.viewer.setView(view);
    };
    this.view.front = function() {
        var view = gProcessor.viewer.getView();
        view.angle.x = 270;
        view.angle.y = 0;
        view.angle.z = 0;
        gProcessor.viewer.setView(view);
    };
    this.view.back = function() {
        var view = gProcessor.viewer.getView();
        view.angle.x = 270;
        view.angle.y = 0;
        view.angle.z = 180;
        gProcessor.viewer.setView(view);
    };
    this.view.right = function() {
        var view = gProcessor.viewer.getView();
        view.angle.x = 270;
        view.angle.y = 0;
        view.angle.z = 270;
        gProcessor.viewer.setView(view);
    };
    this.view.left = function() {
        var view = gProcessor.viewer.getView();
        view.angle.x = 270;
        view.angle.y = 0;
        view.angle.z = 90;
        gProcessor.viewer.setView(view);
    };
    this.view.diagonal = function() {
        var view = gProcessor.viewer.getView();
        view.angle.x = 300;
        view.angle.y = 0;
        view.angle.z = 315;
        gProcessor.viewer.setView(view);
    };
    this.view.center = function() {
        var view = gProcessor.viewer.getView();
        view.viewpoint.x = 0;
        view.viewpoint.y = 0;
        gProcessor.viewer.setView(view);
    };
    this.view.resetView = function() {
        var view = gProcessor.viewer.getView();
        view.angle.x = 300;
        view.angle.y = 0;
        view.angle.z = 315;
        view.viewpoint.x = 0;
        view.viewpoint.y = -5;
        view.viewpoint.z = gProcessor.initialViewerDistance;
        gProcessor.viewer.setView(view);
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
