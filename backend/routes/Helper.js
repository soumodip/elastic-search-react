exports.jsonResponse = (res, statusCode, success, connected, data) => {
    let responseData = {
        success: success,
        connected: connected
    };
    if (data !== undefined) {
        responseData.data = data;
    }
    res.status(statusCode).json(responseData);
}

exports.formatFilter = (filterObject) => {
    let query = [];
    (Object.keys(filterObject)).map((key, index) => {
        // USING A COMBINATION OF FUZZY AND REGEX
        let fuzzyQuery = {};
        fuzzyQuery["fuzzy"] = {};
        fuzzyQuery.fuzzy[key] = filterObject[key];
        query.push(fuzzyQuery);
        let wildcardQuery = {};
        wildcardQuery["wildcard"] = {};
        wildcardQuery.wildcard[key] = "*" + filterObject[key] + "*";
        query.push(wildcardQuery);
    }); // IT FORMS { "match": { key: value }}
    return query;
}