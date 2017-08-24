
module.exports = function support(injectables){

  // internal list representation
  let data = [];

  // clear the list
  function clear() {
    data = [];
  }

  // =======================================================
  // find vehicle by identifier in exiting data or create it
  // =======================================================
  const getVehicle = (identifier) => {
    // itterate data looking for vin
    let found;
    for(let i=0 ; i < data.length ; i++) {
      if ( data[i].vehicleIdentifier === identifier) {
        found = data[i];
        break;
      }
    }
    if (!found) {
      found = {
        vehicleIdentifier: identifier,
        history: [],
      };
      data.push(found);
    }
    return found;
  };

  // =======================================================
  // Combine the various queries into same vehicles
  // =======================================================
  const combineResults = (response) => {

    // where the data is going to go
    clear();

    // there may be more than one task that ran
    response.forEach( task => {

      let vehicle;

      // records in atask wil be for same vehicle
      task.forEach( record => {

        // dont care - just attach to the right vehicle record record
        vehicle = getVehicle(record.vehicleIdentifier);

        const dateTime = record.magsensorhighdttm;
        const tyres = record.t;

        const readings = tyres.map(tyre => {
          return {
            id: `${tyre.axleno}${tyre.tyreno}`,
            pressure: parseFloat(tyre.pressurekpa || 0),
            depth: parseFloat(tyre.treaddepth || -1),
            good: tyre.treaddepthwithgoodreadings || false,
          };
        });

        const driveOver = {
          timestamp: dateTime,
          tyres: readings,
        };

        // just push them into the first record
        vehicle.history.push(driveOver);
      });
    });
    return data;
  }

  return {
    getVehicle: getVehicle,
    combineResults: combineResults,
  };
};
