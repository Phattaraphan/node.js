let http = require('http');

http
.createServer(function(req,res){
     res.writeHead(200);
     var testText = sayHi();
res.end(testText)
})
.listen(2337,'127.0.0.1')
function sayHi(){
     let date= new Date().toLocaleString();
     let p = 'Phattaraphan Somrit '+ date;
     return p 
}
console.log('Server running at http://127.0.0.1:2337/')
