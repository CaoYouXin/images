/**
 * Created by caoyouxin on 4/5/16.
 */
define(['react', 'react-dom'], function (React, ReactDOM) {
    var PageSlides = React.createClass({
        displayName: 'PageSlides',

        render: function () {

            var lis = this.props.data.map(function (url) {
                return React.createElement(
                    'li',
                    { className: 'pageslide', 'data-rel': url },
                    React.createElement('iframe', { src: url, frameborder: '0' })
                );
            });

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'ul',
                    { className: 'pageslides animation' },
                    lis
                ),
                React.createElement(
                    'div',
                    { className: 'pager' },
                    React.createElement(
                        'svg',
                        null,
                        React.createElement('path', { d: 'M10 0 L70 50 L70 0' })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'pager' },
                    React.createElement(
                        'svg',
                        null,
                        React.createElement('path', { d: 'M10 0 L10 50 L70 0' })
                    )
                )
            );
        }
    });

    return {
        init: function () {
            var pages = ['http://www.baidu.com/', 'http://www.taobao.com/', 'http://www.qq.com/'];
            ReactDOM.render(React.createElement(PageSlides, { data: pages }), document.body);

            setTimeout(function () {
                pages.shift();
                ReactDOM.render(React.createElement(PageSlides, { data: pages }), document.body);
            }, 2000);
        }
    };
});