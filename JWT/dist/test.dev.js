"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');

var bcrypt = require('bcryptjs');

var JWT = require('jsonwebtoken');

var app = express();
var port = 3000;
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.get('/', function (req, res) {
  return res.sendFile(__dirname + '/index.html');
});
app.get('/style.css', function (req, res) {
  return res.sendFile(__dirname + '/style.css');
});
var secret = 'token';
var Data = [{
  user: "user",
  pass: "123"
}];
var loginData = {};
app.post('/login', function _callee(req, res) {
  var user, pass, i, token;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          user = req.body.username;
          pass = req.body.password;
          i = 0;

        case 4:
          if (!(i < Data.length)) {
            _context.next = 16;
            break;
          }

          if (!(user == Data[i].user && encryptpass(pass) == encryptpass(Data[i].pass))) {
            _context.next = 13;
            break;
          }

          _context.next = 8;
          return regeneratorRuntime.awrap(JWT.sign(Data[i], secret, {
            expiresIn: '2h'
          }));

        case 8:
          token = _context.sent;
          loginData = _objectSpread({}, Data[i], {
            token: token
          });
          Data[i].token = token;
          console.log({
            loginData: loginData
          });
          return _context.abrupt("return", res.status(200).send('Login success'));

        case 13:
          i++;
          _context.next = 4;
          break;

        case 16:
          console.log(user);
          console.log(pass);
          return _context.abrupt("return", res.send('wrong user or password'));

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", res.send('wrong user or password'));

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 21]]);
});
app.post('/data', function (req, res, next) {
  var token = req.headers['x-access-token'];

  try {
    var decoded = JWT.verify(token, secret);
    console.log(decoded);
  } catch (err) {
    return res.status(401).send('wrong token');
  }

  next();
}, function (req, res) {
  res.status(200).send('authenticated');
});

function encryptpass(pass) {
  bcrypt.genSalt(10, function (err, Salt) {
    bcrypt.hash(pass, Salt, function (err, hash) {
      console.log(hash);
      return hash;
    });
  });
}

; // const password = 'pass123';
// var hashedPassword;
// bcrypt.genSalt(10, function(err, Salt) {
//     bcrypt.hash(password, Salt, function(err, hash) {
//         if (err) {
//             return console.log('cannot encrypt');
//         }
//         hashedPassword = hash;
//         console.log(hash);
//         bcrypt.compare(password, hashedPassword,
//             async function(err, isMatch) {
//                 if (isMatch) {
//                     console.log('Encrypted password is ', password)
//                     console.log('Decrypted password is ', hashedPassword)
//                 }
//                 if (!isMatch) {
//                     console.log(hashedPassword + ' is not encrypttion of ' + password);
//                 }
//             }
//         )
//     });
// });

app.listen(port, function () {
  console.log("Listening at http://localhost:".concat(port));
});