"use strict";

var express = require('express');

var app = express();
var port = 3000;
app.use(express.json());

var mysql = require('mysql2');

var dataQuery = mysql.createPool({
  namedPlaceholders: true,
  charset: 'utf8',
  host: "127.0.0.1",
  port: 4200,
  user: "root",
  password: "",
  database: "oauth2"
});
var data = [];
app.get('/get', function (req, response) {
  dataQuery.query('SELECT * FROM employee', function (err, result) {
    if (err) {
      return response.status(400).json(err);
    }

    return response.json(result);
  });
}); // app.post('/update', (req, res) => {
//     let updateId = req.body.updateId;
//     Id = req.body.id
//     Fname = req.body.firstname;
//     Lname = req.body.lastname;
//     Tel = req.body.tel;
//     Email = req.body.email;
//     Role = req.body.role;
//     for (let i = 0; i < userData.length; i++) {
//         if (Email === userData[i].Email || Tel === userData[i].Tel) {
//             return res.status(400).send("Bad Request");
//         }
//         if (updateId == userData[i].Id) {
//             userData.splice(i, 1, {
//                 Id: Id,
//                 Fname: Fname,
//                 Lname: Lname,
//                 Tel: Tel,
//                 Email: Email,
//                 Role: Role
//             });
//             return res.send('update success');
//         }
//     }
//     return res.status(400).send("Bad Request");
// });
// app.post('/add', (req, res) => {
//      Id = req.body.id;
//      Fname = req.body.firstname;
//      Lname = req.body.lastname;
//      Tel = req.body.tel;
//      Email = req.body.email;
//      Role = req.body.role;
//     for (let i = 0; i < userData.length; i++) {
//       if (Id === userData[i].Id || Email === userData[i].Email || Tel === userData[i].Tel) {
//             return res.status(400).send("Bad Request");
//         }
//     }
//     userData.push({
//         Id: Id,
//         Fname: Fname,
//         Lname: Lname,
//         Tel: Tel,
//         Email: Email,
//         Role: Role,
//     })
//     return res.send("Add datasuccess");
// });
// app.delete('/delete', (req, res) => {
//     Id = req.body.id;
//     for (let i = 0; i < userData.length; i++) {
//         if (Id == userData[i].Id) {
//             userData.splice(i, 1);
//             return res.send('delete success');
//         }
//     }
//     return res.status(400).send("Bad Request");
// });

app.listen(port, function () {
  console.log("Listening at http://localhost:".concat(port));
});