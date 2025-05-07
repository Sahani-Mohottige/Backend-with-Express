const joi = require('joi');
const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());
//middleware

app.get('/',(req,res)=>{
    res.send("hello world!!");
});

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
    {id: 4, name: 'course4'}
]

app.get('/api/courses',(req,res) => {
    res.send(courses);
});

app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c =>c.id === parseInt(req.params.id));
if(!course) return res.status(404).send("Course not found");
res.send(course);    
});

app.post('/api/courses',(req,res)=>{

  const {error} = validateCourse(req.body);  //result.error = {error} 

  if(error) return res.status(400).send(error.details[0].message);
  
    const course = {
       id:  courses.length+1,
       name: req.body.name
    }
    courses.push(course);
    res.send(course);
});
      /* const schema = Joi.object({
      name: Joi.string().min(3).required()
    });
    
    const result = schema.validate(req.body);

    if(result.error){
      res.status(400).send(result.error.details[0].message);
      return;
    }

    //postman
      { }
  "name" is required

    {"name":"1" }
 "name" length must be at least 3 characters long

    if(!req.body.name || req.body.name.length <3){
      res.status(400).send("Name is required and should have minimum 3 characters.");
      return;
    } 
      */


app.put('/api/courses/:id', (req,res) =>{
  //look for the course
  //If not existing , return 404
  const course = courses.find(c =>c.id === parseInt(req.params.id));
  if(!course) {
    return res.status(404).send("Course not found");
  }

  //with object distructure
  //validate
  const {error} = validateCourse(req.body);  //result.error = {error} 
  if(error) return res.status(400).send(error.details[0].message);

/*
  - same without object distructure

  const result = validateCourse(req.body);

  if(result.error){
    res.status(400).send(result.error.details[0].message);
    return;
  }
*/

  //update courses
  course.name = req.body.name;
  // return the updated course
  res.send(course);
  });
  
  function validateCourse(course){
    const schema = Joi.object({
      name: Joi.string().min(3).required()
    });
    
    return schema.validate(course);
  
  }


app.delete('/api/courses/:id', (req,res)=>{
  //look up for the course
  //if doesn't exist return 404
  const course = courses.find(c =>c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send("Course not found");

  //Delete
  const index = courses.indexOf(course);
  courses.splice(index,1);

  //return same course 
console.log("course deleted.");
res.send(course);
});








//additional

app.get('/api/classes',(req,res) => {
    res.send([1,2,3]);
});

app.get('/api/classes/:id',(req,res)=>{
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