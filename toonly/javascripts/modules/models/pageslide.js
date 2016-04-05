/**
 * Created by caoyouxin on 4/1/16.
 */
define(['utils/modelUtils'], function (ModelUtils) {

    function PageSlide(url) {
        this._url = url;
    }

    return {
        new: function (url) {
            return ModelUtils.addAccessors(new PageSlide(url));
        }
    };
});