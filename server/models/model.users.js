// =========================================================================================
//  User
// =========================================================================================
// {
//   "_id":          <uuid>,
//   "email:         "steves@codeuniquely.co.uk",
//   "password":     "D0A045DB85FA20B6ECA4C0FD661946651946F0F203B17CE124B964481AB037DA",
//   "createdDate":  "2017-05-01T00:00:00.000",
//   "resetToken":   "b9f7a72e-5b0c-11e7-907b-a6006ad3dba0",
//   "resetDate":    "2017-06-27T08:47:15.294",
//   disabled:       false
// }
// =========================================================================================
module.exports = function(endpoint, injectables, BaseSchema) { // , validations) {

  const mongoose = injectables.mongoose;
  const bcrypt = injectables.bcrypt;
  const config = injectables.config;
  const Schema = mongoose.Schema;

  // allowed pressure Units
  const pressureUnits = [
    'kPa',
    'PSI',
    'bar',
  ];

  const depthUnits = [
    'mm',
    '1/32"',
  ];

  // ideal tyre data - if pressent
  const tyreSchema = new Schema({
    id: { type: String, required: true },
    pressure: { type: Number, required: true },
  });

  // what a car regsiatrtion will look like
  const registrationSchema = new Schema({
    plate: { type: String, required: true },
    fromDate: { type: Date, default: Date.now, required: true },
    ideal: [tyreSchema]
  });

  // greeting: ''
  // givenName: ''
  // lastName:  ''
  // email: { type: String, required: true },
  // password: { type: String, required: true },
  // created: { type: Date, default: Date.now, required: true },
  // resetToken: { type: String },
  // resetDate: { type: Date },
  // disabled: { type: Boolean },
  // lastLoggedInDate: '... ISO ...'
  // termsAccepted:  true / false
  // phoneNumber: '07557228182'  ????????
  // registrations:[
  //   { key: '123EZAX', plate: 'L5MNE', fromDate: '2017-08-01T08:20:00.000' },
  //   { key: '17AEZ8P', plate: 'L5CDU', fromDate: '2017-08-03T07:50:00.000' }
  // ]

  // name the model by ['endpoint']
  var schema = new BaseSchema(endpoint);

  schema.add({
    // email: { type: String, required: true. index:{ unique:true, name:'email' } },
    email: { type: String, required: true },
    password: { type: String, required: true },
    disabled: { type: Boolean },

    // account tracking properties
    created: { type: Date, default: Date.now, required: true },
    lastLoggedInDate: { type: Date },
    resetToken: { type: String },
    resetDate: { type: Date },

    // other stuff the user can set / optional
    greeting: { type: String },
    foreName: { type: String },
    lastName: { type: String },
    termsAccepted: { type: Boolean, default:false },

    // unit choices
    presureUnits: { type: String, enum:pressureUnits },
    depthUnits: { type: String, enum:depthUnits },

    // will have zero or more registration records allocated
    registrations: [registrationSchema]
  });

  // Add indexes other than _id
  schema.index({ email: 1 }, { unique: true, name: 'email' });
  // schema.index({ resetToken: 1 }, { name: 'reset-token' });

  // helper method to 'project' a single record
  // schema.statics.populateSingleResponse = function(query) {
  //   query.select('email created resetToken resetToken disabled');
  // };

  // on create a reord
  schema.pre('save', function saveHook(next) {
    const user = this;

    // proceed further only if the password is modified or the user is new
    if (!user.isModified('password')) {
      return next();
    }

    return bcrypt.genSalt((saltError, salt) => {
      if (saltError) {
        return next(saltError);
      }

      return bcrypt.hash(user.password, salt, (hashError, hash) => {
        if (hashError) {
          return next(hashError);
        }

        // replace a password string with hash value
        user.password = hash;
        return next();
      });
    });
  });

  // export default mongoose.model('Session', sessionSchema);
  return mongoose.model(endpoint, schema); // , endpoint);
};
