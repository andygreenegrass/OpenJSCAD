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
    gProcessor.viewer.onDraw();
    if (userPrefs.view.axes.show)
        $(el).addClass('checked');
    else
        $(el).removeClass('checked');
};
menu.view.showGrid = function(el) {
    userPrefs.view.grid.major.show = !userPrefs.view.grid.major.show;
    gProcessor.viewer.onDraw();
    if (userPrefs.view.grid.major.show)
        $(el).addClass('checked');
    else
        $(el).removeClass('checked');
};
menu.view.top = function() {
    var view = gProcessor.viewer.getView();
    view.angle.x = 0;
    view.angle.y = 0;
    view.angle.z = 0;
    gProcessor.viewer.setView(view);
}
menu.view.bottom = function() {
    var view = gProcessor.viewer.getView();
    view.angle.x = -180;
    view.angle.y = 0;
    view.angle.z = 0;
    gProcessor.viewer.setView(view);
}
menu.view.front = function() {
    var view = gProcessor.viewer.getView();
    view.angle.x = -90;
    view.angle.y = 0;
    view.angle.z = 0;
    gProcessor.viewer.setView(view);
}
menu.view.back = function() {
    var view = gProcessor.viewer.getView();
    view.angle.x = -90;
    view.angle.y = 0;
    view.angle.z = -180;
    gProcessor.viewer.setView(view);
}
menu.view.right = function() {
    var view = gProcessor.viewer.getView();
    view.angle.x = -90;
    view.angle.y = 0;
    view.angle.z = -90;
    gProcessor.viewer.setView(view);
}
menu.view.left = function() {
    var view = gProcessor.viewer.getView();
    view.angle.x = -90;
    view.angle.y = 0;
    view.angle.z = 90;
    gProcessor.viewer.setView(view);
}
menu.view.diagonal = function() {
    var view = gProcessor.viewer.getView();
    view.angle.x = -60;
    view.angle.y = 0;
    view.angle.z = -45;
    gProcessor.viewer.setView(view);
}
menu.view.center = function() {
    var view = gProcessor.viewer.getView();
    view.viewpoint.x = 0;
    view.viewpoint.y = 0;
    gProcessor.viewer.setView(view);
}
menu.view.resetView = function() {
    var view = gProcessor.viewer.getView();
    view.angle.x = -60;
    view.angle.y = 0;
    view.angle.z = -45;
    view.viewpoint.x = 0;
    view.viewpoint.y = -5;
    view.viewpoint.z = gProcessor.initialViewerDistance;
    gProcessor.viewer.setView(view);
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
