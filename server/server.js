const express = require("express");

const bodyParser = require("body-parser");

const server = express();

const cors = require("cors");
server.use(cors({
    origin: ["http://127.0.0.1:8080", "http://localhost:8080"], credentials: true
}));

server.listen(3000);

server.use(bodyParser.urlencoded({
    extended: false
}));


//头像插件
// const gravatar =require("gravatar")


//如何验证token

//引入passport
const passport = require("passport");
//初始化
server.use(passport.initialize());




const adminRouter = require("./routes/admin");


server.use("/admin", adminRouter);

const articleRouter = require("./routes/article");


server.use("/article", articleRouter);


const userRouter = require("./routes/user");


server.use("/user", userRouter);

const routeRouter = require("./routes/route");


server.use("/route", routeRouter);
