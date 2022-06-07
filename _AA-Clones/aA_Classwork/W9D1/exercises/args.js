// function sum() {
//     let arr = Array.from(arguments);
//     let total = 0;
//     arr.forEach(function(num) {
//         total += num;
//         // debugger
//     })

//     console.log(total);
// }

// function sum(...args) {
//     let arr = args
//     // debugger
//     let total = 0;
//     arr.forEach(num => {
//         total += num;
//     })

//     console.log(total);
// }

// sum(1, 2, 3, 4);
// sum(1, 2, 3, 4, 5);

Function.prototype.myBind = function() {
    let args = Array.from(arguments);
    let that = this;
    return function() {
        let args2 = Array.from(arguments);
        that.apply(args[0], args2);
    }
}

Function.prototype.myBind2 = function(...args) {
    let that = this;
    return function (...args2) {
        that.apply(args[0], args.slice(1).concat(args2));
    }
}


class Cat {
    constructor(name) {
        this.name = name;
    }

    says(sound, person) {
        console.log(`${this.name} says ${sound} to ${person}!`);
        return true;
    }
}

class Dog {
    constructor(name) {
        this.name = name;
    }
}

// const markov = new Cat("Markov");
// const pavlov = new Dog("Pavlov");

// // markov.says("meow", "Ned");
// // // Markov says meow to Ned!
// // // true

// // // bind time args are "meow" and "Kush", no call time args
// markov.says.myBind2(pavlov, "meow", "Kush")();
// // // Pavlov says meow to Kush!
// // true

// markov.says.myBind2(pavlov)("meow", "a tree");
// // Pavlov says meow to a tree!
// // true

// // bind time arg is "meow", call time arg is "Markov"
// markov.says.myBind2(pavlov, "meow")("Markov");
// // // Pavlov says meow to Markov!
// // // true

// // // no bind time args (other than context), call time args are "meow" and "me"
// const notMarkovSays = markov.says.myBind2(pavlov);
// notMarkovSays("meow", "me");

// function curriedSum(numArgs) {
//     let numbers = [];
    
//     function _curriedSum(number) {
//         numbers.push(number);
//         if (numbers.length === numArgs) {
//             let total = 0
//             numbers.forEach(num => {
//                 total += num;
//             });
//             return total;
//         }
//         return _curriedSum;
//     }
//     return _curriedSum
// }



// const sum = curriedSum(4);
// console.log(sum(5)(30)(20)(1)); 

// Function.prototype.curry = function(numArgs) {
//     let that = this;
//     const arr = [];
    
//     function _curriedSum(number) {
//         arr.push(number);
//         debugger
//         if (arr.length === numArgs) {
//             return that.apply(null, arr);
//         } else {return _curriedSum};
//     };
//     return _curriedSum
// }

Function.prototype.curry = function(numArgs) {
    let that = this;
    const arr = [];

    return function _curriedSum(number) {
        arr.push(number);
        debugger
        if (arr.length === numArgs) {
            return that(...arr);
        } else {return _curriedSum};
    };
    // return _curriedSum
}




function sumThree(num1, num2, num3) {
    console.log(num1 + num2 + num3);
}
sumThree.curry(3)(4)(20)(6); // == 30

// sumThree(4, 20, 6); // == 30

// you'll write `Function#curry`!
// let f1 = sumThree.curry(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
// f1 = f1(4); // [Function]
// f1 = f1(20); // [Function]
// f1 = f1(6); // = 30

// or more briefly: