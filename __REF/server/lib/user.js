module.exports = function support(injectables){

  // =======================================================
  // get ALL of a users a users registrations
  // =======================================================
  const getAllRegistrations = (user) => {
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

  // yes you could use an arrowfunction
  // const isUserRegistered = (user) => user && user.other && user.other.isregistered;
  const isUserRegistered = (user) => {
    if (!user || !user.other) {
      return false;
    }
    return user.other.isregistered;
  };

  const isVehicleInUsersList = (user, vehicleIdentifier) => {
    if (!user || !user.registrations) {
      return false;
    }
    const list = user.registrations.filter(reg => reg.vehicleIdentifier === vehicleIdentifier);
    return list.length > 0;
  };

  return {
    isUserRegistered: isUserRegistered,
    getAllRegistrations: getAllRegistrations,
    isVehicleInUsersList: isVehicleInUsersList,
  };
};
