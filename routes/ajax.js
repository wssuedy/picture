const router = require("express").Router();

router.get("/",function(req,res){
  res.send(req.query.name);
})



module.exports = router;
