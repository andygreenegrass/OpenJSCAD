// UserPrefs structure and defaults

UserPrefs = function() {
    this.defaultColor = [1,.4,1,1];

    this.toolbar = {
        pinned: true
    };
    
    this.editor = {
        pinned: true
    };
    
    this.autoRender = true;

    this.view = {
        grid: {
            plateSize: 200,
            major: {
                show: false,
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