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

    var requestFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    var renderFn, clock = new THREE.Clock();

    var paintCanvas = document.createElement('canvas');
    paintCanvas.style.background = 'linear-gradient(to bottom, rgba(255,255,255,.5) 0%, rgba(246,246,246,.5) 47%, rgba(237,237,237,.5) 100%)';
    paintCanvas.style.position = 'fixed';
    paintCanvas.style.zIndex = 399999;
    paintCanvas.style.right = '0';
    paintCanvas.style.top = '0';
    paintCanvas.width = 500;
    paintCanvas.height = 300;
    // document.body.appendChild(paintCanvas);
    var paintCtx = paintCanvas.getContext('2d');
    var fontFamily = 'Avenir, Helvetica Neue, Helvetica, Arial, sans-serif';
    var fontSize = 100, gap = 4, factor = 20;

    function setFontSize(s) {
        paintCtx.font = 'bold ' + s + 'px ' + fontFamily;
    }

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

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

            // ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

            var delta = clock.getDelta();

            THREE.AnimationHandler.update(delta);
            W._3d.Renderer.render(W._3d.Scene, W._3d.Camera);
            W._3d.Stats.update();

            renderFn = !renderFn ? fn : renderFn;
            renderFn(delta);
            requestFrame.call(W, this.Loop.bind(this));
        },
        W: W,
        Text: function (texts) {
            var s = 0, geo = null;

            setFontSize(fontSize);
            s = Math.min(fontSize,
                (paintCanvas.width / paintCtx.measureText(texts[0]).width) * 0.8 * fontSize,
                (paintCanvas.height / fontSize) * (isNumber(texts[0]) ? 1 : 0.45) * fontSize);
            setFontSize(s);

            paintCtx.clearRect(0, 0, paintCanvas.width, paintCanvas.height);
            for (var i = 0; i < texts.length; i++) {
                paintCtx.fillText(texts[i], 0, s * (i + 1));
            }

            var pixels = paintCtx.getImageData(0, 0, paintCanvas.width, paintCanvas.height).data,
                dots = [],
                x = 0,
                y = 0,
                fx = paintCanvas.width,
                fy = paintCanvas.height,
                w = 0,
                h = 0;

            for (var p = 0; p < pixels.length; p += (4 * gap)) {
                if (pixels[p + 3] > 0) {
                    if (!geo) {
                        geo = new T.Geometry();
                    }

                    for (var z = 0; z < 10; z++) {
                        var particle = new THREE.Vector3(x / factor, -y / factor, z / factor);
                        geo.vertices.push(particle);
                    }
                }

                x += gap;

                if (x >= paintCanvas.width) {
                    x = 0;
                    y += gap;
                    p += gap * 4 * paintCanvas.width;
                }
            }

            var material = new THREE.PointsMaterial(
                {
                    color: '#ffffff',
                    size: gap / factor,
                    blending: THREE.AdditiveBlending,
                    transparent: true
                });

            return new THREE.Points(geo, material);
        }
    };

})(THREE, window, '#main');