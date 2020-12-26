const {model, Schema} = require("mongoose");

const schema = new Schema({
    Key: String,
    Value: Object
});

const _model = model("anys", schema);
module.exports = _model;