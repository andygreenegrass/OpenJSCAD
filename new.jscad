function getParameterDefinitions() {
	return [
        {
            name: 'size',
            caption: 'Cube size',
            type: 'int',
            initial: 20
        }
    ];
}

function main(params) {
	return cube({
        size: params.size,
        center: true
    });
}