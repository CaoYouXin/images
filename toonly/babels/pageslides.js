/**
 * Created by caoyouxin on 4/5/16.
 */
define(['react', 'react-dom'], function (React, ReactDOM) {
    var HHH = React.createClass({
        render: function () {
            return (
                <h1>Hello World!!!</h1>
            );
        }
    });

    return {
        init: function () {
            ReactDOM.render(<HHH />, document.body);
        }
    };
});