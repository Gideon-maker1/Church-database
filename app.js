const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
// serves the html form from the 'public' folder
app.use(express.static('public'));


// MySql connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'#your sql password',
    database: 'churchDB'
});

db.connect(err => {
    if (err) {
        console.error('Database connection error:', err);
    }
    else{
        console.log('Connected to the MySQL database');
    }
});

// API endpoint to add a new member
app.post('/add-member', (req,res) => {
    const {FirstName, LastName, Address, PhoneNumber, Email,
        DateOfBirth, MembershipDate} = req.body;

    const sql = `INSERT INTO Members
    (FirstName, LastName, Address, PhoneNumber, Email, DateOfBirth, MembershipDate)
    VALUES(?, ?, ?, ?, ?, ?, ?,)`;
    db.query(sql,[FirstName, LastName, Address, PhoneNumber,Email,
        DateOfBirth, MembershipDate],(err, result) => {
            if (err){
                console.error('Error inserting data:',err);
                res.json({success: false,
                    message: 'Error adding member to the database.'
                });
            }
            else{
                res.json({success: true,
                    message: 'Member added successfully!'
                });
            }
        });
});

// start the server
app.listen(port, () =>{
    console.log(`Server running on http://localhost:${port}`);
});
