/**
 * Created by cls on 16/9/15.
 */
;(function () {

    var locationPrefix = window.top.Router.LocationPrefix;

    var promises = [], articles = null, tplFn = null;

    promises.push(new ES6Promise.Promise(function (resolve) {
        nanoajax.ajax({url: locationPrefix + 'articles.json'}, function (code, responseText) {

            if (200 === code) {

                articles = JSON.parse(responseText);

                resolve();
            }
        });
    }));

    promises.push(new ES6Promise.Promise(function (resolve) {
        nanoajax.ajax({url: locationPrefix + '_dev/x-handlebars-templates/article_list.html'}, function (code, responseText) {

            if (200 === code) {

                tplFn = window.top.Handlebars.compile(responseText);

                resolve();
            }
        });
    }));

    ES6Promise.Promise.all(promises).then(function () {
        var html = tplFn(articles);

        var articleListElem = document.getElementById('article_list');

        articleListElem.innerHTML = html;

        articleListElem.addEventListener('click', function (e) {
            if (e.target.tagName === 'A') {
                e.preventDefault();

                var url = e.target.getAttribute('data-rel');

                window.top.Router.go(url, window.top.PageSlider.go);
            }
        })
    });

})();
