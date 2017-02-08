var express = require("express");
var passport = require("../config/passport");

// Import the model (burger.js) to use its database functions.
var db = require("../models");

// Create all our routes and set up logic within those routes where required.
module.exports = function(app) {

// app.get("/", function(req, res) {
//   res.redirect("/calendar");
// });

app.get("/calendar", function(req, res) {
   //console.log(db);
//   var query = 
//db.calendar.sequelize.query("SELECT * FROM `users`", { type: sequelize.QueryTypes.SELECT})
    db.calendar.findAll({
      where: {user_id: req.user.id},
      attributes: ['id', 'title', 'start', 'end', 'allDay', 'user_id'],
       raw: true,
       include: [db.User]
      })
    .then(function(dbcalendar) {
      console.log(dbcalendar);
    res.send(dbcalendar);
    });
});

app.post("/calendar/add-event", function(req, res) {
    db.calendar.create({
      title: req.body.title,
      start: req.body.start,
      end: req.body.end,
      allDay: req.body.allDay,
      user_id: req.user.id
    },
    {
      include: [db.User]
    })
    .then(function(dbcalendar) {
       res.send({status: 'success', id: dbcalendar.id});
    });
});

app.put("/calendar/update-title", function(req, res) {

    db.calendar.update({
        title: req.body.title,
      },
      {
        where: {
          id: req.body.id
        }
      })
    .then(function(dbcalendar) {
       res.send({status: 'success', id: dbcalendar.id});
    });
  });

app.put("/calendar/update-when", function(req, res) {

    db.calendar.update({
        start: req.body.start,
        end: req.body.end
      },
      {
        where: {
          id: req.body.id
        }
      })
    .then(function(dbcalendar) {
       res.send({status: 'success', id: dbcalendar.id});
    });
  });

// app.put("/calendar/resize", function(req, res) {

//     db.calendar.update({
//         start: req.body.start,
//         end: req.body.end
//       },
//       {
//         where: {
//           id: req.body.id
//         }
//       })
//     .then(function(dbcalendar) {
//        res.send({status: 'success', id: dbcalendar.id});
//     });
//   });

app.delete("/calendar/delete", function(req, res) {

    db.calendar.destroy(
      {
        where: {
          id: req.body.id
        }
      })
    .then(function(dbcalendar) {
      res.send({status: 'success', id: dbcalendar.id});
    });
  });


  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
//console.log("Hereeeeeeee");
    res.json("/dashboard");
   //res.redirect(307, "/dashboard");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/dashboard"); ///api/login");
    }).catch(function(err) {
      console.log(err);
      res.redirect(307, "/api/login");
      //res.json(err);
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/login-page");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });




}