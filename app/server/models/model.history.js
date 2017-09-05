// =========================================================================================
//  HISTORY
// =========================================================================================
// {
//   "vehicleIdentifier": 90,
//   "timestamp": "2017-08-11T08:55:43.593",
//   "tyres": [
//     {id: "11", pressure: 228.4134979248047, depth: 5.1999998, good: true},
//     {id: "12", pressure: 227.5163574218756, depth: 9.1999998, good: false},
//     {id: "21", pressure: 222.5199890136719, depth: 5.6999998, good: true},
//     {id: "22", pressure: 247.6747436523438, depth: 6.0000000, good: false},
//   ]
// }
// =========================================================================================
module.exports = function(endpoint, injectables, BaseSchema) { // , validations) {

  const mongoose = injectables.mongoose;
  const Schema = mongoose.Schema;

  const tyreSchema1 = new Schema({
    id: { type: String, required: true },
    depth: { type: Number, required: true },
    pressure: { type: Number, required: true },
    good: { type: Boolean, default: false },
    timestamp: { type: Date, required: true },
  });

  const tyreSchema2 = new Schema({
    id: { type: String, required: true },
    depth: { type: Number, required: true },
    pressure: { type: Number, required: true },
    good: { type: Boolean, default: false },
  });

  // name the model by ['endpoint']
  var schema = new BaseSchema(endpoint);

  // ==================================
  // REALLY - two schema options exist here
  // ==================================

  // schema.add({
  //   vehicleIdentifier: { type: Number, required: true },
  //   tyres:[tyreSchema1],
  // });

  schema.add({
    vehicleIdentifier: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now, required: true },
    tyres: [tyreSchema2],
  });

  // Add indexes other than _id
  schema.index({ vehicleIdentifier: 1 }, { name: 'vid' });

  return mongoose.model(endpoint, schema);
};
