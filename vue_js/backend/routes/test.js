var express = require('express');
var router = express.Router();
var tests = require('../user.json');



router.get('/', function(req, res, next){
  res.send(tests)
});

router.get('/:id', function(req, res, next){
  var id = parseInt(req.params.id, 10)
  var tt = tests.filter(function (test){
    return test.id === id
  });
  res.send(tt)
});

router.post('/', function(req, res, next){
  var fs = require('fs');
  var fileData = req.body.user;

  fs.readFile('user.json', function(err, obj) {
    var fileObj = JSON.parse(obj);
    fileObj.push(fileData);
    //fileObj.push("id :"+fileData.id);
    fs.writeFile('user.json', JSON.stringify(fileObj), function(err) {
      if (err) {
         res.status(500).jsonp({ error: 'Failed to write file' });
      }
      res.send("File write success");
    });
  });


  /*fs.writeFile('user.json', JSON.stringify(fileData) , function(err) {
    if (err) {
       res.status(500).jsonp({ error: 'Failed to write file' });
    }
    res.send("File write success");
  });*/

  //console.log(fileData.id);
  //res.send(req.body)

});



module.exports = router;
