var express = require('express');
const { index } = require('./controller')
var router = express.Router();

/* GET home page. */
router.get('/', index);
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
