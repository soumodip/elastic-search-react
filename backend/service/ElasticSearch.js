import elasticsearch from  "elasticsearch";
import Promise from "promise";

// SET MAXIMUM NUMBER OF TRY TO CONNECT
let maxTry = 5;
let elasticSearch;

// RETURNS A PROMISE TO CONNECT TO ELASTIC SEARCH
exports.connectToElasticSearch = () => {
    return new Promise((resolve, reject) => createElasticSearchClient(0, resolve, reject));
};

// RETURNS CURRENT ELASTIC SEARCH DATA
exports.getElasticSearch = () => {
    return elasticSearch;
}

// CREATES A ELASTIC SEARCH CLIENT
function createElasticSearchClient(count = 0, resolve, reject) {
    if (count === maxTry) {
        elasticSearch = {};
        reject(elasticSearch);
    } else {
        // INITIALIZE A CLIENT
        let client = new elasticsearch.Client({
            hosts: [ "http://localhost:9200"]
        });
        checkClientConnected(client, count, resolve, reject);
    }
}

// CHECKS SERVER IS CONNECTED OR NOT
function checkClientConnected(client, count, resolve, reject) {
    // CHECK STATUS OF ELASTIC SEARCH
    client.ping({
        requestTimeout: 30000,
    }, function(error) {
        if (error) {
            return createElasticSearchClient(count + 1, resolve, reject)
        } else {
            elasticSearch = { client: client };
            resolve(elasticSearch);
        }
    });
}