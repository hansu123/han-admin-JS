const express=require("express")
const router = express.Router()

const mongoose =require("mongoose")

const mySchema=mongoose.Schema;

const RouteSchema=new mySchema({
  identity:String,
  route: Array
})

const RouteModel=mongoose.model("routes",RouteSchema)


router.get("/routeList",(req,res)=>{

let {identity}=req.query

RouteModel.find({identity}).then((result)=>{
res.send(result[0].route)
}).catch((err)=>{
console.log(err)
})

})

module.exports=router