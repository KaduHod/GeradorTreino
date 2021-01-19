async function f1() {
    return 'f1';
  }
  
  let v1 = f1();
  
  console.log(v1); // Prints Promise { 'f1' }
  
  f1().then(v => {
    console.log(v); // Prints 'f1'
  });