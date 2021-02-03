// class Clock {
//     constructor() {
//         let date = new Date();
//         this.hours = date.getHours();
//         this.minutes = date.getMinutes();
//         this.seconds = date.getSeconds();

//         let clock = this


//         this.printTime();
//         setInterval(function() {
//             clock._tick();
//         }, 1000);
//     }

//     printTime() {
//         let time = `${this.hours}:${this.minutes}:${this.seconds}`;
//         console.log(time);
//     }

//     _tick() {
//         this.seconds++;
//         this.printTime();
//     }
// }

// // const clock = new Clock();

// function addNumbers(sum, numsLeft, completionCallback) {
//     const readline = require('readline');

//     const reader = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout
//     });

//     if (numsLeft > 0) {
//         reader.question('Enter a number:', function(answer) {
//             let int = parseInt(answer)
//             sum += int
//             console.log(sum)
//             numsLeft -= 1
//             addNumbers(sum, numsLeft, completionCallback)
//         });
//     } else if (numsLeft === 0) {
//         completionCallback(sum)
//     }
// }

// // addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));

// const readline = require('readline');

// const reader = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// function askIfGreaterThan(el1, el2, callback) {

//     reader.question(`Is ${el1} bigger than ${el2}? `, function(answer) {
//         if (answer ===  "yes") {
//             callback(true)
//         } else if (answer === "no") {
//             callback(false)
//         }
//     })
// }

// function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {

//     if (i < arr.length - 1) {
//         askIfGreaterThan(arr[i], arr[i+1], function(isGreaterThan) {
//             if (isGreaterThan) {
//                 [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
//                 madeAnySwaps = true;
//                 console.log(arr)
//             } else {
//                 madeAnySwaps = false;
//             }

//             i++;

//             innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop)
//         });
//     } else if (i == (arr.length - 1)) {
//         outerBubbleSortLoop(madeAnySwaps)
//     };
// }

// function absurdBubbleSort(arr, sortCompletionCallback) {
//     function outerBubbleSortLoop(madeAnySwaps) {
//         if (madeAnySwaps === true) {
//             innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
//         } else {
//             sortCompletionCallback(arr);
//         }
//     }
//     outerBubbleSortLoop(true);
// }

// absurdBubbleSort([3, 2, 1], function (arr) {
//     console.log("Sorted array: " + JSON.stringify(arr));
//     reader.close();
// });

Function.prototype.myBind = function(context) {
//Function.prototype.myBind = (context) => { WILL NOT WORK

    return () => {
        this.apply(context);
    }
}

// class Lamp {
//     constructor() {
//         this.name = "a lamp";
//     }
// }

// const turnOn = function () {
//     console.log("Turning on " + this.name);
// };

// const lamp = new Lamp();

// const boundTurnOn = turnOn.bind(lamp);
// const myBoundTurnOn = turnOn.myBind(lamp);

// myBoundTurnOn();

Function.prototype.myThrottle = function(interval) {
    let tooSoon = false;

    if(!tooSoon) {
        tooSoon = true;
        setTimeout(function() {
            tooSoon = false;
        }, interval);
    }

    this()
}

class Neuron {
    fire() {
        console.log("Firing!");
    }
}

const neuron = new Neuron();
// When we create a new Neuron,
// we can call #fire as frequently as we want

// The following code will try to #fire the neuron every 10ms. Try it in the console:
// const interval = setInterval(() => {
//     neuron.fire();
// }, 10);

// You can use clearInterval to stop the firing:
// clearInterval(interval);

// Using Function#myThrottle, we should be able to throttle
// the #fire function of our neuron so that it can only fire
// once every 500ms:

neuron.fire = neuron.fire.myThrottle(500);

const interval = setInterval(() => {
    neuron.fire();
}, 10);

// This time, if our Function#myThrottle worked correctly,
// the Neuron#fire function should only be able to execute
// every 500ms, even though we're still trying to invoke it
// every 10ms!

// If we want this behavior for ALL neurons, we can do the same logic in the constructor:

// class Neuron {
//     constructor() {
//         this.fire = this.fire.myThrottle(500);
//     }

//     fire() {
//         console.log("Firing!");
//     }
// }