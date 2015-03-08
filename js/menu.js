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
    gProcessor.viewer.angleX = 0;
    gProcessor.viewer.angleY = 0;
    gProcessor.viewer.angleZ = 0;
    redraw();
}
menu.view.bottom = function() {
    gProcessor.viewer.angleX = -180;
    gProcessor.viewer.angleY = 0;
    gProcessor.viewer.angleZ = 0;
    redraw();
}
menu.view.front = function() {
    gProcessor.viewer.angleX = -90;
    gProcessor.viewer.angleY = 0;
    gProcessor.viewer.angleZ = 0;
    redraw();
}
menu.view.back = function() {
    gProcessor.viewer.angleX = -90;
    gProcessor.viewer.angleY = 0;
    gProcessor.viewer.angleZ = -180;
    redraw();
}
menu.view.right = function() {
    gProcessor.viewer.angleX = -90;
    gProcessor.viewer.angleY = 0;
    gProcessor.viewer.angleZ = -90;
    redraw();
}
menu.view.left = function() {
    gProcessor.viewer.angleX = -90;
    gProcessor.viewer.angleY = 0;
    gProcessor.viewer.angleZ = 90;
    redraw();
}
menu.view.diagonal = function() {
    gProcessor.viewer.angleX = -60;
    gProcessor.viewer.angleY = 0;
    gProcessor.viewer.angleZ = -45;
    redraw();
}
menu.view.center = function() {
    gProcessor.viewer.viewpointX = 0;
    gProcessor.viewer.viewpointY = 0;
    redraw();
}
menu.view.resetView = function() {
    gProcessor.viewer.angleX = -60;
    gProcessor.viewer.angleY = 0;
    gProcessor.viewer.angleZ = -45;
    gProcessor.viewer.viewpointX = 0;
    gProcessor.viewer.viewpointY = -5;
    gProcessor.viewer.viewpointZ = gProcessor.initialViewerDistance;
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
