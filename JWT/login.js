
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const express = require('express');
const app = express();
const port = 3000;
app.use(express.urlencoded({extended: true}))
app.use(express.json())


let secret = 'token'
let Data = [{
  email:'admin@gmail.com',
  pass: 1234
}];

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/login.html")
});

app.get('/index', (req, res) => {
    if(!req.token) return res.redirect('/error')

    jwt.verify(token,secret, (err, result) => {
        if(err) {
            return res.redirect('/error')
        }
        res.sendFile(__dirname + "/index.html")
    })
});

app.get('/error', (req, res) => {
    res.sendFile(__dirname + "/error.html")
});

app.post('/login', async(req, res) => {

  try {
      const email = req.body.email;
      const pass = req.body.pass;
      console.log(Data.length)
      for (let i = 0; i < Data.length; i++) {
          if (email == Data[i].email && encrypt(pass) == encrypt(Data[i].pass)) {
              let token = await jwt.sign(Data[i], secret, {
                  expiresIn: '2h'
              });
              loginData = {
                  ...Data[i],
                  token
              }
              Data[i].token = token
              console.log({ loginData })
              
              return res.status(200).sendFile(__dirname + "/index.html");

          }
      }
      console.log(email)
      console.log(pass)
      return res.sendFile(__dirname + "/error.html");
  } catch (error) {
      console.log(error)
      return res.sendFile(__dirname + "/error.html");
  }
});

app.post('/index', (req, res, next) => {
  const token = req.headers['x-access-token'];
  try {
      const decoded = jwt.verify(token, secret);
      console.log(decoded);
  } catch (err) {
      return res.status(401).send('wrong token');
  }
  next();
}, (req, res) => {
  res.status(200).send('authenticated');
});

function encrypt(pass) {

  bcrypt.genSalt(10, function(err, Salt) {

      bcrypt.hash(pass, Salt, function(err, hash) {
          console.log(hash)
          return hash
      })

  });

};



app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});