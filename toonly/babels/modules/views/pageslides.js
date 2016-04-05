/**
 * Created by caoyouxin on 4/5/16.
 */
define(['react', 'react-dom'], function (React, ReactDOM) {
    var PageSlides = React.createClass({
        render: function () {

            var lis = this.props.data.map(function (url) {
                return (
                    <li className="pageslide" data-rel={url}>
                        <iframe src={url} frameborder="0"></iframe>
                    </li>
                );
            });

            return (
                <div>
                    <ul className="pageslides animation">
                        {lis}
                    </ul>
                    <div className="pager">
                        <svg>
                            <path d="M10 0 L70 50 L70 0" />
                        </svg>
                    </div>
                    <div className="pager">
                        <svg>
                            <path d="M10 0 L10 50 L70 0" />
                        </svg>
                    </div>
                </div>
            );
        }
    });

    return {
        init: function () {
            var pages = ['http://www.baidu.com/', 'http://www.taobao.com/', 'http://www.qq.com/'];
            ReactDOM.render(<PageSlides data={pages} />, document.body);

            setTimeout(function () {
                pages.shift();
                ReactDOM.render(<PageSlides data={pages} />, document.body);
            }, 2000);
        }
    };
});