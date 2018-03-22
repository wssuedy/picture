const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const upload = multer({
  dest:"upload"
});

const single = upload.single("photo");
const arr = upload.array("photos",3);
const field = upload.fields([
  {name:"field1",maxCount:1},
  {name:"field2",maxCount:3}
]);

// 相册
var name = "default";
const xclist = [];//相册名称
const xcimglist = {};//相册图片
var imgarr = [];//图片临时

xcimglist["default"] = [];

const uparr = [];

const reg = /^[a-zA-Z][\w]{1,5}$/;

const pageper = 2;//每页显示数
var currarr = [];
var num = 1;//默认总页
var currnum = 1;//默认显示第一页

//主页 全部，相册页
router.get("/",function(req,res){
  res.locals.list = "";
  res.locals.num = num;
  res.locals.currnum = currnum;
  res.locals.xclist = xclist;
  res.locals.pageper = pageper;

  if(!req.query.name ){
    // console.log("全部");
    for(var i =currnum*pageper-pageper;i<currnum*pageper;i++){
      if(i < uparr.length ){
        currarr.push(uparr[i]);
      }
    }
    res.locals.list = currarr;
    currarr = [];
    // res.locals.list = uparr;

    res.locals.num = (uparr.length-1)/pageper+1;
    res.render("picture");
  }else{
    if(name != req.query.name){
      currnum = 1;
    }
    name = req.query.name;
    res.locals.name = name;

    var n = xcimglist[name].length;

    for(var i =currnum*pageper-pageper;i<currnum*pageper;i++){
      if(i < n ){
        currarr.push(xcimglist[name][i]);
      }
    }
    res.locals.list = currarr;
    currarr = [];

    // res.locals.list = xcimglist[name];
    res.locals.num = (xcimglist[name].length-1)/pageper+1;
    res.render("picture");
  }

});


// 分页
router.get("/page",function(req,res){
  currnum = req.query.num;
  console.log(currnum);
  res.redirect("back");
})


//新增相册中转
router.post("/create",function(req,res){
  if(reg.test(req.body.newname)){
    if(xclist.indexOf(req.body.newname) === -1){
      xclist.push(req.body.newname);
      // console.log(xclist);
      xcimglist[req.body.newname] = [];
    }
  }
  res.redirect("back");

});

// 删除相册
router.get("/del",function(req,res){
  xclist.splice(xclist.indexOf(req.query.name),1);

  res.redirect("back");
})



//自动分类，可根据类型或时间
// router.get("/travel",function(req,res){
//   res.locals.list = travelarr;
//   res.render("picture");
// });
//
// router.get("/people",function(req,res){
//   res.locals.list = peoplearr;
//   res.render("picture");
// });
//
// router.get("/food",function(req,res){
//   res.locals.list = foodarr;
//   res.render("picture");
// });


router.get("/img/:filename",function(req,res){
  //读取
  console.log("读取"+req.params);

  let rs = fs.createReadStream("upload/"+req.params.filename);

  rs.pipe(res);
});
//
// router.post("/xhrup",single,function(req,res){
//   uparr.push(req.file);
//   res.send(req.file);
//   // res.redirect("back");
//
// });
//
// router.post("/up1",single,function(req,res){
//   uparr.push(req.file);
//   console.log(req.file);
//
//   if(RegExp("travel").test(req.file.originalname)){
//     travelarr.push(req.file);
//     console.log("travel");
//   }
//
//   if(RegExp("people").test(req.file.originalname)){
//     peoplearr.push(req.file);
//   }
//
//   if(RegExp("food").test(req.file.originalname)){
//     foodarr.push(req.file);
//   }
//   // res.send(req.file);
//   res.redirect("back");
//
// });

// 上传图片
router.post("/up2",arr,function(req,res){
  // console.log(name );

  for(var file of req.files){
    uparr.push(file);
    // console.log(file);
    if( name == 'default'){
      imgarr = xcimglist.default;
      imgarr.push(file);
      xcimglist.default =  imgarr;
    }else{
      imgarr = xcimglist[name];
      console.log("imgarr" + imgarr);
      imgarr.push(file);
      xcimglist[name] = imgarr;
      // console.log("*******************up to "+name+"arr");
    }

//自动分类

    // if(RegExp("travel").test(file.originalname)){
    //   travelarr.push(file);
    // }
    //
    // if(RegExp("people").test(file.originalname)){
    //   peoplearr.push(file);
    // }
    //
    // if(RegExp("food").test(file.originalname)){
    //   foodarr.push(file);
    // }
  }

  res.redirect("back");
})


// router.post("/up3",field,function(req,res){
//   res.send(req.files);
// })



module.exports = router;
