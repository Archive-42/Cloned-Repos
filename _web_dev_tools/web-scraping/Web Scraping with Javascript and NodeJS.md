# Web Scraping with Javascript and NodeJS

> Learn web scraping with Javascript and NodeJS with this step-by-step tutorial. We will see the different ways to scrape the web in Javascript through lots of example.

![Web Scraping with Javascript](https://d33wubrfki0l68.cloudfront.net/212de31150b614ca36cfcdeada7c346cacb27551/080fb/blog/web-scraping-javascript/javascript_web_scraping2.jpg)

Javascript has become one of the most popular and widely used languages due to the massive improvements it has seen and the introduction of the runtime known as NodeJS. Whether it's a web or mobile application, Javascript now has the right tools. This article will explain how the vibrant ecosystem of NodeJS allows you to scrape the web efficiently to meet most of your requirements.

### Prerequisites

This post is primarily aimed at developers who have some level of experience with Javascript. If you have a firm understanding of Web Scraping but have no experience with Javascript, this post could still prove useful.

*   ✅ A background in Javascript
*   ✅ Experience using the DevTools to extract selectors of elements
*   ✅ Some experience with ES6 Javascript (Optional)

> ⭐ Make sure to check the resources topic to learn more!

### Outcomes

By reading this post will be able to:

*   Have a functional understanding of NodeJS
*   Use multiple HTTP clients to assist the web scraping process
*   Utilize multiple modern and battle-tested libraries to scrape the web

Understanding NodeJS: A brief introduction
------------------------------------------

Javascript is a simple and modern language that was initially created to add dynamic behavior to websites inside the browser. When a website is loaded, Javascript is run by the browser's Javascript Engine and converted into a bunch of code that the computer can understand. For Javascript to interact with your browser, the browser provides a Runtime Environment (document, window, etc.).

This means that Javascript is not the kind of programming language that can interact with or manipulate the computer or it's resources directly. In a web server, for example, the server must be capable of interacting with the file system to maybe read a file or store a record in a database.

Introducing NodeJS, the crux of the idea was to make Javascript capable of running not only client-side but also server-side. To make this possible, Ryan Dahl a skilled developer literally took Google Chrome's v8 Javascript Engine and embedded it with a C++ program which was named Node. So NodeJS is a runtime environment that allows an application written in Javascript to make it possible to be run at on a server as well.

As opposed to how most languages like C or C++ deal with concurrency by employing multiple threads, NodeJS makes use of a single main thread and utilizes it to perform tasks in a Non-Blocking manner with the help of the [Event Loop](https://nodejs.org/fa/docs/guides/event-loop-timers-and-nexttick/).

Putting up a simple web server is fairly simple as shown below:

    const http = require('http');
    const PORT = 3000;
    
    const server = http.createServer((req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello World');
    });
    
    server.listen(port, () => {
      console.log(`Server running at PORT:${port}/`);
    });
    

If you have NodeJS installed and you run the above code by typing(without the < and >) in `node <YourFileNameHere>.js` and open up your browser and navigate to `localhost:3000`, you will see some text saying “Hello World”. NodeJS is highly ideal for applications that are I/O intensive.

HTTP clients: querying the web
------------------------------

HTTP clients are tools capable of sending a request to a server and then receive a response from it. Almost every tool that will be discussed uses an HTTP client under the hood, to query the server of the website that you will attempt to scrape.

### Request

Request is one of the most widely used HTTP clients in the Javascript ecosystem, however, though currently, the author of the Request library has officially declared that it is deprecated. This does not mean it is unusable, quite a lot of libraries still use it, and it is every bit worth using. It is fairly simple to make an HTTP request with Request:

    const request = require('request')
    request('https://www.reddit.com/r/programming.json', function (
      error,
      response,
      body
    ) {
      console.error('error:', error)
      console.log('body:', body)
    })
    

You can find the Request library at [Github](https://github.com/request/request), and installing it is as simple as running `npm install request`. You can also find the deprecation notice and what this means [here](https://github.com/request/request/issues/3142). If you don't feel safe about the fact that this library is deprecated, there's more down below!

### Axios

Axios is a promise-based HTTP client that runs both in the browser and NodeJS. If you use Typescript, then axios has you covered with built-in types. Making an HTTP request with Axios is straight forward, it ships with promise support by default as opposed to utilizing callbacks in Request:

    const axios = require('axios')
    
    axios
    	.get('https://www.reddit.com/r/programming.json')
    	.then((response) => {
    		console.log(response)
    	})
    	.catch((error) => {
    		console.error(error)
    	});
    

If you fancy the async/await syntax sugar for the Promises API, then you can do that too but since top level await is still at [stage 3](https://github.com/tc39/proposal-top-level-await), we will have to make use of an Async Function instead:

    async function getForum() {
    	try {
    		const response = await axios.get(
    			'https://www.reddit.com/r/programming.json'
    		)
    		console.log(response)
    	} catch (error) {
    		console.error(error)
    	}
    }
    

And all you have to do is call `getForum`! You can find Axios library at [Github](https://github.com/axios/axios) and installing Axios is as simple as `npm install axios`.

### Superagent

Much like Axios, Superagent is another robust HTTP client that has support for promises and the async/await syntax sugar. It has a fairly straightforward API like Axios, but Superagent has more dependencies and is less popular.

Regardless, making an HTTP request with Superagent using promises, async/await or callbacks looks like this:

    const superagent = require("superagent")
    const forumURL = "https://www.reddit.com/r/programming.json"
    
    // callbacks
    superagent
    	.get(forumURL)
    	.end((error, response) => {
    		console.log(response)
    	})
    
    // promises
    superagent
    	.get(forumURL)
    	.then((response) => {
    		console.log(response)
    	})
    	.catch((error) => {
    		console.error(error)
    	})
    
    // promises with async/await
    async function getForum() {
    	try {
    		const response = await superagent.get(forumURL)
    		console.log(response)
    	} catch (error) {
    		console.error(error)
    	}
    }
    

You can find the Superagent library at [Github](https://github.com/visionmedia/superagent) and installing Superagent is as simple as `npm install superagent`.

> For the upcoming few web scraping tools, Axios will be used as the HTTP client.

Note that there are other great HTTP clients like [node-fetch](https://www.scrapingbee.com/blog/node-fetch/) that are great for web scraping!

Regular Expressions: The hard way
---------------------------------

The simplest way to get started with web scraping without any dependencies is to use a bunch of regular expressions on the HTML string that you receive by querying a webpage using an HTTP client, but there is a big tradeoff. Regular Expressions aren't as flexible and quite a lot of people both professionals and amateurs struggle with writing the correct regular expression.

For complex web scraping, the regular expression can also get out of hand very quickly. With that said, let's give it a go. Say there's a label with some username in it, and we want the username, this is similar to what you'd have to do if you relied on regular expressions

    const htmlString = '<label>Username: John Doe</label>'
    const result = htmlString.match(/<label>(.+)<\/label>/)
    
    console.log(result[1], result[1].split(": ")[1])
    // Username: John Doe, John Doe
    

In Javascript, `match()` usually returns an array with everything that matches the regular expression. The 2nd element(in index 1) you will find the `textContent` or the `innerHTML` of the `<label>`tag which is what we want. But this result contains some unwanted text ( “Username: “) which has to be removed.

As you can see, for a very simple use case the steps and the work to be done are unnecessarily high. This is why you should rely on something like an HTML parser, which we will talk about next.

Cheerio: Core JQuery for traversing the DOM
-------------------------------------------

Cheerio is an efficient and light library which allows you to use the rich and powerful API of JQuery on the server-side. If you have used JQuery previously then you will feel right at home with Cheerio, it removes all the DOM inconsistencies and browser-related features and exposes an efficient API to parse and manipulate the DOM.

    const cheerio = require('cheerio')
    const $ = cheerio.load('<h2 class="title">Hello world</h2>')
    
    $('h2.title').text('Hello there!')
    $('h2').addClass('welcome')
    
    $.html()
    // <h2 class="title welcome">Hello there!</h2>
    
    

As you can see, using Cheerio is very similar to how you'd use JQuery.

However, though it does not work the same way that a web browser works, which means it does not:

*   Render any of the parsed or manipulated DOM elements
*   Apply CSS or load any external resource
*   Execute javascript

So if the website or web application that you are trying to crawl is Javascript heavy (for example a Single Page Application) then Cheerio is not your best bet, you might have to rely on some of the other options that are talked about later on.

To demonstrate the power of Cheerio, we will attempt to crawl the [r/programming](https://www.reddit.com/r/programming/) forum in Reddit, we will attempt to get a list of post names.

First, install Cheerio and axios by running the following command: `npm install cheerio axios`.

Then create a new file called `crawler.js` and copy/paste the following code:

    const axios = require('axios');
    const cheerio = require('cheerio');
    
    const getPostTitles = async () => {
    	try {
    		const { data } = await axios.get(
    			'https://old.reddit.com/r/programming/'
    		);
    		const $ = cheerio.load(data);
    		const postTitles = [];
    
    		$('div > p.title > a').each((_idx, el) => {
    			const postTitle = $(el).text()
    			postTitles.push(postTitle)
    		});
    
    		return postTitles;
    	} catch (error) {
    		throw error;
    	}
    };
    
    getPostTitles()
    .then((postTitles) => console.log(postTitles));
    

`getPostTitles()` is an asynchronous function that will crawl the old reddit's r/programming forum. First the HTML of the website is obtained using a simple HTTP GET request with the axios HTTP client library, then the html data is fed into Cheerio using the `cheerio.load()` function.

Then with the help of the Dev Tools of the browser, you can obtain the selector that is capable of targetting all the postcards generally. If you've used JQuery, the `$('div > p.title > a')` must be very familiar. This will get all the posts, since you only want the title of each post individually, you have to loop through each post which is done with the help of the `each()` function.

To extract the text out of each title, you must fetch the DOM element with the help of Cheerio (`el` refers to the current element). Then calling `text()` on each element will give you the text.

Now you can pop open a terminal and run `node crawler.js` and then you'll see an array of about 25 or 26 different post titles, it'll be quite long. While this is quite a simple use case, it demonstrates the simple nature of the API provided by Cheerio.

If your use case requires the execution of Javascript and the loading of external sources, then the following few options will be helpful.

JSDOM: The DOM for Node
-----------------------

JSDOM is a pure Javascript implementation of the Document Object Model to be used in NodeJS, as mentioned previously the DOM is not available to Node, so JSDOM is the closest you can get. It more or less emulates the browser.

Since a DOM is created, it is possible to interact with the web application or website you want to crawl programmatically, so something like clicking on a button is possible. If you are familiar with manipulating the DOM, then using JSDOM will be quite straightforward.

    const { JSDOM } = require('jsdom')
    const { document } = new JSDOM(
    	'<h2 class="title">Hello world</h2>'
    ).window
    const heading = document.querySelector('.title')
    heading.textContent = 'Hello there!'
    heading.classList.add('welcome')
    
    heading.innerHTML
    // <h2 class="title welcome">Hello there!</h2>
    
    

As you can see, JSDOM creates a DOM and then you can manipulate this DOM with the same methods and properties you would use while manipulating the browser DOM.

To demonstrate how you could use JSDOM to interact with a website, we will get the first post of the Reddit r/programming forum and upvote it, then we will verify if the post has been upvoted.

Start by running the following command to install jsdom and axios: `npm install jsdom axios`

Then make a file by the name of `crawler.js` and copy/paste the following code:

    const { JSDOM } = require("jsdom")
    const axios = require('axios')
    
    const upvoteFirstPost = async () => {
      try {
        const { data } = await axios.get("https://old.reddit.com/r/programming/");
        const dom = new JSDOM(data, {
          runScripts: "dangerously",
          resources: "usable"
        });
        const { document } = dom.window;
        const firstPost = document.querySelector("div > div.midcol > div.arrow");
        firstPost.click();
        const isUpvoted = firstPost.classList.contains("upmod");
        const msg = isUpvoted
          ? "Post has been upvoted successfully!"
          : "The post has not been upvoted!";
    
        return msg;
      } catch (error) {
        throw error;
      }
    };
    
    upvoteFirstPost().then(msg => console.log(msg));
    

`upvoteFirstPost()` is an asynchronous function that will obtain the first post in r/programming and then upvote it. To do this, axios sends an HTTP GET request to fetch the HTML of the URL specified. Then a new DOM is created by feeding the HTML that was fetched earlier. The JSDOM constructor accepts the HTML as the first argument and the options as the second, the 2 options that have been added perform the following functions:

*   **runScripts**: When set to “dangerously”, it allows the execution of event handlers and any Javascript code. If you do not have a clear idea on the credibility of the scripts that your application will run, then it is best to set runScripts to “outside-only”, which attaches all the Javascript specification provided globals to the `window` object thus preventing any script being executed on the _inside_.
*   **resources**: When set to “usable”, it allows the loading of any external script declared using the `<script>` tag (ex: the JQuery library fetched from a CDN)

Once the DOM has been created, you would use the same DOM methods to get the first post's upvote button and then click on it. To verify if it has indeed been clicked, you could check the `classList` for a class called `upmod`. If this class exists in `classList`, then a message is returned.

Now you can pop open a terminal and run `node crawler.js` and then you'll see a neat string that will tell if the post has been upvoted or not. While this example use case is trivial, you could build on top of this to create something powerful for example, a bot that goes around upvoting a particular user's posts.

If you dislike the lack of expressiveness in JSDOM, and if your crawling relies heavily on many such manipulations or if there is a need to recreate a lot of different DOMs, then the following options will be a better match.

Puppeteer: The headless browser
-------------------------------

Puppeteer, as the name implies, allows you to manipulate the browser programmatically just like how a puppet would be manipulated by its puppeteer. It achieves this by providing a developer with a high-level API to control a headless version of Chrome by default and can be configured to run non-headless.

![puppeteer-hierachy](https://user-images.githubusercontent.com/746130/40333229-5df5480c-5d0c-11e8-83cb-c3e371de7374.png) _Taken from the Puppeter Docs ([Source](https://github.com/puppeteer/puppeteer/blob/v3.0.2/docs/api.md))_

Puppeteer is particularly more useful than the aforementioned tools because it allows you to crawl the web as if a real person were interacting with a browser. This opens up a few possibilites that weren't there before:

*   You can get screenshots or generate PDFs of pages.
*   You could crawl a Single Page Application and generate pre-rendered content.
*   Automate a lot of different user interactions like keyboard inputs, form submissions, navigation, etc.

It could also play a big role in a lot of other tasks outside the scope of web crawling like UI testing, assist performance optimization, etc.

It's quite often that you would want to take screenshots of websites, perhaps to get to know about a competitor's product catalog, puppeteer can be used to do this. To start, you must install puppeteer, to do so run the following command: `npm install puppeteer`

This will download a bundled version of Chromium which takes up about 180 MB to 300 MB depending on your Operating System. If you wish to disable this and point puppeteer to an already downloaded version of chromium, you must set a few [environment variables](https://github.com/puppeteer/puppeteer/blob/v3.0.2/docs/api.md#environment-variables). This, however, is not recommended, if you truly wish to avoid downloading Chromium and puppeteer for this tutorial, you can rely on the [puppeteer playground](https://try-puppeteer.appspot.com/).

Let's attempt to get a screenshot and a PDF of the r/programming forum in Reddit, create a new file called `crawler.js` and then copy/paste the following code:

    const puppeteer = require('puppeteer')
    
    async function getVisual() {
    	try {
    		const URL = 'https://www.reddit.com/r/programming/'
    		const browser = await puppeteer.launch()
    		const page = await browser.newPage()
    
    		await page.goto(URL)
    		await page.screenshot({ path: 'screenshot.png' })
    		await page.pdf({ path: 'page.pdf' })
    
    		await browser.close()
    	} catch (error) {
    		console.error(error)
    	}
    }
    
    getVisual()
    

`getVisual()` is an asynchronous function that will take a screenshot and a pdf of the value assigned to the `URL` variable. To start, an instance of the browser is created by running `puppeteer.launch()` then a new page is created. This page can be thought of like a tab in a regular browser. Then by calling `page.goto()` with the `URL` as the parameter, the page that was created earlier will be directed to the URL specified. Finally, the browser instance is destroyed along with the page.

Once that is done and the page has finished loading, a screenshot and a pdf will be taken using `page.screenshot()` and `page.pdf()` respectively. You could listen to the javascript load event and then perform these actions too, which is highly recommended at a production level.

To run the code type in `node crawler.js` to the terminal, and after a few seconds, you will notice that 2 files by the names `screenshot.jpg` and `page.pdf` have been created.

Nightmare: An alternative to Puppeteer
--------------------------------------

Nightmare is also a high-level browser automation library like Puppeteer, that uses Electron but is said to be roughly twice as faster as it's predecessor PhantomJS and more modern.

If you dislike Puppeteer in some way or feel discouraged by the size of the Chromium bundle then Nightmare is an ideal choice. To start, installghtmare library by running the following command: `npm install nightmare`

Then once nightmare has been downloaded, we will use it to find ScrapingBee's website through the Google Search engine. To do so, create a file called `crawler.js` and then copy/paste the following code into it:

    const Nightmare = require('nightmare')
    const nightmare = Nightmare()
    
    nightmare
    	.goto('https://www.google.com/')
    	.type("input[title='Search']", 'ScrapingBee')
    	.click("input[value='Google Search']")
    	.wait('#rso > div:nth-child(1) > div > div > div.r > a')
    	.evaluate(
    		() =>
    			document.querySelector(
    				'#rso > div:nth-child(1) > div > div > div.r > a'
    			).href
    	)
    	.end()
    	.then((link) => {
    		console.log('Scraping Bee Web Link': link)
    	})
    	.catch((error) => {
    		console.error('Search failed:', error)
    	})
    

Firstly a Nighmare instance is created, then this instance is directed to the Google Search Engine by calling `goto()` once it has loaded, the search box is fetched using it's selector and then the value of the search box (an input tag) is changed to “ScrapingBee”. Once that is done, the search form is submitted by clicking on the “Google Search” button. Then Nightmare is told to wait till the first link has loaded, and once it has, a DOM method will be used to fetch the value of the `href` attribute of the anchor tag that contains the link.

Finally, once everything is complete, the link is printed to the console. To run the code, type in `node crawler.js` to your terminal.

Summary
-------

That was a long read! But now you understand the different ways to use NodeJS and it's rich ecosystem of libraries to crawl the web any way you want. To wrap up, you learned:

*   ✅ **NodeJS** is a Javascript _runtime_ to allow Javascript to be run in the _server-side_. It has a **non-blocking** nature thanks to the Event Loop.
*   ✅ **HTTP Clients** such as _Axios_, _Superagent_, [Node fetch](https://www.scrapingbee.com/blog/node-fetch/) and _Request_ are used to send HTTP requests to a _server_ and receive a response.
*   ✅ **Cheerio** abstracts the best out of _JQuery_ for the sole purpose of running it in the _server-side_ for web crawling but _does not execute Javascript_ code.
*   ✅ **JSDOM** creates a DOM per the standard _Javascript specification_ out of an HTML string and allows you to perform DOM manipulations on it.
*   ✅ **Puppeteer** and **Nightmare** are _high-level browser automation_ libraries, that allow you to _programmatically manipulate_ web applications as if a real person were interacting with it.

While this whole article tackles the main aspect of web scraping with NodeJS, it does not talk about web scraping without getting blocked.

If you want to learn how to do it, we have wrote this [complete guide](https://www.scrapingbee.com/blog/web-scraping-without-getting-blocked), and if you don't want to take care of this, you can always use our [web scraping API](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/).

Happy Scraping.

Resources
---------

Feel like reading more? Check these links out:

*   [NodeJS website](https://nodejs.org/en/about/) - Contains documentation and a lot of information on how to get started.
*   [Puppeteer docs](https://developers.google.com/web/tools/puppeteer) - Contains the API reference and getting started guides.
*   [ScrapingBee's Blog](https://www.scrapingbee.com/blog/) - Contains a lot of information on Web Scraping goodies on multiple platforms.


[Source](https://www.scrapingbee.com/blog/web-scraping-javascript/)