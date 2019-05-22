export function setToken(token){
  localStorage.setItem("eleToken", token);
}

export function getToken(){
  return localStorage.getItem("eleToken");
}

export function removeToken(){
  return localStorage.removeItem("eleToken");
}


export function setUserInfo(token){
  localStorage.setItem('roleInfo', JSON.stringify(token));
}

export function getUserInfo(){
  return localStorage.getItem('roleInfo');
}

