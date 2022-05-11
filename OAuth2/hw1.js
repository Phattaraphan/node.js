const express = require('express');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken')
app.use(express.json());


const mysql = require('mysql2');

let secret = 'token'
let Data = [{
  email:'admin@gmail.com',
  pass: 1234
}];

const Auth = (req, res, next) => {
     const token = req.headers['x-access-token'];
     try {
         const decoded = jwt.verify(token, secret);
         console.log(decoded);
     } catch (err) {
         return res.status(401).send('wrong token');
     }
     next();
 }

var dataQuery = mysql.createConnection({
     host: "localhost",
     user:  "root",
     password: "",
     database:"oauth2"
})

app.post('/login', async(req, res) => {
     
     try {
         const email = req.body.email;
         const pass = req.body.pass;
         console.log(Data.length)
         for (let i = 0; i < Data.length; i++) {
             if (email == Data[i].email && pass == Data[i].pass) {
                 let token = await jwt.sign(Data[i], secret, {
                     expiresIn: '2h'
                 });
                 loginData = {
                     ...Data[i],
                     token
                 }
                 Data[i].token = token
                 console.log({ loginData })
                 
                 return res.json(token);
             }
         }
         return res.send("email or password worng");
     } catch (error) {
         console.log(error)
         return res.send("email or password worng");
     }
   });

app.get('/get',Auth, async(req, response) => {
    const sql = 'SELECT * FROM employee'
    await dataQuery.query(sql,(err,result) => {
         if(err){
              console.log(err);
                return response.status(400).json(err)
         }
         return response.json(result)
    })
});


app.delete('/delete', Auth,async(req, response) => {
     const sql = `DELETE FROM employee WHERE Em_id = "${req.body.Em_id}" `
     await dataQuery.query(sql, (error, result) => {
         if (error) { throw error }
         return response.send("Delete Success" )
     })
 });

 app.post('/add',Auth, async(req, response) => {
     console.log(req.body);
        let reserve_info = [
             [
                 `${req.body.Em_id}`,
                 `${req.body.Fname}`,
                 `${req.body.Lname}`,
                 `${req.body.Email}`,
                 `${req.body.Tel}`,
                 `${req.body.Role}`
             ]
         ];
         console.log(reserve_info)
     
         const sql =
             "INSERT INTO `employee`(`Em_id`, `Fname`, `Lname`, `Email`, `Tel`, `Role`) VALUES  ?  ";
         await dataQuery.query(sql, [reserve_info], (err, result) => {
             if (err) {
                  console.log([reserve_info])
                  console.log(err)
                 throw err;
             }
             console.log("add reserve_info success");
             return response.send("Add Success")
            
         });
        });


        app.put('/update', async(req, res) => {
          console.log(req.body);

             const sql =
                  `UPDATE employee SET Fname= '${req.body.Fname}' ,Lname= '${req.body.Lname}',Email = '${req.body.Email}',Tel= '${req.body.Tel}',Role= '${req.body.Role}' WHERE Em_id = '${req.body.Em_id}'`;
              await dataQuery.query(sql,(err, result) => {
                  if (err) {
                      res.send("Tel or Email Duplicate");
                  }
                  
                  res.send("update success");
                  
              });
             });


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});