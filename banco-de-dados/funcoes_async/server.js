const express = require('express');
const app = express();
const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')


var db;

async function start() {

    db = await sqlite.open({
        filename: './database.db',
        driver: sqlite3.Database
    });
    db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT)');
    
    app.listen(3000, () => {
        console.log('server is running on port 3000');
    })
}


start();