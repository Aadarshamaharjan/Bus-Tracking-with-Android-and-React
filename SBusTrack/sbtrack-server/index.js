const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sbus'
});

connection.connect(err => {
    if(err){
        return err;
    }
});

app.use(cors());

app.get('/', (req,res) => {
    res.send('go to /operations to perform operation')
});

app.get('/check_user', (req,res) => {
    const { name, password } = req.query;
    const SELECT_USER_QUERY = `SELECT id FROM user WHERE name='${name}'`;
    connection.query(SELECT_USER_QUERY, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            if(results.length == 0){
                return res.json({
                    flag: true
                })
            }
            else{
                return res.json({
                    flag: false
                })
            }
        }
    });
});

app.get('/add_user', (req,res) => {
    const { name, password } = req.query;
        const INSERT_USER_QUERY = `INSERT INTO user (name, password) VALUES ('${name}','${password}' )`;
        connection.query(INSERT_USER_QUERY, (err, results) => {
                if(err){
                    //return res.send(err);
                    return res.json({
                        msg: 'Sorry, could not process your request at the moment. Try again later.'
                    })
                }
                else{
                    //return res.send('Successfully added user');
                    return res.json({
                        msg: 'User created succesfully'
                    })
                }
            })
    
});

app.get('/check_favourite', (req,res) => {
    console.log("/check_favourite")
    const { uid, preview, track_title, artist_id,artist_name,album_name,album_id }=req.query;
    const SELECT_FAVOURITE_QUERY = `SELECT id FROM favourite WHERE uid=${uid} AND artist_id=${artist_id} AND album_id=${album_id} AND track_title="${track_title}" LIMIT 1`;
    connection.query(SELECT_FAVOURITE_QUERY, (err, results) => {
        if(err){
            return res.json({
                flag: false
            })
        }
        else{
            if(Array.isArray(results) && results.length){
                console.log(results)                
                console.log("add bhaisakyo!!!!!! nagar nagar")
                return res.json({
                    flag: false
                })
            }
            else{
                console.log(results)
                console.log("add bhako chaina aile samma")
                return res.json({
                    flag: true
                })
            }
        }
    });
});

app.get('/add_favourite', (req,res) => {
    const { uid, preview, track_title, artist_id, artist_name,album_name,album_id }=req.query;
    const INSERT_FAVOURITE_QUERY = `INSERT INTO favourite(uid, preview, track_title, artist_id,artist_name,album_name,album_id) VALUES(${uid}, '${preview}', '${track_title}', '${artist_id}','${artist_name}', '${album_name}', '${album_id}')`;
    connection.query(INSERT_FAVOURITE_QUERY, (err, results) => {
        if(err){
            return res.json({
                msg: 'Sorry, could not process your request at the moment. Try again later.'+err
            })
        }
        else{
            return res.json({
                msg: 'Added to favourite succesfully!'
            })
        }
    });
});

app.get('/request_favourite', (req,res) => {
    const { uid }=req.query;
    const SELECT_FAVOURITE_QUERY = `SELECT * FROM favourite WHERE uid=${uid}`;
    connection.query(SELECT_FAVOURITE_QUERY, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            return res.json({
                data: results
            });
        }
    });
});

app.get('/request_bus', (req,res) => {
    const { pid }=req.query;
    const SELECT_FAVOURITE_QUERY = `SELECT * FROM bus WHERE parentid=${pid}`;
    connection.query(SELECT_FAVOURITE_QUERY, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            return res.json({
                data: results
            });
        }
    });
});

app.get('/remove_favourite', (req,res) => {
    const { id }=req.query;
    const REMOVE_FAVOURITE_QUERY = `DELETE FROM favourite WHERE id=${id}`;
    connection.query(REMOVE_FAVOURITE_QUERY, (err, results) => {
        if(err){
            return res.json({
                msg: 'Failed to remove from favourite!'
            })
        }
        else{
            return res.json({
                msg: 'Successfully removed from favourite!'
            });
        }
    });
});

app.get('/request_user', (req,res) => {
    const { name, password }=req.query;
    const SELECT_USER_QUERY = `SELECT id,name FROM user WHERE name='${name}' AND password='${password}'`;
    connection.query(SELECT_USER_QUERY, (err, results) => {
        if(err){
            return res.send(err)
        }
        else{
            return res.json({
                data: results
            });
        }
    });
});

app.listen(4000, () =>{
	console.log(`Tune it server listening on port 4000`)
});

