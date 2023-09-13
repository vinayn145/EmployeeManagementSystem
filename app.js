const express= require('express');
const app = express();

//Importing databasepg.js file
const client= require('./databasepg')


app.get('/', (req, res) => {
    res.send('Employee Management Server');
});

var cors = require('cors');
const { Client } = require('pg');
app.use(cors({
    origin: '*'
}));

const port= process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port...${port}`));


// Accesing databasepg.js
// Get request from employees full data

app.get('/get', (req,response) => {
    let viewQuery = `Select * from employee_details`;
    
    client.query(viewQuery, (err, res) =>{
        if(!err){
            response.send(res.rows);
        } else{
            response.send(err.message);
        }
        
    })
    client.end;
})

// Get element by id
app.get('/get/:id',(req,response) => {
    let viewIndividualQuery = `Select * from employee_details where id=${req.params.id}`;
    client.query(viewIndividualQuery, (err, res) =>{
        if(!err){
            response.send(res.rows);
        }
    })
    client.end;
})

// Get department by id
app.get('/department/:id',(req,response) => {
    let viewIndividualDepartmentQuery = `Select * from employee_dept where dept_code=${req.params.id}`;
    client.query(viewIndividualDepartmentQuery, (err, res) =>{
        if(!err){
            response.send(res.rows);
        }
    })
    client.end;
})

//Adding new row
app.post('/add', (req,response)=>{
    const employee=req.body;
    let insertQuery = `insert into employee_details(id, name, salary)
     values(${employee.id}, '${employee.name}', '${employee.salary}')`;

     client.query(insertQuery, (err,res)=>{
        if(!err){
            response.send('Adding data successful!');
        }else{
            response.send(err.message);
        }
     })
     client.end;
})

//Deleting by Id
app.delete('/delete/:id', async(req,response)=>{
    let deleteQuery = `Delete from employee_details where id=${req.params.id}`;

    console.log("received delete request")
    console.log(deleteQuery);
    client.query(deleteQuery, (err,res)=>{
        if(!err){
            response.send('Deleting data successful!');
        }else{
            response.send(err.message);
        }
     })
     client.end;
})