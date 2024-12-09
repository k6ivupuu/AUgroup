const express = require('express');
const pool = require('./database.js');
const cors = require('cors');
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(express.json());

app.listen(port,() => {
    console.log("Server is listening to port:" + port)
});

app.post('/api/posts/', async(req, res) => {
    try {
        console.log("a post request has arrived");
        const post = req.body;
        const newpost = await pool.query(
            "INSERT INTO posttable(title, body, urllink) values ($1, $2, $3)    RETURNING*", [post.title, post.body, post.urllink]
// $1, $2, $3 are mapped to the first, second and third element of the passed array (post.title, post.body, post.urllink)
// The RETURNING keyword in PostgreSQL allows returning a value from the insert or update statement.
// using "*" after the RETURNING keyword in PostgreSQL, will return everything
        );
        res.json(newpost);
    } catch (err) {
        console.error(err.message);
    }
});

app.use((req, res,next) => {
    console.log('a new request was made to the server');
    next();
});