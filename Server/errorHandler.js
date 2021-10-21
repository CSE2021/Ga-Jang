function returnResults(err, res, results) {
    var result = {};
    if(err) {
        res.status(400);
        result.message = err.stack;
    } else {
        res.status(200);
        result.message = "Success";
        result.result = results;
    }
    result.status = res.statusCode;
    res.json(result);
}
module.exports = returnResults;