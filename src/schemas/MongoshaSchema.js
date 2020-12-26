const {model, Schema} = require("mongoose");

const schema = new Schema({
    Key: String,
    Value: Object
});

const _model = model("mongosha", schema);
module.exports = _model;
