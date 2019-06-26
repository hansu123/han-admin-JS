const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");

const mySchema = mongoose.Schema;

let articleSchema = new mySchema({
    author: String,
    title: String,
    summary: String,
    cate: String,
    content: String,
    cover_img: String,
    n_look: Number,
    n_like: Number,
    n_comment: Number,
    postTime: String
});


let articleModel = mongoose.model("articles", articleSchema);


const multer = require("multer");
const fs = require("fs");

const upload = multer({ dest: "static/upload" });



//引入passport验证
const passport = require("passport");
require("../config/passport")(passport);

router.get("/articleList", passport.authenticate("jwt", { session: false }), (req, res) => {

    let params = req.query;
    // for(let i of Object.keys(params)){
    //     if(!params[i]){
    //     }
    // }
    //postTime:{$lt:params.postTime[0],$gt:params.postTime[0]}

    articleModel.find({}).exec((err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });

});


router.get("/articleDelete", passport.authenticate("jwt", { session: false }), (req, res) => {

    let $id = req.query.id;
 
    articleModel.deleteOne({ _id: $id }).then((result) => {

        if (result.n >= 1) {
            articleModel.find({}).exec((err, result) => {
                if (err) {
                    throw err;
                }
                res.send(result);
            });
        }
    });


});

router.post("/articleAdd", passport.authenticate("jwt", { session: false }), upload.single('file'), (req, res) => {

    

    //图片设置
    let { originalname, filename, path } = req.file;

    let i = originalname.lastIndexOf(".");

    filename = Date.now() + Math.ceil(Math.random() * 100) + originalname.substr(i - 1);

    fs.renameSync(path, "static/upload/" + filename, (err) => {
        if (err); throw err;
    })

    let { title, cate, summary, content } = req.body;

    let article = ({

        author: "hansu",
        title,
        cate,
        summary,
        content,
        cover_img: filename,
        n_look: 1,
        n_like: 1,
        n_comment: 1,
        postTime: (new Date()).toLocaleDateString()


    });

    articleModel.create(article).then((result) => {

        res.send({ message: "ok" });

    }

    );



});


router.post("/articleEdit", (req, res) => {

    let { _id, title, cate, summary } = req.body;
    articleModel.findByIdAndUpdate(_id, { title, cate, summary }).then((result) => {

        res.send({ message: "ok" })

    });


});




router.post('/upload', upload.single('file'), (req, res) => {

    let { originalname, filename, path } = req.file;

    let i = originalname.lastIndexOf(".");

    filename = Date.now() + Math.ceil(Math.random() * 100) + originalname.substr(i - 1);

    fs.renameSync(path, "static/upload/" + filename, (err) => {
        if (err); throw err;
    })

    console.log(req.body)
    res.send({ message: "ok" });

})


module.exports = router;