/**
 * Created by caoyouxin on 4/5/16.
 */
define(['react', 'react-dom'], function (React, ReactDOM) {
    var HHH = React.createClass({
        displayName: 'HHH',

        render: function () {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h1',
                    null,
                    'Hello World!!!'
                ),
                React.createElement(
                    'p',
                    null,
                    'Arise!!!'
                )
            );
        }
    });

    return {
        init: function () {
            ReactDOM.render(React.createElement(HHH, null), document.body);
        }
    };
});