// import request from "../utils/request";

// export function GetUser(){
//   return request({
//     url:"user/userList",
//     method:"get"
//   })
// }


import {get} from "../utils/request"

class UserModel{

GetUser(){
  
  return get({
    url:"user/userList",
  })
}

}

export default new UserModel()