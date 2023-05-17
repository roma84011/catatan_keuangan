//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
const app = express();
//konfigurasi koneksi
const conn = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'db_lingkom'
});
//connect ke database
conn.connect((err) =>{
if(err) throw err;
console.log('Mysql Connected...');
});
//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set folder public sebagai static folder untuk static file
app.use('/assets',express.static(__dirname + '/public'));

app.get('/home', (req, res) => {
    res.render('index');
  });

  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
      sql.connect(config, (err) => {
        if (err) throw err;
        const request = new sql.Request();
        request.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`, (err, recordset) => {
          if (err) throw err;
          if (recordset.recordset.length > 0) {
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/dashboard');
          } else {
            res.send('Username atau password salah!');
          }
        });
      });
    } else {
      res.send('Mohon masukkan username dan password!');
    }
  });



//server listening
app.listen(8000, () => {
console.log('Server is running at port 8000');
});