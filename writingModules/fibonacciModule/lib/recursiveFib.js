function recurciveFib(num){
  if(num === 0) return 0;
  if(num === 1) return 1;
  return recurciveFib(num - 1) + recurciveFib(num - 2);
}

module.exports = recurciveFib;