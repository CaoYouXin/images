/**
 * Created by caoyouxin on 4/5/16.
 */
define(['react', 'react-dom'], function (React, ReactDOM) {
    var HHH = React.createClass({
        displayName: 'HHH',

        render: function () {
            return React.createElement(
                'h1',
                null,
                'Hello World!!!'
            );
        }
    });

    return {
        init: function () {
            ReactDOM.render(React.createElement(HHH, null), document.body);
        }
    };
});