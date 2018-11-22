function sayHello(name) {
  return 'Hello ' + name;
}

var myName = 'Jose';
// window.myName => 'Jose'
// globla.myName => 'Jose'?

console.log(sayHello('Marco'));

console.log(sayHello('World'));

console.log(sayHello(myName));

// console.log(window);
// console.log(global);

