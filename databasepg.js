const {Client} = require('pg')
const express=require('express')
const app= express();

//Set the EJS view engine
app.set('view engine','ejs');


const dbClient =new Client({
    host : "localhost",
    user :"postgres" ,
    port : 5432,
    password : "root123",
    database :"employee"
})

//Creating postgres client
const client=new Client(dbClient);

//connecting to database
client.connect();
/*
app.get('/employee', async (req, res) => {
    try {
      // Retrieve data from the PostgreSQL database
      const query = 'SELECT * FROM employee_details';
      const result = await client.query(query);
  
      // Render an HTML page with the retrieved data
      res.render('employee', { data: result.rows });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });*/
  
  // Start the Express.js server
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  }); 

//export to another file
module.exports = client