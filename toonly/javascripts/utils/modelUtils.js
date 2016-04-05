/**
 * Created by caoyouxin on 4/1/16.
 */
define([], function () {

    var invalidModelFormatMessage = 'invalid model format ';

    function capital(key) {
        return key.charAt(1).toUpperCase() + key.substr(2);
    }

    return {
        addAccessors: function (obj) {
            Object.keys(obj).every(function (key) {
                if (key.length < 2) {
                    throw invalidModelFormatMessage + key;
                }

                if (key.charAt(0) !== '_') {
                    throw invalidModelFormatMessage + key;
                }

                var capitalKey = capital(key);
                obj['get' + capitalKey] = function () {
                    return obj[key];
                };
                obj['set' + capitalKey] = function (value) {
                    if (obj.observers) {
                        var _value = obj[key];
                        obj.observers[key](_value, value);
                    }

                    obj[key] = value;
                    return obj;
                };
            });
            return obj;
        },
        addObservers: function (obj, observers) {
            if (!obj.observers) {
                obj.observers = {};
            }

            var _observers = obj.observers;
            obj.observers = Object.assign(_observers, observers);

            return obj;
        },
        addObserver: function (obj, key, observer) {
            if (obj.hasOwnProperty(key)) {
                if (!obj.observers) {
                    obj.observers = {};
                }

                obj.observers[key] = observer;
            }
        }
    };
});
