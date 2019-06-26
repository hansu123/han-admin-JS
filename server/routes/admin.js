const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//token
const jwt = require("jsonwebtoken")
const passport=require("passport")

mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });


const Schema = mongoose.Schema;

var mySchema = new Schema({
    name: String,
    password: String,
    email: String,
    identity: String

})

var AdminModel = mongoose.model("admintors", mySchema);


router.post("/regist", (req, res) => {

    let { name, password, email ,identity} = req.body;

    AdminModel.find({ name }).then((result) => {

        if (result.length > 0) { res.send({ code: -1, message: "用户名已存在" }) }

        else {

            let admintor = new AdminModel({ name, email, password,identity });
            admintor.save().then((result)=>{
                res.send({message:"ok"});
            });

        }
    });

})


router.post("/login", (req, res) => {

    
    console.log(req.body)
    let { name, password } = req.body;

    let result = AdminModel.find({ name }).then((result) => {


        if (result.length > 0) {

           AdminModel.find({name, password }).then((result)=>{

            let {identity}=result[0];

            console.log(identity)

            if (result.length > 0) {
                const secret = 'secret'
                //生成token并返回token(令牌)
                const rule = { name, password,identity };
                let token = jwt.sign(rule, secret, { expiresIn: 3600 });
                res.send({ message:"ok", token:"Bearer "+token });
            }
            else { res.send({message:"error"}); }       
           })
        }
        else {
            res.send({message:"error"});
        }

    });

});

require("../config/passport")(passport);

router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{


res.send({message:"ok"})

})


//添加用户

router.post("/addUser",(req,res)=>{

console.log(req.body)
res.send({code:1,message:"ok"})


})




module.exports = router;




