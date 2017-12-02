import express from "express";
import { connectToElasticSearch } from  "./service/ElasticSearch";
import { createUserIndex } from './routes/ElasticSearch';
import bodyParser from 'body-parser';

let app = express();
// TO ACCEPT PUT, POST AND DELETE AND OTHER REQUEST
app.use(bodyParser.json());

// ALLOW CORS - ENABLE THIS IF THIS SERVER IS DIFFERENT THAN THE CLIENT SERVER
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//     next();
// });

app.listen(8080, ()=> {
    // CHECK ELASTIC SEARCH CONNECTION
    connectToElasticSearch().then(
        (success) => {
            console.log("ELASTIC SEARCH CONNECTION STARTED");
            // CREATE USER INDEX ON SERVER START
            createUserIndex();
        },
        (error) => console.log("ELASTIC SEARCH CONNECTION FAILED")
    )
});

// IMPORT ALL ROUTES
import { getUsers, addUser, editUser, deleteUser, reconnectElasticSearch } from './routes/ElasticSearch';

// FOLLOWING CRUD PRINCIPLES - GET - FETCH, PUT - ADD, 
// POST - EDIT AND DELETE - REMOVE
// GETS ALL USERS
app.get("/api/users", getUsers);
// RECONNECTS ELASTIC SEARCH AGAIN
app.get("/api/reconnect", reconnectElasticSearch);
// ADD A USER
app.put("/api/user", addUser);
// EDIT A USER
app.post("/api/user", editUser);
// DELETE A USER
app.delete("/api/user", deleteUser);