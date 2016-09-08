;(function (T, W) {

    console.log(T);
    console.log(W._3d);

    W._3d.Action();
    W._3d.Loop(function (delta) {
        W._3d.Camera.position.x = 20;
        W._3d.Camera.position.y = 1.76;
        W._3d.Camera.position.z = 5;
        W._3d.Camera.lookAt({x: 0, y: 1.76, z: 0});
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

    W._3d.Scene.add(line);

})(THREE, window);