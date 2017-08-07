// ==================================================================
// Superclass for any Model / Resource.
// ==================================================================
module.exports = function(mongoose) { // , util, increment) {

  // 'borrow' a function directly form node
  let util = require('util');

  const Schema = mongoose.Schema;

  const ExtendedSchema = function(endpoint) {

    if (endpoint.trim().length === 0) {
      throw new Error('No Enpoint was given');
    }

    // Schema Options to apply
    this.options = {
      strict: true,
      timestamps: true,
      runValidators: true,
      context: 'query',
    };

    Schema.apply(this, this.options);

    // add some static function to all our resources
    this.statics = {

      // Globally add a property of 'collectionDisplayName'
      collectionDisplayName: endpoint,

      // for queries against structure of the db
      metaData: function(done) {
        function ensure(obj, prop) {
          if (typeof obj[prop] === 'undefined') {
            obj[prop] = {};
          }
        }

        function defined(prop) {
          return typeof prop !== 'undefined';
        }

        /* eslint-disable complexity */
        function decodeProperty(obj, prop) {
          if (!prop) {
            return;
          }
          if (prop.length && prop.length > 0) {
            obj.array = [];
            for (let i = 0; i < prop.length; i++) {
              const item = {};
              obj.array.push(item);
              decodeProperty(item, prop[i]);
            }
            // obj.props = prop;
          } else {
            // special key only on _id
            if (defined(prop.require)) {
              obj.require = !!prop.require;
            }

            obj.type = prop.type.name;

            if (defined(prop.index)) {
              obj.indexed = !!prop.index;
            }
            if (defined(prop.required)) {
              ensure(obj, 'validation');
              obj.validation.required = !!prop.required;
            }
            if (defined(prop.trim)) {
              ensure(obj, 'functions');
              obj.functions.trim = !!prop.trim;
            }
            if (defined(prop.lowercase)) {
              ensure(obj, 'functions');
              obj.functions.lowercase = !!prop.lowercase;
            }
            if (defined(prop.ref)) {
              ensure(obj, 'lookup');
              obj.lookup.collection = prop.ref;
            }

            if (defined(prop.default)) {
              if (typeof prop.default === 'function') {
                obj.default = 'function: ' + prop.default.name + '()';
              } else {
                obj.default = prop.default;
              }
            }
            // just add the prop for reference
            // obj.props_ref = prop;
          }
        }
        /* eslint-enable complexity */

        const tree = {};
        const result = Object.keys(this.schema.paths);
        result.forEach(key => {
          if (key.indexOf('__') === -1) {
            tree[key] = {};
            const props = this.schema.tree[key];
            decodeProperty(tree[key], props);
          }
        });
        const indexes = this.schema._indexes;
        tree.indexes = indexes;
        // console.log(indexes);
        done(null, tree);
      },
    };

    return this;
  };

  // extend 'schema' with ExtendedSchema
  util.inherits(ExtendedSchema, Schema);

  // return the extended schema
  return ExtendedSchema;
};
