// database.js
const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});

const execute = async(query) => {
    //set a client to get a connection;
    const client = await pool.connect();
    try {
        await client.query(query);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        client.release(); // Missing from practicals - release the connection back to the pool
    }
};

const createPostTableQuery  = `
    CREATE TABLE IF NOT EXISTS "posttable" (
	    "id" SERIAL PRIMARY KEY,         
	    "title" VARCHAR(200) NOT NULL,
	    "body" VARCHAR(200) NOT NULL,
        "urllink" VARCHAR(200)  
    );`;

const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS "users" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL 
    );`;

const initializeTables = async () => {
    const postsResult = await execute(createPostTableQuery);
    if (postsResult) {
        console.log('Table "posttable" is created');
    }

    const usersResult = await execute(createUsersTableQuery);
    if (usersResult) {
        console.log('Table "users" is created');
    }
}
initializeTables().catch(error => {
    console.error('Error initializing tables:', error);
});

module.exports = pool;