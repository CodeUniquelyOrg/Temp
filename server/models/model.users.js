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

  const roleOptions = [
    'driver',
    'manager',
    'admin',
  ];

  // allowed pressure Units
  const pressureUnits = [
    'kPa',
    'psi',
    'bar',
    'none',
  ];

  const depthUnits = [
    'mm',
    '1/32"',
    'none',
  ];

  const themesAvailable = [
    'light',
    'dark',
  ];

  // https://en.wikipedia.org/wiki/Car_colour_popularity
  // const vehicleColours = [
  //   'white',
  //   'silver',
  //   'black',
  //   'grey',
  //   'blue',
  //   'red',
  //   'brown',
  //   'green',
  //   'other',
  // ];

  // drivers preferences
  const preferencesSchema = new Schema({
    language: { type: String, required: true },
    presureUnits: { type: String, enum:pressureUnits },
    depthUnits: { type: String, enum:depthUnits },    // now to bring in default for locale ?
    showUnits:{ type: Boolean, default: false },      // now to bring in default for locale ?
    contactBySMS: { type: Boolean, default: false },
    contactByEmail: { type: Boolean, default: false },
    contactInApp: { type: Boolean, default: true },
    showTutorial: { type: Boolean, default: true },
    themeToUse: { type: String, enum:themesAvailable, default:'light' },
  });

  // Holding address information
  const addressSchema = new Schema({
    line1: { type: String },
    line2: { type: String },
    line3: { type: String },
    line4: { type: String },
    line5: { type: String },
  });

  const contactBySchema = new Schema({
    mobile: { type: String },
    email: { type: String },
  });

  // This schema is 'in-toto' OPTIONAL
  const nameSchema = new Schema({
    pronoun: { type: String },      // MUST be 'Free Text' -
    foreName: { type: String, required: true },
    lastName: { type: String, required: true },
  });

  // 'ideal' tyre data - if pressent
  const tyreSchema = new Schema({
    id: { type: String, required: true },
    pressure: { type: Number, required: true },
  });

  const vehicleSchema = new Schema({
    make: { type: String },
    model: { type: String },
    year: { type: String },
    color: { type: String },
  });

  // What a car regsiatrtion will look like
  const registrationSchema = new Schema({
    vehicleIdentifier: { type: Number },
    plate: { type: String, required: true },
    normalizedPlate: { type: String, uppercase:true, required: true },  // ????
    fromDate: { type: Date, default: Date.now, required: true },
    lastViewedDate: { type: Date },
    vehicle: vehicleSchema,
    ideal: [tyreSchema],
  });

  // stuff about the driver
  const personalSchema = new Schema({
    avatar: { type: String },
    greeting: { type: String },
    name: nameSchema,
    contactBy: contactBySchema,
    address: addressSchema,
  });

  const otherSchema = new Schema({
    essoDeutscheCardNumber: { type: String },
    registeredUser: { type: Boolean, default:false },
    termsAccepted: { type: Boolean, default:false },
  });

  // name the model by ['endpoint']
  var schema = new BaseSchema(endpoint);

  schema.add({
    // email: { type: String, required: true. index:{ unique:true, name:'email' } },
    email: { type: String, required: true },
    password: { type: String, required: true },
    disabled: { type: Boolean },

    // account admin & tracking properties
    created: { type: Date, default: Date.now, required: true },
    lastLoggedInDate: { type: Date },
    resetToken: { type: String },
    resetDate: { type: Date },

    // roles applicable to user
    roles: [{ type: String, enum:roleOptions, required: true }],

    // the preferred unit choices
    preferences: preferencesSchema,

    // will have zero or more registration records allocated
    registrations: [registrationSchema],

    personal: personalSchema,

    other: otherSchema,
  });

  // *** Really need another identifer - other than EMAIL !!! ***

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

    return bcrypt.genSalt(10, (saltError, salt) => {
      if (saltError) {
        return next(saltError);
      }

      // return bcrypt.hash(user.password, salt, (hashError, hash) => {
      return bcrypt.hash(user.password, salt, null, (hashError, hash) => {
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
