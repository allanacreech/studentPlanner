var express = require("express");

var router = express.Router();
// Import the model (cat.js) to use its database functions.
var planner = require("../models/planner-model.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  res.redirect("/planner");
});

router.get("/planner", function(req, res) {
  planner.all(function(data) {
    var hbsObject = {
      calendar: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

// Export routes for server.js to use.
module.exports = router;
