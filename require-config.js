/**
 * Created by caoyouxin on 4/1/16.
 */

require.config({
    baseUrl: document.getElementById('require.min').getAttribute('xml:base'),
    paths: {
        'jquery': 'javascripts/jquery.min',
        'react': 'javascripts/react-0.14.8.min',
        'react-dom': 'javascripts/react-dom-0.14.8.min',
        'polyfill': 'javascripts/polyfill',
        'handlebars': 'javascripts/handlebars.min',
        'utils': 'toonly/javascripts/utils'
    }
});
