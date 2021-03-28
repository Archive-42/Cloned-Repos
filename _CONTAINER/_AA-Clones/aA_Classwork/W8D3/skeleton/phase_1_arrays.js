function logElement(el) {
  console.log(el);
};


Array.prototype.uniq = function() {
  result = {};
  for (i=0; i<this.length; i++) {
    if (result[this[i]] != null) {
      continue;
    } 
    else result[this[i]] = this[i];
  }
  let array = [];
  for (i in result) {
    array.push(result[i]);
  }
  return array;
}

  // let new_arr = [1, 2, 2, 3, 3, 3].uniq();
  // console.log(new_arr);

  Array.prototype.twoSum = function() {
    result = [];
    for (i = 0; i < this.length - 1; i++) {
      for (j = i + 1; j < this.length; j++) {
        if (this[i] + this[j] === 0) {
          result.push([i, j]);
        }
      }
    }
    return result; //return array where pair of elements sum to zero
  }

  // let test = [-1, 1, 0, 3, 1, 0];
  // console.log(test.twoSum());


  Array.prototype.transpose = function() {
    result = [];

    for (i = 0; i < this.length; i++) {
      sub_result = [];
      for (j = 0; j < this.length; j++) {
        sub_result.push(this[j][i]);
      }
      result.push(sub_result);
    }
    return result;
  }


  // let test = [
  //   [1, 2, 3],
  //   [4, 5, 6],
  //   [7, 8, 9]
  // ];
  // console.log(test.transpose());


  function logMe(el) {
    console.log(el);
  }

  Array.prototype.myEach = function(callback) {
    for (let i = 0; i < this.length; i++) {
      callback(this[i]);
    }
  }

  const arr = [1,2,3,4,5];
  // arr.myEach(logMe);

  function timesTwo(num) {
    return num * 2;
  }

  Array.prototype.myMap = function(callback) {

    const result = [];
    this.myEach(collect);

    function collect(el) {
      result.push(callback(el));
    }

    return result;
  }

  console.log(arr.myMap(timesTwo));


  // class Array
  //
  //   def myMap(&prc)
  //     result = []
  //     self.each do |el|
  //       result << prc.call(el)
  //     end
  //     result
  //   end
  //  
  // end

  Array.prototype.myReduce = function(callback, initialValue) {
    let result;
    initialValue === null ? result = 0 : result = initialValue;

    

    debugger

    this.myEach(collect);
    function collect(el) {
      result += callback(el);
    }

    return result;
  }

  console.log(arr.myReduce(, 25))