require('dotenv').config();

const { WAITTIME_BETWEEN_CALLS } = process.env;
const waitBetweenCalls =  Number(WAITTIME_BETWEEN_CALLS);

const wait = (seconds) => {
  seconds === 0 ? 1 : seconds;
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(seconds);
    }, seconds*1000);
  });
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await wait (waitBetweenCalls);
    await callback(array[index], index, array);
  }
}

module.exports = asyncForEach;
