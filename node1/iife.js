// for (var index = 0; index <= 5; index++) {
//   setTimeout(function(){
//     console.log('index: ' + index);
//   }, index*1000);
// }

for (var index = 0; index <= 5; index++) {
  (function(index) {
    setTimeout(function(){
      console.log('index: ' + index);
    }, index*1000);
  })(index);
}