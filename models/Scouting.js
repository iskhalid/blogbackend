const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const ScoutingSchema = new Schema({
  title:String,
  heading:String,
  content:String,
  imageUrl:String,
  author:{type:Schema.Types.ObjectId, ref:'User'},
}, {
  timestamps: true,
});

const ScoutingModel = model('Scouting', ScoutingSchema);

module.exports = ScoutingModel;