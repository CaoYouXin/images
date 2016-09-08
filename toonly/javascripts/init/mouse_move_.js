;(function (T, _3d) {

    console.log(T);
    console.log(_3d);

    var isMoving = false;

    _3d.W.addEventListener('keypress', function (e) {
        if ('KeyG' === e.code) {
            var ctrlStart = document.querySelector('.ctrl-start');

            if (ctrlStart.style.visibility === '' || ctrlStart.style.visibility === 'hidden') {
                ctrlStart.style.visibility = 'visible';
            }
        }
    });

    _3d.Canvas.addEventListener('mousemove', function (e) {
        if (isMoving) {
            console.log(e);
        }
    });

    _3d.Action();
    _3d.Loop(function (delta) {
        _3d.Camera.position.x = 20;
        _3d.Camera.position.y = 1.76;
        _3d.Camera.position.z = 5;
        _3d.Camera.lookAt({x: 0, y: 1.76, z: 0});
    });

    // Grid
    var size = 20, step = 1;
    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial({color: 0x888888});
    for (var i = -size; i <= size; i += step) {
        geometry.vertices.push(new THREE.Vector3(-size, 0, i));
        geometry.vertices.push(new THREE.Vector3(size, 0, i));
        geometry.vertices.push(new THREE.Vector3(i, 0, -size));
        geometry.vertices.push(new THREE.Vector3(i, 0, size));
    }

    geometry.vertices.push(new THREE.Vector3(0, -size, 0));
    geometry.vertices.push(new THREE.Vector3(0, size, 0));

    var line = new THREE.LineSegments(geometry, material);

    _3d.Scene.add(line);

})(THREE, window._3d);