export const createMyTimer = ()=>{
  let timer
  return (func,time)=>{
    if(timer) clearTimeout(timer)
    timer = setTimeout(func, time)
  }
}

export const createThrottling = (func, ms)=>{

  let isThrottled = false,
    savedArgs,
    savedThis;

  return function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return new Promise(res=>"im wait")
    }

    let res = func.apply(this, arguments); // (1)

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
    return res
  }
}