// using loop
var sum_to_n_a = function (n) {
  var sum = 0
  for (var i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// using formula
var sum_to_n_b = function(n) {
  return (n * (n + 1)) / 2;
};

// using recursion
var sum_to_n_c = function (n) {
  if (n <= 1) return n;
  return n + sum_to_n_c(n - 1);
};
