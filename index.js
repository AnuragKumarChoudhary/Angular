const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors=require('cors');
app.use(cors());
app.use(bodyparser.json());
var mysqlConnection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
		user: 'root',
		password: '',
        database: 'anurag'
    });
mysqlConnection.connect((err) =>{
        if (!err)
            console.log('Data Base Connection Successful');
        else
            console.log('Data Base Connection Failed :' + JSON.stringify(err,undefined,2));

});
app.listen(3000,()=>console.log('Express Server is running at port no. 3000'));
app.get('/user',(req,res)=>{
	res.send("Hello Anurag");
})
app.post('/user',(req,res)=>{
	firstName=req.body.firstName;
	res.send(firstName);
})
app.post('/sum',(req,res)=>{
	firstNumber=req.body.firstNumber;
	secondNumber=req.body.secondNumber;
	rishu = firstNumber + secondNumber;
	res.send(rishu.toString());
})
app.get('/rishu',(req,res)=>{
	mysqlConnection.query('SELECT * from Name',(err,result,fields)=> {
        if (!err)
            //console.log(rows);
            res.send(result);
        else    
            console.log(err);
    })
})
app.post('/rishu',(req,res)=>{
	firstName=req.body.firstName;
	
	var sqlQuery = "INSERT INTO Name values('"+firstName+"')";
	mysqlConnection.query(sqlQuery,(err,rows,fields)=> {
        if (!err)
            //console.log(rows);
            res.send(rows);
        else    
            console.log(err);
    })
})
app.post('/employee',(req,res)=>{
	employee_id=req.body.employee_id;
	employee_name=req.body.employee_name;
	salary=req.body.salary;
	
	var sqlQuery = "INSERT INTO Employee values('"+employee_id+"','"+employee_name+"','"+salary+"')";
	mysqlConnection.query(sqlQuery,(err,rows,fields)=> {
        if (!err)
            //console.log(rows);
            res.send(rows);
        else    
            console.log(err);
    })
})
app.get('/employee',(req,res)=>{
	mysqlConnection.query('SELECT * from Employee',(err,result,fields)=> {
        if (!err)
            //console.log(rows);
            res.send(result);
        else    
            console.log(err);
    })
})
app.put('/employeeUpdate',(req,res)=>{
	id_new=req.body.id_new;
	employee_name_new=req.body.employee_name_new;
	salary_new=req.body.salary_new;
	
	mysqlConnection.query('UPDATE Employee SET employee_name = ? , salray = ? WHERE employee_id = ?', [employee_name_new, salary_new, id_new],(err,rows,fields)=> {
        if (!err)
            //console.log(rows);
            res.send(rows);
        else    
            console.log(err);
    })
})
app.delete('/employeeDelete',(req,res)=>{
	employee_id_new=req.body.employee_id_new;
	
	var sqlQuery = "DELETE FROM `Employee` WHERE `employee_id` = '"+employee_id_new+"'";
	mysqlConnection.query(sqlQuery,(err,rows,fields)=> {
        if (!err)
            //console.log(rows);
            res.send(rows);
        else    
            console.log(err);
    })
})
app.get('/employee/:employee_id',(req,res)=> {
    mysqlConnection.query('SELECT * from Employee where employee_id = ?',[req.params.employee_id],(err,result,fields)=> {
        if (!err)
            //console.log(rows);
            res.send(result);
        else    
            console.log(err);
    })
});