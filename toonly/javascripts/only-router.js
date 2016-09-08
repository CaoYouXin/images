/**
 * Created by caoyouxin on 3/25/16.
 */
define(['require'], function (require) {

    var locationPrefix = 'caols.tech' === document.domain ? '/' : '/myblog/';
    var historyStack = [];
    var skip = null;
    var _pageSlide = null;
    function pageSlide() {
        return _pageSlide = _pageSlide || require('toonly/javascripts/only-pageslide');
    }

    window.onpopstate = function (event) {

        console.log('event: ', event);

        if (event.state && event.state.home) {
            location.reload();
            return false;
        }

        historyStack.reverse();
        historyStack.shift();
        historyStack.reverse();

        if (event.state && event.state.skip) {
            skip = event.state.skip;
        }

        if (skip > 0) {
            skip--;
            history.back();
            return false;
        }

        console.log('after: ', historyStack);

        pageSlide().go(event.state.url);
    };

    return {
        go: function (url) {

            console.log('go: ', url);
            console.log('before: ', historyStack);

            if (url.match(/.*?:\/\/(.*?)\/.*/)) {
                location.href = url;

                return;
            }

            if (url.indexOf(locationPrefix) === -1) {
                url = locationPrefix + url;
            }

            var index = historyStack.indexOf(url);
            if (index !== -1) {

                var skip = historyStack.length - index;

                historyStack.push(null);
                historyStack.push(null);

                history.pushState({
                    skip: skip
                }, '', url);
                history.pushState(null, '', location.href);

                history.back();
                return;
            }

            historyStack.push(url);
            historyStack.push(null);

            history.pushState({
                url: url
            }, '', url);
            history.pushState(null, '', location.href);
            history.back();
        },
        init: function (urls) {
            console.log('gos: ', urls);
            console.log('before: ', historyStack);

            var i, url;

            for (i = 0; i < urls.length; i++) {
                url = urls[i];
                if (url.match(/.*?:\/\/(.*?)\/.*/)) {
                    alert('urls incorrect!');

                    return;
                }

                if (url.indexOf(locationPrefix) === -1) {
                    urls[i] = locationPrefix + url;
                }

                historyStack.push(url);

                history.pushState({
                    url: url
                }, '', url);
            }

            historyStack.push(null);
            history.pushState(null, '', location.href);

            history.back();
        },
        restore: function () {
            var location = document.location.toString();
            localStorage.setItem('urlSnapshot', location.replace(new RegExp('^.*?(' + locationPrefix + '.*?)$'), '$1'));
            localStorage.removeItem('lastTimeData');
            history.replaceState({
                home: true
            }, '', locationPrefix + 'index.html');
            history.pushState(null, '', '');
            history.back();
        }
    };
});
