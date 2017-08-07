// =========================================================================================
//  Session
// =========================================================================================
// {
//   "id":53,
//   "sessionDate":"2017-05-01T00:00:00",
//   "sessionRef":1,
//   "schoolId":52,
//   "courseName":"Course 1",
//   "runners":[
//     {
//       "id":74,
//       "laps":0
//     },
//     {
//       "id":75,
//       "laps":0
//     },
//     {
//       "id":76,
//       "laps":0
//     }
//   ]
// }
// =========================================================================================
module.exports = function(endpoint, mongoose, BaseSchema) { // , validations) {

  const Schema = mongoose.Schema;

  // Laps Schema
  const lapsSchema = new Schema({
    // id: { type: Number, ref: 'runner', required: true },
    id: { type: Number, required: true },   // ref Runner
    laps: { type: Number, required: true },
  });

  var schema = new BaseSchema(endpoint);

  schema.add({
    id: { type: Number, required: true },
    sessionDate: { type: Date, required: true },
    sessionRef: { type: Number, required: true },
    schoolId: { type: Number, required: true },
    courseName: { type: String, required: true },
    runners: [lapsSchema],
  });

  // Add indexes other than _id
  // schema.index({ schoolId: 1 }, { unique: false, name: 'school' });
  // schema.index({ schoolId: 1, courseName:2 }, { unique: false, name: 'school-course' });

  // export default mongoose.model('Session', sessionSchema);
  return mongoose.model(endpoint, schema); // , endpoint);
};
