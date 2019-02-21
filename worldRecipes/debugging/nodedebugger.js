let topSum = 0;

function changeTop(){
  topSum = 50;
}

function addToTop(){
  topSum += 55;
}

changeTop();
addToTop();
addToTop();
console.log(topSum);