import { timeStringToMS, transformDriversData, getRankingByRace, getGlobalRankingByPoints } from './utils';
import DRIVERS_DATA from './data';

describe('DataContext utils', () => {
  test('timeStringToMS function', () => {
    expect(timeStringToMS()).toBeUndefined();
    expect(timeStringToMS('1:54:32.554')).toBe(6872554);
    expect(timeStringToMS('2:12:00.901')).toBe(7920901);
  });

  test('transformDriversData function', () => {
    expect(transformDriversData()).toBeUndefined();
    expect(transformDriversData([])).toEqual({});
    expect(transformDriversData([DRIVERS_DATA[0]])).toStrictEqual({
      '5f3a3c5faa55d5c4ea549ac1': {
        age: 38,
        name: 'Padilla Adkins',
        picture: 'http://placehold.it/64x64',
        races: {
          'Race 0': { time: '1:11:39.515', timeInMS: 4299515 },
          'Race 1': { time: '1:17:24.312', timeInMS: 4644312 },
          'Race 2': { time: '1:22:29.376', timeInMS: 4949376 },
          'Race 3': { time: '1:10:34.491', timeInMS: 4234491 },
          'Race 4': { time: '1:51:45.103', timeInMS: 6705103 },
          'Race 5': { time: '1:44:16.158', timeInMS: 6256158 },
          'Race 6': { time: '1:30:14.658', timeInMS: 5414658 },
          'Race 7': { time: '1:29:41.505', timeInMS: 5381505 },
          'Race 8': { time: '1:47:52.109', timeInMS: 6472109 },
          'Race 9': { time: '1:23:38.271', timeInMS: 5018271 }
        },
        team: 'EURON'
      }
    });
  });

  test('getRankingByRace function', () => {
    expect(getRankingByRace()).toBeUndefined();
    expect(getRankingByRace([])).toEqual({});
    expect(getRankingByRace(DRIVERS_DATA.slice(0, 2))).toStrictEqual({
      'Race 0': ['5f3a3c5faa55d5c4ea549ac1', '5f3a3c5f4984bd9be6a6f655'],
      'Race 1': ['5f3a3c5faa55d5c4ea549ac1', '5f3a3c5f4984bd9be6a6f655'],
      'Race 2': ['5f3a3c5faa55d5c4ea549ac1', '5f3a3c5f4984bd9be6a6f655'],
      'Race 3': ['5f3a3c5f4984bd9be6a6f655', '5f3a3c5faa55d5c4ea549ac1'],
      'Race 4': ['5f3a3c5f4984bd9be6a6f655', '5f3a3c5faa55d5c4ea549ac1'],
      'Race 5': ['5f3a3c5f4984bd9be6a6f655', '5f3a3c5faa55d5c4ea549ac1'],
      'Race 6': ['5f3a3c5f4984bd9be6a6f655', '5f3a3c5faa55d5c4ea549ac1'],
      'Race 7': ['5f3a3c5f4984bd9be6a6f655', '5f3a3c5faa55d5c4ea549ac1'],
      'Race 8': ['5f3a3c5f4984bd9be6a6f655', '5f3a3c5faa55d5c4ea549ac1'],
      'Race 9': ['5f3a3c5faa55d5c4ea549ac1', '5f3a3c5f4984bd9be6a6f655']
    });
  });

  test('getGlobalRankingByPoints function', () => {
    const rankingByRace = getRankingByRace(DRIVERS_DATA);
    expect(getGlobalRankingByPoints()).toBeUndefined();
    expect(getGlobalRankingByPoints({})).toEqual([]);
    expect(getGlobalRankingByPoints(rankingByRace)).toStrictEqual([
      { driverId: '5f3a3c5f8df3fe2e8c6ae477', rankingData: { podiums: 3, points: 91, wins: 2 } },
      { driverId: '5f3a3c5f37ce779261434517', rankingData: { podiums: 3, points: 78, wins: 2 } },
      { driverId: '5f3a3c5f0e202f4a527bf502', rankingData: { podiums: 3, points: 63, wins: 1 } },
      { driverId: '5f3a3c5fdc6f6738e4f35dd7', rankingData: { podiums: 2, points: 55, wins: 2 } },
      { driverId: '5f3a3c5f8a23c3e2c85cab74', rankingData: { podiums: 2, points: 51, wins: 1 } },
      { driverId: '5f3a3c5f0c713e786503e798', rankingData: { podiums: 3, points: 49, wins: 0 } },
      { driverId: '5f3a3c5fc4c1a2c2dd9df702', rankingData: { podiums: 3, points: 47, wins: 0 } },
      { driverId: '5f3a3c5f355a5be1fb74076a', rankingData: { podiums: 2, points: 47, wins: 0 } },
      { driverId: '5f3a3c5f086b43d06ac5a984', rankingData: { podiums: 3, points: 46, wins: 0 } },
      { driverId: '5f3a3c5f86cbcda872a8f1ed', rankingData: { podiums: 2, points: 39, wins: 0 } },
      { driverId: '5f3a3c5f4984bd9be6a6f655', rankingData: { podiums: 1, points: 38, wins: 0 } },
      { driverId: '5f3a3c5f0a5f78c603fc1d14', rankingData: { podiums: 1, points: 37, wins: 0 } },
      { driverId: '5f3a3c5faa55d5c4ea549ac1', rankingData: { podiums: 0, points: 36, wins: 0 } },
      { driverId: '5f3a3c5f8bd0087dc1b70b77', rankingData: { podiums: 1, points: 34, wins: 1 } },
      { driverId: '5f3a3c5f2744fa89349fe0f3', rankingData: { podiums: 2, points: 33, wins: 0 } },
      { driverId: '5f3a3c5f5a4ce67633e028ad', rankingData: { podiums: 1, points: 32, wins: 0 } },
      { driverId: '5f3a3c5f970bc40e21b8ee63', rankingData: { podiums: 2, points: 30, wins: 0 } },
      { driverId: '5f3a3c5ff1c5e552442b292d', rankingData: { podiums: 1, points: 29, wins: 0 } },
      { driverId: '5f3a3c5f65e328c1a1263781', rankingData: { podiums: 1, points: 29, wins: 1 } },
      { driverId: '5f3a3c5fde8d2bb91cab3352', rankingData: { podiums: 1, points: 26, wins: 0 } },
      { driverId: '5f3a3c5f876488cda4de309a', rankingData: { podiums: 2, points: 21, wins: 0 } },
      { driverId: '5f3a3c5fc42b87fc0d6e31a9', rankingData: { podiums: 1, points: 19, wins: 0 } }
    ]);
  });
});
