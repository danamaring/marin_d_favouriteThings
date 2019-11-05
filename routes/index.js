const express = require('express');
const router = express.Router();

const sql = require('../utils/sql');

router.get('/', (req, res) => {
    // should really get the user data here and then fetch it thru, but let's try this asynchronously
    console.log('at the main route');

    let query = "SELECT ID, Thumbnail, Description, FaunaImg, FaunaDescription, FloraImg, FloraDescription FROM tbl_content";

    sql.query(query, (err, result) => {
        if (err) { throw err; console.log(err); }

        //console.log(result); // should see objects wrapped in an array

        console.log(result)

        // render the home view with dynamic data
        res.render('home', { places: result });

    })
})

//dynamic stuff
//this resolves to localhost:3000/id (whatever you put after the slash in the location bar)
router.get('/thing/:id', (req, res) => {
    console.log('hit a dynamic route!');
    console.log(req.params.id);


    let query = `SELECT * FROM tbl_content WHERE ID="${req.params.id}"`;

    sql.query(query, (err, result) => {
        if (err) { throw err; console.log(err); }

        console.log(result); // should see objects wrapped in an array

        // render the home view with dynamic data
        // fetch ID and open a new page
        //test used to be here before the first backtip
        res.render(`${req.params.id}`,{ data: result[0], layout: `${req.params.id}` });

    })

    
})

module.exports = router;