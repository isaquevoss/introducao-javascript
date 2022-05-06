const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')
const express = require('express')

// you would have to import / invoke this in another file
// async function openDb() {
//     return sqlite.open({
//         filename: './tmp/database.db',
//         driver: sqlite3.Database
//     })
// }

// openDb().then(db => {
//     console.log(db)
// }).catch(err => {
//     console.log(err)
// })

async function connectDB() {
    return await sqlite.open({
        filename: './tmp/database.db',
        driver: sqlite3.Database
    })
}
async function start() {
    try {
        const db = await connectDB();
        console.log(db);
    } catch (error) {
        
    }
    express().listen(3000, () => {
        console.log('application is running')
    })
}

start();


