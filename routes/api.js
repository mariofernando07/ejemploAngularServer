
var express = require("express");
var router = express.Router();

router.param("collection", function(req, res, next, c){
    req.c = req.db.collection(c);
    next(); 
});

router.post('/:collection', function(req, res) {
    var obj = req.body; 
    console.log(req.body);
    req.c.insert(obj, {w:1}, function(err, result){
        if(err){
           res.send({success:false}); 
        }else{
            res.send({success:true, id:result.insertedIds[0]}); 
        }
    });
});

module.exports = router;