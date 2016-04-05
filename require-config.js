/**
 * Created by caoyouxin on 4/1/16.
 */

;(function (req) {
    var requireSrcPath = document.getElementById('require.min').getAttribute('src');
    var baseUrl = requireSrcPath.substr(0, requireSrcPath.indexOf('/javascript'));
    console.log(baseUrl);
    req.config({
        baseUrl: baseUrl ? baseUrl : '.',
        paths: {
            'jquery': 'javascripts/jquery.min',
            'react': 'javascripts/react-0.14.8.min',
            'react-dom': 'javascripts/react-dom-0.14.8.min',
            'polyfill': 'javascripts/polyfill',
            'handlebars': 'javascripts/handlebars.min',
            'utils': 'toonly/javascripts/utils',
            'models': 'toonly/javascripts/modules/models',
            'views': 'toonly/javascripts/modules/views'
        }
    });
})(require);
