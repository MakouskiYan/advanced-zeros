module.exports = function getZerosCount(number, base) {
  var res;
  var obj = {};
  // check for prime numbers for division
  function isPrime(num) {
    for (var i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return num !== 1 && num !== 0;
  }
  // this function makes an object where key is prime number and value is it's power
  function findNumbers(n) {
    var o = {};
    var r = n;
    var numbers = [];
    var i = 2;

    while (r > 1) {
      if (r % i === 0) {
        numbers.push(i);
        r = r / i;
      } else {
        i++;
      }
    }
    for (var i = 0; i < numbers.length; i++) {
      o[numbers[i]] ? o[numbers[i]] += 1 : o[numbers[i]] = 1;
    }
    // make the object of number and power
    return o;
  }
  //find how many times each prime number with power goes into number;
  // we need this information to find the min result and this result will be our answer
  function findZeros(num, d) {
    var zeros = 0;
    var i = 1;
    while (Math.floor(num / Math.pow(d, i)) > 0) {
      zeros += Math.floor(num / Math.pow(d, i))
      i++;
    }
    // if prime number with power more than 1 we need to divide the result zeros on it's power!
    return (obj[d] == 1) ? zeros : Math.floor(zeros / obj[d]);
  }
  
  // if the base is prime number, the result will be findZeros(number,base) without checking 
  // the minimum result in the array of division number on primes :)
  if (isPrime(base)) {
    obj[base] = 1;
    res = findZeros(number, base);
  }
  else {
    obj = findNumbers(base);
    var arr = [];
    for (v in obj) {
      arr.push(findZeros(number, v));
    }
    res = Math.min.apply(Math, arr);
  }
  return res;
}