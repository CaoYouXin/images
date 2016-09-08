/**
 * Created by cls on 16/9/8.
 */
;(function (T, W, el) {
    if (!T) {
        return false;
    }

    var canvas = document.querySelector(el);

    var camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 1, 2000);

    var scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xffffff));

    var requestFrame = window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    var renderFn, clock = new THREE.Clock();

    W._3d = {
        Canvas: canvas,
        Camera: camera,
        Scene: scene,
        Action: function () {

            var renderer = W._3d.Renderer = new THREE.WebGLRenderer({canvas: canvas});
            renderer.setPixelRatio(W['devicePixelRatio']);
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);

            var stats = W._3d.Stats = new Stats();
            document.body.appendChild(stats.dom);

            W.addEventListener('resize', function () {
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(canvas.clientWidth, canvas.clientHeight);
            }, false);

        },
        Loop: function (fn) {
            
            var delta = clock.getDelta();

            THREE.AnimationHandler.update(delta);
            W._3d.Renderer.render(W._3d.Scene, W._3d.Camera);
            W._3d.Stats.update();
            
            renderFn = !renderFn ? fn : renderFn;
            renderFn(delta);
            requestFrame.call(W, this.Loop.bind(this));
        },
        W: W
    };

})(THREE, window, '#main');