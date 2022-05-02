"use strict";

var express = require('express');

var app = express();
var post = 9000;

var solve24game = require('24game-solver/dist/24game-solver');

app.get('/', function (req, res) {
  var Number1 = Number(req.query.number1);
  var Number2 = Number(req.query.number2);
  var Number3 = Number(req.query.number3);
  var Number4 = Number(req.query.number4);

  if (Number1 >= 1 && Number1 <= 9 && Number2 >= 1 && Number2 <= 9 && Number3 >= 1 && Number3 <= 9 && Number4 >= 1 && Number4 <= 9) {
    var result = solve24game([Number1, Number2, Number3, Number4], 24);

    if (result.length === 0) {
      res.send('Fail');
    } else {
      res.send('Success' + '\n' + result);
    }
  } else {
    res.status(403).send('Forbidden');
  }
});
app.listen(post, function () {
  console.log("Listening at http://localhost:".concat(post, "/"));
});