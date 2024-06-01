const {model , Schema} = require("mongoose")
const TagSchema = new Schema({
    name: { type: String, required: true, unique: true }
});

const Tag = model('Tag', TagSchema)

module.exports = Tag