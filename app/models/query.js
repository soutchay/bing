var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuerySchema = new Schema ({
    query: String,
    results: []
});

//query model to retrieve search results
module.exports = mongoose.model('Query', QuerySchema);