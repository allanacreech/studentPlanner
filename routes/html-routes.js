// // *********************************************************************************
// // html-routes.js - this file offers a set of routes for sending users to the various html pages
// // *********************************************************************************

// // Dependencies
// // =============================================================
// var path = require("path");

// // Routes
// // =============================================================
// module.exports = function(app) {

//   // Each of the below routes just handles the HTML page that the user gets sent to.

//   // index route loads view.html
//   app.get("/", function(req, res) {
//     res.render("index");
//   });

//   // app.get("/calendar", function(req, res) {
//   //   res.render("calendar-view");
//   // });


// };

// //../public/views/

// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/../views/homepage.html"));
  });

    app.get("/signup-page", function(req, res) {
    res.sendFile(path.join(__dirname + "/../views/signup.html"));
  });

  app.get("/tasks", function(req, res) {
    res.sendFile(path.join(__dirname + "/../views/tasks.html"));
  });
// app.get("/reminders", function(req, res) {
//     res.sendFile(path.join(__dirname + "/../views/reminders.html"));
//   });
app.get("/calendar-page", function(req, res) {
    res.sendFile(path.join(__dirname + "/../views/calendar.html"));
  });


//login stuff
  app.get("/login-page", function(req, res) {
    // If the user already has an account send them to the dashboard page
    if (req.user) {
      res.redirect("/dashboard");
    }
    res.sendFile(path.join(__dirname + "/../views/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/dashboard", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname + "/../views/dashboard.html"));
  });





};

//../public/views/