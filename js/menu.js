function redraw() {
    gProcessor.viewer.onDraw();
}

var menu = {};

// OpenJSCAD
// -------------
menu.openjscad = {};
menu.openjscad.about = function() {
    $('#about').attr('visible', 'true');
    return false;
};
menu.openjscad.recentUpdates = function() {
    var url = "https://plus.google.com/115007999023701819645";
    window.open(url, '_blank');
};

// File
// -------------
menu.file = {};
menu.file.open = function() {
    //f = Folder.selectDialog("wot");
    //alert (f);
};

// View
// -------------
menu.view = {};
menu.view.showAxes = function(el) {
    userPrefs.view.axes.show = !userPrefs.view.axes.show;
    redraw();
    if (userPrefs.view.axes.show)
        $(el).addClass('checked');
    else
        $(el).removeClass('checked');
};
menu.view.showGrid = function(el) {
    userPrefs.view.grid.major.show = !userPrefs.view.grid.major.show;
    redraw();
    if (userPrefs.view.grid.major.show)
        $(el).addClass('checked');
    else
        $(el).removeClass('checked');
};
menu.view.top = function() {
    var angle = gProcessor.viewer.view.angle;
    angle.x = 0;
    angle.y = 0;
    angle.z = 0;
    redraw();
}
menu.view.bottom = function() {
    var angle = gProcessor.viewer.view.angle;
    angle.x = -180;
    angle.y = 0;
    angle.z = 0;
    redraw();
}
menu.view.front = function() {
    var angle = gProcessor.viewer.view.angle;
    angle.x = -90;
    angle.y = 0;
    angle.z = 0;
    redraw();
}
menu.view.back = function() {
    var angle = gProcessor.viewer.view.angle;
    angle.x = -90;
    angle.y = 0;
    angle.z = -180;
    redraw();
}
menu.view.right = function() {
    var angle = gProcessor.viewer.view.angle;
    angle.x = -90;
    angle.y = 0;
    angle.z = -90;
    redraw();
}
menu.view.left = function() {
    var angle = gProcessor.viewer.view.angle;
    angle.x = -90;
    angle.y = 0;
    angle.z = 90;
    redraw();
}
menu.view.diagonal = function() {
    var angle = gProcessor.viewer.view.angle;
    angle.x = -60;
    angle.y = 0;
    angle.z = -45;
    redraw();
}
menu.view.center = function() {
    var vp = gProcessor.viewer.view.viewpoint;
    vp.x = 0;
    vp.y = 0;
    redraw();
}
menu.view.resetView = function() {
    var angle = gProcessor.viewer.view.angle;
    var vp = gProcessor.viewer.view.viewpoint;
    angle.x = -60;
    angle.y = 0;
    angle.z = -45;
    vp.x = 0;
    vp.y = -5;
    vp.z = gProcessor.initialViewerDistance;
    redraw();
}

// Help
// -------------
menu.help = {};
menu.help.documentation = function() {
    var url = "https://github.com/Spiritdude/OpenJSCAD.org/wiki/User-Guide";
    window.open(url, '_blank');
};
menu.help.community = function() {
    var url = "https://plus.google.com/communities/114958480887231067224";
    window.open(url, '_blank');
};
