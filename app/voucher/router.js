var express = require("express");
const {
  index,
  viewCreate,
  actionCreate,
  viewEdit,
  actionEdit,
  actionDelete
} = require("./controller");
const multer = require('multer')
const os = require('os')
var router = express.Router();

/* GET home page. */
router.get("/", index);
router.get("/create", viewCreate);
router.post("/create", multer({dest: os.tmpdir()}).single('image'), actionCreate);
router.get("/edit/:id", viewEdit);
router.put("/edit/:id", multer({dest: os.tmpdir()}).single('image'), actionEdit);
router.delete("/delete/:id", actionDelete);
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
