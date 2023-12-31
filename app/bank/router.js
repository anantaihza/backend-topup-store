var express = require("express");
const { index, viewCreate, actionCreate, viewEdit, actionEdit, actionDelete } = require("./controller");
var router = express.Router();

/* GET home page. */
router.get("/", index);
router.get("/create", viewCreate);
router.post("/create", actionCreate);
router.get("/edit/:id", viewEdit);
router.put("/edit/:id", actionEdit);
router.delete("/delete/:id", actionDelete);

module.exports = router;
