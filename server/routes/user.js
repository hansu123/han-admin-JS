const server = require("express")
const mongoose = require("mongoose")
const mySchema = mongoose.Schema;
let userSchema = new mySchema({
  date: String,
  name: String,
  identity: String,
  isOnline: Boolean

})

let userModel = mongoose.model("users", userSchema);

const router = server.Router();

//引入passport验证
const passport = require("passport");
require("../config/passport")(passport);


router.get("/userList", passport.authenticate("jwt", { session: false }), (req, res) => {
  console.log(1)
  userModel.find({}).then((data) => {
    res.send(data)
  })
})


router.get("/decList", (req, res) => {

  
  let data = {
    total: 10, list: [
      {Numbers:[3000,2500],NG1:2,NG2:0.9,Zero:0.5,CreateTime: "2019/4/23 11:48:26",CreateUser: "admin"},
      {Numbers:2113,NG1:2,NG2:1.1,Zero:0.7,CreateTime: "2019/4/23 11:48:26",CreateUser: "admin"},
      {Numbers:1980,NG1:1,NG2:2.6,Zero:0.2,CreateTime: "2019/4/23 11:48:26",CreateUser: "admin"},
      {Numbers:[3000,2500],NG1:21,NG2:0.6,Zero:"",CreateTime: "2019/4/23 11:48:26",CreateUser: "admin"},
      {Numbers:[3000,2500],NG1:23,NG2:0.7,Zero:0.5,CreateTime: "2019/4/23 11:48:26",CreateUser: "admin"},
      {Numbers:1000,NG1:65,NG2:0.6,Zero:0.5,CreateTime: "2019/4/23 11:48:26",CreateUser: "admin"},
      {Numbers:2376,NG1:11,NG2:0.2,Zero:0.5,CreateTime: "2019/4/23 11:48:26",CreateUser: "admin"},
      {Numbers:[3000,2500],NG1:19,NG2:0.8,Zero:0.5,CreateTime: "2019/4/23 11:48:26",CreateUser: "admin"},
      {Numbers:1777,NG1:76,NG2:0.6,Zero:"",CreateTime: "2019/4/23 11:48:26",CreateUser: "admin"},
      {Numbers:3678,NG1:0,NG2:1.2,Zero:"",CreateTime: "2019/4/23 11:48:26",CreateUser: "admin"},
    ]
  };

  // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(elem => {
  //   data.list.push({

  //     Numbers: (Math.ceil(Math.random() * 100)) % 2 == 0 ? [(Math.ceil(Math.random() * 1000 + 1500)), (Math.ceil(Math.random() * 1000 + 1500))] : (Math.ceil(Math.random() * 1000 + 1500)),
  //     NG1: (Math.ceil(Math.random() * 10) / 10),
  //     NG2: (Math.ceil(Math.random() * 8) / 10),
  //     Zero: (Math.ceil(Math.random() * 100)) % 2 == 0 ? "" : (Math.ceil(Math.random() * 10) / 10),
  //     CreateTime: "2019/4/23 11:48:26",
  //     CreateUser: "admin"

  //   })
  // })

  if (!Object.keys(req.query).length) {
    res.send(data)
  }

  else{
    console.log(req.query)
    let {NG1,NG2}=req.query;
    console.log(data)
    let newData=data.list.filter(elem=>
      elem.NG1==NG1&&elem.NG2==NG2
    )
    data.total=newData.length;
    data.list=newData;
    console.log(data)
    res.send(data)
  }


})




module.exports = router;