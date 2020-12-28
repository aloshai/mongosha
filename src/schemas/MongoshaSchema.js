const {model, Schema, Model} = require("mongoose");

const schema = new Schema({
    Key: String,
    Value: Object
});

const _model = model("mongosha", schema);
/**
 * 
 * @param {String} modelName
 * @returns {Model} 
 */
function createModel(modelName){
    return model(modelName, schema);
}
module.exports = {model: _model, newModel: createModel};