// =========================================================================================
//  School
// =========================================================================================
// {
//   "_id":<objectId>
//   "id":50,
//   "name":"Chobham Academy",
//   "contactName":"Miss Clarke",
//   "email":"m.clarke@chobhamacademy.org.uk",
//   "postcode":"E20 1BD",
//   "schoolType":1,                  <-- need the *** ENUM TEXT ***
//   "telephone":"02037476060",
//   "leaderBoardOptIn":false,
//   "county":"Greater London",
//   "isInScotland":false,
//   "courses":[
//     {
//       "name":"Course 1",
//       "description":"Width of the a netball court (Cage)",
//       "distanceInMetres":38.00
//     },
//     {
//       "name":"Course 2",
//       "description":"Length of a netball court (length of cage or indoor sports hall)",
//       "distanceInMetres":55.00
//     },
//     {
//       "name":"Course 3",
//       "description":"running distance around the island in the middle of the playground",
//       "distanceInMetres":165.00
//     }
//   ]
// }
// =========================================================================================

module.exports = function(endpoint, mongoose, BaseSchema) { // , validations) {

  // SchoolType Enum
  const options = [
    'Primary',
    'Secondary',
    'Free',
    'Special',
    'Independent',
    'International',
    'HomeEducation',
    'ParentApp',
    'Admin',
    'Infant',
    'Junior',
  ];

  const Schema = mongoose.Schema;

  const courseSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    distanceInMetres: { type: Number, required: true },
  });

  // function convertType(value) {
  //   if( value < 1 || value > options.length) {
  //     throw ValidationException('SchoolType is Invalid', __record_stuff_goes_here__)
  //   }
  //   return options[value-1];
  // }

  var schema = new BaseSchema(endpoint);

  schema.add({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    contactName: { type: String, required: true },
    email: { type: String, required: true },
    postcode: { type: String, required: true },
    schoolType: { type: Number, enum: options, required: true },
    telephone: { type: String, required: true },
    leaderBoardOptIn: { type: Boolean, required: true },
    county: { type: String, required: true },
    isInScotland: { type: Boolean, required: true },
    courses: [courseSchema],
  });

  // Add indexes other than _id
  // schema.index({ county: 1 }, { unique: false, name: 'county' });

  // export default mongoose.model('School', runnerSchema);
  return mongoose.model(endpoint, schema); // , endpoint);
};
