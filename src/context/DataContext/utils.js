const RACE_POINTS = [25, 18, 15, 10, 8, 6, 5, 3, 2, 1];

/**
 * Transforms a time in string format 'h:mm:ss.ms' into milliseconds
 * @param {string} time
 * @returns milliseconds
 */
export const timeStringToMS = (time) => {
  if (!time) return;
  const [hours, minutes, secondsMs] = time.split(':');
  if (!hours || !minutes || !secondsMs) return;
  const [seconds, milliseconds] = secondsMs.split('.');
  if (!seconds || !milliseconds) return;

  const hoursMS = parseInt(hours) * 60 * 60 * 1000;
  const minutesMS = parseInt(minutes) * 60 * 1000;
  const secondsMS = parseInt(seconds) * 1000;

  return hoursMS + minutesMS + secondsMS + parseInt(milliseconds);
};

/**
 * Given the driversData JSON array. It returns a transformed object with driverId as keys
 * and the rest of the data as values.
 * Races are structured as dictionaries with the time transformed into MS
 * @param {*} driversData 
 * @returns An object containing driver data + race times in MS
 * 
 * Example:
 * 
 * {
 * "5f3a3c5faa55d5c4ea549ac1": {
        picture: 'http://placehold.it/64x64',
        age: 38,
        name: 'Padilla Adkins',
        team: 'string',
        races: {
            "Race 0": { time: '1:11:39.515', timeInMS: 46371598},
            // ...
        }
    }
 * }
 */
export const transformDriversData = (driversData) => {
  if (!driversData) return;

  // Transform drivers array to a dictionary with each driver._id as keys
  // as values we have the same data, but races array will be another dictionary
  return driversData.reduce((prev, next) => {
    const { _id, races, ...rest } = next;

    // Transform races array to a dictionary with each race.name as keys and race.time (string and in MS) as values
    const racesData = races.reduce((prev, next) => {
      prev[next.name] = {
        time: next.time,
        timeInMS: timeStringToMS(next.time)
      };
      return prev;
    }, {});

    prev[_id] = {
      ...rest,
      races: racesData
    };

    return prev;
  }, {});
};

/**
 * Given the driversData JSON array. It returns the ranking by race
 * @param {*} driversData
 * @returns An object containing raceNames as keys and an array containing driverIds as values
 *          The array value is sorted by drivers times
 *
 * Example of result:
 *
 * {
 *  "Race 0": ["5f3a3c5faa55d5c4ea549ac1", "5f3a3c5f4984bd9be6a6f655"],
 *  "Race 1": ...,
 *  ...,
 * }
 */
export const getRankingByRace = (driversData) => {
  if (!driversData) return;

  // From driversData -> Get dictionary { raceName: [ {driverId: _id, timeinMS }, ...], ...}
  // This allow us to sort times by race
  const racesDictionary = driversData.reduce((prev, next) => {
    const { _id, races } = next;

    races.forEach((race) => {
      const driverRaceData = {
        driverId: _id,
        timeInMS: timeStringToMS(race.time)
      };

      if (!prev[race.name]) {
        prev[race.name] = [driverRaceData];
        return;
      }

      prev[race.name] = [...prev[race.name], driverRaceData];
    });

    return prev;
  }, {});

  // From the above dictionary -> sort by timeInMS and return the result (only returning driverId)
  return Object.entries(racesDictionary).reduce((prev, next) => {
    const [raceName, raceTimes] = next;
    const sorted = raceTimes.sort(function (a, b) {
      if (a.timeInMS > b.timeInMS) {
        return 1;
      }
      if (a.timeInMS < b.timeInMS) {
        return -1;
      }
      return 0;
    });
    prev[raceName] = sorted.map((e) => e.driverId);
    return prev;
  }, {});
};

/**
 * Given the rankingByRace
 * {
 *  "Race 0": ["5f3a3c5faa55d5c4ea549ac1", "5f3a3c5f4984bd9be6a6f655"],
 *  "Race 1": ...,
 *  ...,
 * }
 * Calculates won points by driverId for all the races
 * @param {*} rankingByRace
 * @returns Array of objects containing driverId and { points, podiums, wins }. Sorted by points won
 */
export const getGlobalRankingByPoints = (rankingByRace) => {
  if (!rankingByRace) return;
  // Calculate how many points has each driver won. And set the info into an object
  const driversPoints = Object.values(rankingByRace).reduce((prev, next) => {
    next.forEach((driverId, index) => {
      if (prev[driverId]) {
        prev[driverId] = {
          points: (prev[driverId].points += RACE_POINTS[index] || 0),
          podiums: index <= 3 ? (prev[driverId].podiums += 1) : prev[driverId].podiums,
          wins: index === 0 ? (prev[driverId].wins += 1) : prev[driverId].wins
        };
      } else {
        prev[driverId] = {
          points: RACE_POINTS[index] || 0,
          podiums: index <= 3 ? 1 : 0,
          wins: index === 0 ? 1 : 0
        };
      }
    });
    return prev;
  }, {});

  // Transform the last object into an array in order to allow us sorting
  const driversPointsArray = Object.keys(driversPoints).map((driverId) => ({
    driverId,
    rankingData: driversPoints[driverId]
  }));

  return driversPointsArray.sort((a, b) => b.rankingData.points - a.rankingData.points);
};

export const getTransformedData = (driversData) => {
  const drivers = transformDriversData(driversData);
  const rankingByRace = getRankingByRace(driversData);
  const globalRanking = getGlobalRankingByPoints(rankingByRace);

  return { drivers, rankingByRace, globalRanking };
};
