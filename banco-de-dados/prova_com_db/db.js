const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

async function connect() {
    return await sqlite.open({
        filename: './database.db',
        driver: sqlite3.Database
    });
}

module.exports = { connect };