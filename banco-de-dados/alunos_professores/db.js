const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')

async function connectDB() {
    return await sqlite.open({
        filename: './database.db',
        driver: sqlite3.Database
    })
}

module.exports = { connectDB }