/**
 * Created by caoyouxin on 4/1/16.
 */
define(['require'], function (require) {

    var models = {}, views = {};

    return {
        getModel: function (name) {
            if (!models[name]) {
                models[name] = require('models' + name);
            }

            return models[name];
        },
        getView: function (name) {
            if (!views[name]) {
                views[name] = require('views' + name);
            }

            return views[name];
        }
    };
});
