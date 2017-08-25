//
// Workflow - general process of getting (CRUD) done.
// Also to include functions for states, tracking and utility
//
module.exports = function support(injectables){

  // =======================================================
  // get ALL of a users a users registrations
  // =======================================================
  const checkIfCardExists = (user) => {
    const now = new Date();
    return user.registrations.map(reg => {
      const vehicleIdentifier =reg.vehicleIdentifier;
      const fromDate = new Date(reg.fromDate);
      const toDate = reg.lastViewedDate ? new Date(reg.lastViewedDate) : now;
      return {
        vehicleIdentifier, fromDate, toDate
      };
    });
  };

  return {
    checkIfCardExists: checkIfCardExists,
  };
};
