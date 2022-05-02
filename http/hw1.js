const express = require('express');
const app = express();
const port = 2000;

app.use(express.json());
const userData = require('./User.json');

let Id;
let Fname;
let Lname;
let Tel;
let Email;
let Role;

app.get('/getData', (req, res) => {
    res.send({ userData });
});

app.post('/update', (req, res) => {
    let updateId = req.body.updateId;

    Id = req.body.id
    Fname = req.body.firstname;
    Lname = req.body.lastname;
    Tel = req.body.tel;
    Email = req.body.email;
    Role = req.body.role;
    
    for (let i = 0; i < userData.length; i++) {
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

app.post('/add', (req, res) => {
     Id = req.body.id;
     Fname = req.body.firstname;
     Lname = req.body.lastname;
     Tel = req.body.tel;
     Email = req.body.email;
     Role = req.body.role;
 

    for (let i = 0; i < userData.length; i++) {
        
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
        Role: Role,
    })

    return res.send("Add datasuccess");
});

app.delete('/delete', (req, res) => {

    Id = req.body.id;
    for (let i = 0; i < userData.length; i++) {
        if (Id == userData[i].Id) {
            userData.splice(i, 1);
            return res.send('delete success');
        }
    }
    return res.status(400).send("Bad Request");


});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});