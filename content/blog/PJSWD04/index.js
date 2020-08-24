function red() {
  return new Promise(resolve => {
    console.log('red');
    setTimeout(() => {
      resolve(green());
    }, 2000);
  });
}

function green() {
  return new Promise(resolve => {
    console.log('green');
    setTimeout(() => {
      resolve(yellow());
    }, 3000);
  });
}

function yellow() {
  return new Promise(resolve => {
    console.log('yellow');
    setTimeout(() => {
      resolve(red());
    }, 1000);
  });
}

red();
