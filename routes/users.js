var express = require('express');
var router = express.Router();
var PW = require("png-word");
var pw = new PW();
var R = require("random-word");
const fs = require("fs");
var logn = "";

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.locals.user = req.session.user || "";

  res.locals.messages =  req.session.messages;

  req.session.firstnum = res.locals.firstnum = Math.round(Math.random()*10);
  req.session.secondnum = res.locals.secondnum = Math.round(Math.random()*10);
  res.render("user");


});

router.get("/logout",function(req,res){
  req.session.user = undefined;
  res.redirect("back");
})

router.get("/config",function(req,res){
  // req.session.config = 1;
  res.redirect("back");
})



var users = {};

router.post("/login",function(req,res){
  const {loginname,password,vnum} = req.body;

  if(Number(vnum) === req.session.firstnum +req.session.secondnum &&
    users[loginname] && users[loginname].password === password){
      req.session.user = {loginname};
      logn = loginname;

  }

  res.redirect("back");
});

router.post("/reg",function(req,res){
  const {loginname,password,confirm,vimg}= req.body;
  if(req.session.vimg === vimg &&
    loginname && password && password === confirm){
    users[loginname] = {loginname,password};
    var msg = [];
    msgs[loginname] = {loginname,msg};
    // req.session.config = 0;
    }
    res.redirect("back");
})





router.get("/vimg",function(req,res){
    var r = new R("123456789");
    req.session.vimg = r.random(3);
    pw.createReadStream(req.session.vimg).pipe(res);
});


// var texts = {};

router.post("/update_pwd",function(req,res){
  const {loginname,password,new_password,vimg}= req.body;
  if(req.session.vimg === vimg &&
    loginname && users[loginname].password === password && new_password){
      users[loginname].password = new_password;
    }
    res.redirect("back");
})

function manager(req,res,next){
  if(req.session.user){
    next();
  }else{
    next(new Error("请先登录!"))
  }
}

var msg = [];
var msgs = {};

router.post("/message",manager,function(req,res){
  const {message} = req.body;

  msg.push(logn + ":   "+message);
  msgs[logn] =msg;
  req.session.messages =msg;
  fs.appendFile("sessions/message.txt",logn +":"+message+"\n",function(err){
    console.log(err);
  });

  // fs.readFile("sessions/message.txt","utf8",function(err,data){
  //   msg = data.split("\n");
  //   console.log(data);
  //   console.log("in ******"+msg);
  // })
  // console.log("out ******"+msg);
  // req.session.messages = msg;
  // console.log(req.session.messages);


  // let rs = fs.createReadStream("session/message.txt");
  // rs.pipe(res);


  res.redirect('back');

})

//
// router.get("/messages",function(req,res){
//
//     let rs = fs.createReadStream("session/message.txt");
//
//     rs.pipe(res);
// });

module.exports = router;
