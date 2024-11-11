var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const data = {
    name: '刘博方',
    age: 30,
    website:'http://liubf.com' 
  };
  // 使用res.json()方法返回JSON数据
  res.json(data);
});

module.exports = router;
