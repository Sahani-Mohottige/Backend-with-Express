const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send("hello world!!");
});

app.get('/api/courses',(req,res) => {
    res.send([1,2,3]);
});

app.get('/api/courses/:id',(req,res)=>{
res.send(req.params.id);
});

app.get('/api/posts/:year/:month',(req,res)=>{
    res.send(req.params);
});
/*
http://localhost:5000/api/posts/2025/5
 
  {
    "year": "2025",
    "month": "5"
  }
*/

app.get('/api/posts1/:year/:month',(req,res)=>{
    res.send(req.query);
});

/*
http://localhost:5000/api/posts1/2025/5?sortBy=name

stored as key value pairs
  {
    "sortBy": "name"
  }

*/

const port = process.env.PORT || 3000;

app.listen(port, () =>  console.log(`Listening on port ${port}...`));
//PS D:\Backend-with-Express> $env:PORT = 5000
//Then - Listening on port 5000...