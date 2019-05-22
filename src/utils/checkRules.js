export function isNum(value) {


  if (isNaN(value)) {
    return -1;
  }
  else if (typeof (value) == 'string') {
    value = value.split(".")[0];
    if (value.length == 1) { return 1; }
    else {
      let reg = /^[1,9]\d{0,}$/;
   
      return reg.test(value)?1:0;
    }
  }
  else {
    return 1
  }
}