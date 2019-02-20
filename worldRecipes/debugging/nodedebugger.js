let topSum = 0;

function changeTop(){
  topSum = 50;
  let foo = bar;
}

function addToTop(){
  topSum += 55;
}

changeTop();
addToTop();
addToTop();
console.log(topSum);