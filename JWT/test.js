const express = require('express');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/index.html');
});

app.get('/style.css', (req, res) => {
    return res.sendFile(__dirname + '/style.css');
})

const secret = 'token'

const Data = [{
    user: "user",
    pass: "123"
}];

let loginData = {};


app.post('/login', async(req, res) => {

    try {
        const user = req.body.username;
        const pass = req.body.password;

        for (let i = 0; i < Data.length; i++) {

            if (user == Data[i].user && encryptpass(pass) == encryptpass(Data[i].pass)) {
                let token = await JWT.sign(Data[i], secret, {
                    expiresIn: '2h'
                });
                loginData = {
                    ...Data[i],
                    token
                }
                Data[i].token = token
                console.log({ loginData })

                return res.status(200).send('Login success');
            }
        }

        console.log(user)
        console.log(pass)
        return res.send('wrong user or password');
    } catch (error) {
        console.log(error)
        return res.send('wrong user or password');
    }
});

app.post('/data', (req, res, next) => {
    const token = req.headers['x-access-token'];
    try {
        const decoded = JWT.verify(token, secret);
        console.log(decoded);
    } catch (err) {
        return res.status(401).send('wrong token');
    }
    next();
}, (req, res) => {
    res.status(200).send('authenticated');
});


function encryptpass(pass) {

    bcrypt.genSalt(10, function(err, Salt) {

        bcrypt.hash(pass, Salt, function(err, hash) {
            console.log(hash)
            return hash
        })

    });

};



// const password = 'pass123';
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

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});