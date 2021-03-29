const should = require('should');
const nock = require('nock');
const fs = require('fs-extra');
const Scraper = require('../../../lib/scraper');
const proxyquire = require('proxyquire');

const testDirname = __dirname + '/.tmp';
const mockDirname = __dirname + '/mocks';
let scraper;

describe('Functional concurrent requests', function() {
	let maxConcurrentRequests, currentConcurrentRequests;

	beforeEach(function () {
		nock.cleanAll();
		nock.disableNetConnect();

		nock('http://example.com/').get('/').replyWithFile(200, mockDirname + '/index.html');
		nock('http://example.com/').get('/page1.html').delay(200).reply(200, 'ok');
		nock('http://example.com/').get('/page2.html').delay(200).reply(200, 'ok');
		nock('http://example.com/').get('/page3.html').delay(200).reply(200, 'ok');
		nock('http://example.com/').get('/page4.html').delay(200).reply(200, 'ok');
		nock('http://example.com/').get('/page5.html').delay(200).reply(200, 'ok');
		nock('http://example.com/').get('/page6.html').delay(200).reply(200, 'ok');

		const options = {
			urls: [ 'http://example.com/' ],
			directory: testDirname,
			subdirectories: null,
			recursive: true,
			sources: [],
			requestConcurrency: 1
		};

		const originalGet = require('../../../lib/request').get;

		const Scraper = proxyquire('../../../lib/scraper', {
			'./request': {
				get: ({url, referer}) => {
					currentConcurrentRequests++;
					if (maxConcurrentRequests < currentConcurrentRequests) {
						maxConcurrentRequests = currentConcurrentRequests;
					}

					return originalGet.call(null, {url, referer}).then(data => {
						currentConcurrentRequests--;
						return data;
					});
				}
			}
		});

		scraper = new Scraper(options);

		maxConcurrentRequests = 0;
		currentConcurrentRequests = 0;

		return scraper.scrape();
	});

	afterEach(function () {
		nock.cleanAll();
		nock.enableNetConnect();
		fs.removeSync(testDirname);
	});

	it('should have maximum concurrent requests == requestConcurrency option', () => {
		maxConcurrentRequests.should.be.belowOrEqual(1);
	});
});
