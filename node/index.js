const express = require("express")
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')

const connection = mysql.createConnection(config)
let names= null

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE IF NOT EXISTS people (name VARCHAR(255), id INT AUTO_INCREMENT PRIMARY KEY)";
    connection.query(sql);
    connection.query('INSERT INTO people(name) values("Edson")')
    connection.query('SELECT name FROM people', function (err, result, fields) {
        if (err) throw err;
        names =result
    });
    connection.end()
});

app.get('/', (req, res) => {
    res.send(`<h1>Full Cycle Rocks!v2</h1>`+JSON.stringify(names))
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})
