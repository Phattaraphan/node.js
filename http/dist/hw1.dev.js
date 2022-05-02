"use strict";

var express = require('express');

var app = express();
var port = 2000;
app.use(express.json());

var userData = require('./User.json');

var Id;
var Fname;
var Lname;
var Tel;
var Email;
var Role;
app.get('/getData', function (req, res) {
  res.send({
    userData: userData
  });
});
app.post('/update', function (req, res) {
  var updateId = req.body.updateId;
  Id = req.body.id;
  Fname = req.body.firstname;
  Lname = req.body.lastname;
  Tel = req.body.tel;
  Email = req.body.email;
  Role = req.body.role;

  for (var i = 0; i < userData.length; i++) {
    if (Email === userData[i].Email || Tel === userData[i].Tel) {
      return res.status(400).send("Bad Request");
    }

    if (updateId == userData[i].Id) {
      userData.splice(i, 1, {
        Id: Id,
        Fname: Fname,
        Lname: Lname,
        Tel: Tel,
        Email: Email,
        Role: Role
      });
      return res.send('update success');
    }
  }

  return res.status(400).send("Bad Request");
});
app.post('/add', function (req, res) {
  Id = req.body.id;
  Fname = req.body.firstname;
  Lname = req.body.lastname;
  Tel = req.body.tel;
  Email = req.body.email;
  Role = req.body.role;

  for (var i = 0; i < userData.length; i++) {
    if (Id === userData[i].Id || Email === userData[i].Email || Tel === userData[i].Tel) {
      return res.status(400).send("Bad Request");
    }
  }

  userData.push({
    Id: Id,
    Fname: Fname,
    Lname: Lname,
    Tel: Tel,
    Email: Email,
    Role: Role
  });
  return res.send("Add datasuccess");
});
app["delete"]('/delete', function (req, res) {
  Id = req.body.id;

  for (var i = 0; i < userData.length; i++) {
    if (Id == userData[i].Id) {
      userData.splice(i, 1);
      return res.send('delete success');
    }
  }

  return res.status(400).send("Bad Request");
});
app.listen(port, function () {
  console.log("Listening at http://localhost:".concat(port));
});