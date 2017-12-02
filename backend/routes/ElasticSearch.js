import { getElasticSearch, connectToElasticSearch } from  "./../service/ElasticSearch";
import { jsonResponse, formatFilter } from "./Helper";
import uuidv4 from "uuid/v4";

exports.createUserIndex = () => {
    let elasticSearch = getElasticSearch(); // RETURNS THE ELASTIC SEARCH DATA 
                                            // [ CONNECTED STATUS + CLIENT ]
    if (elasticSearch.client) {
        // CREATES A INDEX - USER ( IF EXIST THEN A ERROR OCCURS )
        (elasticSearch.client).indices.create({
            index: "users",
        }, function(err, resp, status) {
            if (err) {
                if (JSON.parse(err.response).error.type === "resource_already_exists_exception") {
                    console.log("USER INDEX CREATE ALREADY DONE");
                } else {
                    console.log("USER INDEX CREATE FAILED");
                }
            } else {
                console.log("USER INDEX CREATED");
            }
        });
    } else {
        console.log("ELASTIC SEARCH CLIENT NOT CONNECTED");
    }
}

exports.getUsers = (req, res) => {
    let elasticSearch = getElasticSearch(); // RETURNS THE ELASTIC SEARCH DATA 
                                            // [ CONNECTED STATUS + CLIENT ]
    if (elasticSearch.client) {
        let filter = formatFilter(req.query);
        (elasticSearch.client).search({
            index: "users",
            type: "user",
            body: {
                "query": {
                    "bool": {
                        "should": filter
                    }
                 }
            }
        }, function(err, resp, status) {
            if (err) {
                if (err.message === "No Living connections") {
                    jsonResponse(res, 500, false, false, []);
                } else {
                    jsonResponse(res, 400, false, true, []);
                }
            } else {
                jsonResponse(res, 200, true, true, resp.hits.hits);
            }
        });
    } else {
        jsonResponse(res, 500, false, false, []);
    }
};

exports.addUser = (req, res) => {
    let elasticSearch = getElasticSearch(); // RETURNS THE ELASTIC SEARCH DATA 
                                            // [ CONNECTED STATUS + CLIENT ]
    if (elasticSearch.client) {
        let uuid = uuidv4();
        (elasticSearch.client).create({
            index: "users",
            type: "user",
            id: uuid,
            body: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                description: req.body.description
            }
        }, function(err, resp, status) {
            if (err) {
                if (err.message === "No Living connections") {
                    jsonResponse(res, 500, false, false);
                } else {
                    jsonResponse(res, 400, false, true);
                }
            } else {
                let addedUser = {
                    id: resp._id,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    description: req.body.description
                };
                jsonResponse(res, 200, true, true, addedUser);
            }
        });
    } else {
        jsonResponse(res, 500, false, false);
    }
};

exports.editUser = (req, res) => {
    let elasticSearch = getElasticSearch(); // RETURNS THE ELASTIC SEARCH DATA 
                                            // [ CONNECTED STATUS + CLIENT ]
    if (elasticSearch.client) {
        (elasticSearch.client).index({
            index: "users",
            type: "user",
            id: req.body.id,
            body: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                description: req.body.description
            }
        }, function(err, resp, status) {
            if (err) {
                if (err.message === "No Living connections") {
                    jsonResponse(res, 500, false, false);
                } else {
                    jsonResponse(res, 400, false, true);
                }
            } else {
                jsonResponse(res, 200, true, true);
            }
        });
    } else {
        jsonResponse(res, 500, false, false);
    }
};

exports.deleteUser = (req, res) => {
    let elasticSearch = getElasticSearch(); // RETURNS THE ELASTIC SEARCH DATA 
                                            // [ CONNECTED STATUS + CLIENT ]
    if (elasticSearch.client) {
        (elasticSearch.client).delete({
            index: "users",
            type: "user",
            id: req.body.id,
        }, function(err, resp, status) {
            if (err) {
                if (err.message === "No Living connections") {
                    jsonResponse(res, 500, false, false);
                } else {
                    jsonResponse(res, 400, false, true);
                }
            } else {
                jsonResponse(res, 200, true, true);
            }
        });
    } else {
        jsonResponse(res, 500, false, false);
    }
};

exports.reconnectElasticSearch = (req, res) => {
    connectToElasticSearch().then(
        (success) => jsonResponse(res, 200, true, true),
        (error) => jsonResponse(res, 400, true, false)
    )
};
