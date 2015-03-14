// UserPrefs structure and defaults

UserPrefs = function() {
    this.version = 1;
    this.defaultColor = [1,.4,1,1];

    this.toolbar = {
        pinned: true
    };
    
    this.workspace = {
        pinned: true
    };
    
    this.autoReload = true;

    this.view = {
        initialViewerDistance: 200,
        grid: {
            show: false,
            plateSize: 200,
            major: {
                size: 10
            },
            minor: {
                show: false,
                size: 5
            }
        },
        axes: {
            show: true,
            length: 70
        },
        perspective: 50
    };
};