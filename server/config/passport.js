   const mongoose = require("mongoose");

   mongoose.connect("mongodb://localhost:27017/test", {
       useNewUrlParser: true
   });


   var AdminModel = mongoose.model("admintors");


   //passport配置
   const JwtStrategy = require('passport-jwt').Strategy,
       ExtractJwt = require('passport-jwt').ExtractJwt;

   const opts = {}
   opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
   opts.secretOrKey = 'secret'; //密钥


   module.exports = (passport) => {



       //验证token中的信息
       passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

           let time = Math.round(Date.now() / 1000);

           if (time >= jwt_payload.iat && time <= jwt_payload.exp) {

               AdminModel.findOne({
                   name: jwt_payload.name
               }).then(result => {

                   if (result) {
                       return done(null, result);
                   } else {
                       return done(null, false);
                   }


               })


           } else {
               
               return done(null, false);

           }

       }));





   }