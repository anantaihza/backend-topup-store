var express = require("express");
const { index, viewCreate, actionCreate } = require("./controller");
var router = express.Router();

/* GET home page. */
router.get("/", index);
router.get("/create", viewCreate);
router.post("/create", actionCreate);
// router.get("/edit/:id", viewEdit);
// router.put("/edit/:id", actionEdit);
// router.delete("/delete/:id", actionDelete);
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
