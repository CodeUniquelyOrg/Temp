// =========================================================================================
//  Runner
// =========================================================================================
//
// NOT JUST A RUNNER
// CAN ALSO BE A PARENT
//
//
// PARENT
// ==================
// First Name
// Surname
// Email
// Phone
// town/city
// county
// postcode ????

// RUNNER
// ==================
// Firstname
// Surname
// Gender
// School (if they are registered to a school – this will be the only "optional" field)
// DOB
// Year Group
// =========================================================================================
module.exports = function(endpoint, mongoose, BaseSchema) { // ResourceSchema, validations) {

  var schema = new BaseSchema(endpoint);

  schema.add({
    id: { type: Number, required: true },
    forename: { type: String, required: true },
    surname: { type: String, required: true },
    upn: { type: String, required: true },
    gender: { type: Number, required: true },
    ethnicity: { type: String },
    nationality: { type: String },
    firstLanguage: { type: String },
    reg: { type: String, required: true },
    yearGroup: { type: Number, required: true },
    postcode: { type: String },
    schoolId: { type: Number, required: true },
    status: { type: Number, required: true },
    created: { type: Date, default: Date.now, required: true },
  });

  // Add indexes other than _id
  // schema.index({ upn: 1 }, { unique: false, name: 'upn' });
  // schema.index({ postcode: 1 }, { unique: false, name: 'postcode' });
  // schema.index({ schoolId: 1 }, { unique: false, name: 'school' });

  // schema.pre('validate', function(next) {
  //   const model = this;
  //   const entry = this;
  //   validations.runnerMustNotExist(entry, err => {
  //     if (err) {
  //       return next(err);
  //     }
  //     validations.CheckAllRequiredValuesExist(entry, model, err => {
  //       if (err) {
  //         return next(err);
  //       }
  //       validations.CheckAllReferencedValuesExist(entry, model, err => {
  //         if (err) {
  //           return next(err);
  //         }
  //         next();
  //       });
  //     });
  //   });
  // });

  // (since mongoose 4.x) - we must do our own validation
  // schema.pre('findOneAndUpdate', function(next) {
  //   const model = this;
  //   const entry = this._update;
  //   validations.adminMustExist(entry._id, err => {
  //     if (err) {
  //       return next(err);
  //     }
  //     validations.CheckAllRequiredValuesExist(entry, model, err => {
  //       if (err) {
  //         return next(err);
  //       }
  //       validations.CheckAllReferencedValuesExist(entry, model, err => {
  //         if (err) {
  //           return next(err);
  //         }
  //         next();
  //       });
  //     });
  //   });
  // });

  // export default mongoose.model('Runner', runnerSchema);
  return mongoose.model(endpoint, schema); // , endpoint);
};
