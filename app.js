const express= require('express');
const app = express();

//Importing databasepg.js file
const client= require('./databasepg')

const courses= [
    {id : 1, name: 'course1'},
    {id : 2, name: 'course2'},
    {id : 3, name: 'course3'},
]



app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/courses', (req,res) =>{
   res.send(courses);
});


app.get('/api/course/:id', (req,res) => {

    const course=courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course is not found');
    res.send(course);
});

var cors = require('cors');
app.use(cors({
    origin: 'file:///D:/Projects/api/Frontend/index.html'
}));

const port= process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port...${port}`));


// Accesing databasepg.js
//Get request from employees full data

app.get('/get', (req,response) => {
 client.query(`Select * from employee_details`, (err, res) =>{
    if(!err){
        response.send(res.rows);
    } else{
        response.send(err.message);
    }
    
  })
 client.end;
})

//Get element by id
app.get('/get/:id',(req,response)=>{
  client.query(`Select * from employee_details where id=${req.params.id}`, (err, res) =>{
    if(!err){
        response.send(res.rows);
    }
  })
 client.end;
})

//Adding new row
app.post('/add', (req,response)=>{
    const employee=req.body;
    let insertQuery=`insert into employee_details(id, name, salary)
     values(${employee.id}, '${employee.name}', '${employee.salary}')`

     client.query(insertQuery, (err,res)=>{
        if(!err){
            response.send('Adding data successful!');
        }else{
            response.send(err.message);
        }
     })
     client.end;
})