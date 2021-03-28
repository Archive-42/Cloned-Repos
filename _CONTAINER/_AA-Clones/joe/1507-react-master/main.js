var articles = [
    {
        title: 'How to use React',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consectetur dolores est facere in ipsam iste nam natus nemo non, nostrum nulla praesentium quae quam quos saepe sapiente veniam voluptate.',
        date: '5-6-2017'
    },
    {
        title: 'How to use other stuff',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consectetur dolores est facere in ipsam iste nam natus nemo non, nostrum nulla praesentium quae quam quos saepe sapiente veniam voluptate.',
        date: '5-8-2017'
    },
    {
        title: 'How to use javascript',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam consectetur dolores est facere in ipsam iste nam natus nemo non, nostrum nulla praesentium quae quam quos saepe sapiente veniam voluptate.',
        date: '5-9-2017'
    }
];

var App = React.createClass({
    render: function () {
        return (
            <div id="the-app">
                <h1>Joe's Site</h1>
                <Blog />
            </div>
        );
    }
});

var getRandom = function (a) {
    return a[Math.floor(Math.random() * a.length)];
};

var Blog = React.createClass({
    getInitialState: function () {
        return {
            currentArticle: articles[0]
        };
    },
    componentDidMount: function () {
        var self = this;
        setInterval(function () {
            self.setState({ currentArticle: getRandom(articles) });
        }, 1000);
    },
    render: function () {
        return (
            <div id="the-blog">
                <BlogArticle article={this.state.currentArticle} />
            </div>
        );
    }
});

var BlogArticle = React.createClass({
    render: function () {
        return (
            <div className="blog-article">
                <h1>{this.props.article.title}</h1>
                <p>{this.props.article.body}</p>
                <h5>{this.props.article.date}</h5>
            </div>
        );
    }
});

React.renderToString(<App />, document.body);