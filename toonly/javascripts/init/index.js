/**
 * Created by caoyouxin on 4/1/16.
 */
require(['jquery'], function ($) {
    $(function () {
        if (navigator.userAgent.indexOf("Chrome") === -1) {
            alert('请使用谷歌浏览器打开!');
            return;
        }

        require(['toonly/javascripts/only-pageslide', 'toonly/javascripts/only-router'], function (pageSlide, router) {
            var urlSnapshot = pageSlide.init();
            router.go(urlSnapshot ? urlSnapshot : 'blogcontent/index_.html');
        });
    });
});
