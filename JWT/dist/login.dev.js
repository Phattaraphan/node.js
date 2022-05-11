"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var jwt = require('jsonwebtoken');

var bcrypt = require('bcryptjs');

var express = require('express');

var app = express();
var port = 3000;
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
var secret = 'token';
var Data = [{
  email: 'admin@gmail.com',
  pass: 1234
}];
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/login.html");
});
app.get('/index', function (req, res) {
  if (!req.token) return res.redirect('/error');
  jwt.verify(token, secret, function (err, result) {
    if (err) {
      return res.redirect('/error');
    }

    res.sendFile(__dirname + "/index.html");
  });
});
app.get('/error', function (req, res) {
  res.sendFile(__dirname + "/error.html");
});
app.post('/login', function _callee(req, res) {
  var email, pass, i, _token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          email = req.body.email;
          pass = req.body.pass;
          console.log(Data.length);
          i = 0;

        case 5:
          if (!(i < Data.length)) {
            _context.next = 17;
            break;
          }

          if (!(email == Data[i].email && encrypt(pass) == encrypt(Data[i].pass))) {
            _context.next = 14;
            break;
          }

          _context.next = 9;
          return regeneratorRuntime.awrap(jwt.sign(Data[i], secret, {
            expiresIn: '2h'
          }));

        case 9:
          _token = _context.sent;
          loginData = _objectSpread({}, Data[i], {
            token: _token
          });
          Data[i].token = _token;
          console.log({
            loginData: loginData
          });
          return _context.abrupt("return", res.status(200).sendFile(__dirname + "/index.html"));

        case 14:
          i++;
          _context.next = 5;
          break;

        case 17:
          console.log(email);
          console.log(pass);
          return _context.abrupt("return", res.sendFile(__dirname + "/error.html"));

        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", res.sendFile(__dirname + "/error.html"));

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 22]]);
});
app.post('/index', function (req, res, next) {
  var token = req.headers['x-access-token'];

  try {
    var decoded = jwt.verify(token, secret);
    console.log(decoded);
  } catch (err) {
    return res.status(401).send('wrong token');
  }

  next();
}, function (req, res) {
  res.status(200).send('authenticated');
});

function encrypt(pass) {
  bcrypt.genSalt(10, function (err, Salt) {
    bcrypt.hash(pass, Salt, function (err, hash) {
      console.log(hash);
      return hash;
    });
  });
}

;
app.listen(port, function () {
  console.log("Listening at http://localhost:".concat(port));
});