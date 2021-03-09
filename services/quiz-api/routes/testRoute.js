// route used for testing authentication - can remove safely, serves no purpose besides testing

var express = require("express");
var router = express.Router();
var testController = require("../controllers/testController");
var auth = require("../middleware/auth")();
router.get("/test", auth.authenticate(), testController.test_route);

module.exports = router;