const EventEmitter = require('events');
const { expect } = require('chai');
const { getBodyFromRequest } = require('../get-body-from-request');
describe("The getBodyFromRequest function", () => {
  let fakeReq = null;
  let body = null;

  beforeEach(() => {
    fakeReq = new EventEmitter();

  });

  it('returns an empty string for no body ("GET" Request)', done => {
    const body = getBodyFromRequest(fakeReq);
    fakeReq.emit('end');
    body
      .then(el => {
        if (el === '') {
          done();
        } else {
          done(`Failed. Got "${el}"`);
        }
      });
  });

  it('returns the data read from the stream ("POST" Request)', done => {
    // const body = getBodyFromRequest(fakeReq);
    const data1 = 'This is some';
    const data2 = ' data from the browser';

    getBodyFromRequest(fakeReq)
      .then(el => {
        if (el === (data1 + data2)) {
          done();
        } else {
          done(`Failed. Got "${el}"`)
        };
      });

    fakeReq.emit('data', data1);
    fakeReq.emit('data', data2);
    fakeReq.emit('end');
  });
});
