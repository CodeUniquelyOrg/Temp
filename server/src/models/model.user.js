// =========================================================================================
//  User
// =========================================================================================
// {
//   "_id":               <uuid>,
//   "userId:             "CodeUniquely",
//   "email:              "steves@codeuniquely.co.uk",
//   "normalisedUserId":  "codeuniquely"
//   "normalisedEmail:    "steves@codeuniquely.co.uk",
//   "encodedPassword":   "D0A045DB85FA20B6ECA4C0FD661946651946F0F203B17CE124B964481AB037DA",
//   "roles":             ['Admin','SchoolAdmin','Runner'],
//   "createdDate":       "2017-05-01T00:00:00.000",
//   "resetToken":        "b9f7a72e-5b0c-11e7-907b-a6006ad3dba0",
//   "resetDate":         "2017-06-27T08:47:15.294",
// }
// =========================================================================================
module.exports = function(endpoint, mongoose, BaseSchema) { // , validations) {

  var schema = new BaseSchema(endpoint);

  schema.add({
    userId: { type: String, required: true },
    email: { type: String, required: true },
    normalisedUserId: { type: String, required: true },
    normalisedEmail: { type: String, required: true },
    encodedPassword: { type: String, required: true },
    roles: [{ type: String, required: true }],
    created: { type: Date, default: Date.now, required: true },
    resetToken: { type: String },
    resetDate: { type: Date },
  });

  // Add indexes other than _id
  // schema.index({ normalisedUserId: 1 }, { unique: true, name: 'user-id' });
  // schema.index({ normalisedEmail: 1 }, { unique: true, name: 'email' });
  // schema.index({ resetToken: 1 }, { unique: true, name: 'reset-token' });

  // export default mongoose.model('Session', sessionSchema);
  return mongoose.model(endpoint, schema); // , endpoint);
};
