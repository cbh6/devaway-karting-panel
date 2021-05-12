import React, { useMemo } from 'react';
import { useData } from 'context/DataContext';
import Spinner from 'components/Spinner';

import styles from './Driver.module.scss';

export default function DriverPage({ params, driverId }) {
  const { rankingByRace, drivers, globalRanking } = useData();

  const id = driverId || params.id;
  const driverData = drivers[id];

  // Get ranking data from globalRanking object
  const rankingData = useMemo(() => {
    if (!Object.keys(globalRanking).length) return {};
    const index = globalRanking.findIndex((e) => e.driverId === id);
    return { position: index + 1, ...globalRanking[index].rankingData };
  }, [globalRanking, id]);

  if (Object.values(drivers).length && !driverData) {
    return <p className={styles.error}>No driver found with id {id}</p>;
  }

  return (
    <>
      <h2>Driver</h2>
      {driverData ? (
        <div className={styles.container}>
          <section className={styles.info}>
            <div className={styles.info__driver}>
              <img src={driverData.picture} alt="Driver avatar" />
              <h3>{driverData.name}</h3>
              <p>Age: {driverData.age}</p>
              <p>Team: {driverData.team}</p>
            </div>

            <div className={styles.info__ranking}>
              <p className={styles.title}>Global Ranking position</p>
              <p className={styles.position}>{rankingData.position}</p>
              <hr />
              <p>
                Points: <strong>{rankingData.points}</strong>
              </p>
              <p>
                Wins: <strong>{rankingData.wins}</strong>
              </p>
              <p>
                Podiums: <strong>{rankingData.podiums}</strong>
              </p>
            </div>
          </section>

          <h2>Races</h2>
          <section className={styles.races}>
            {Object.keys(rankingByRace).map((raceName) => {
              const position = rankingByRace[raceName].findIndex((e) => e === id) + 1;
              const time = driverData.races[raceName].time;

              return (
                <div className={styles.races__race} key={raceName}>
                  <span>{raceName}</span>
                  <span>
                    Pos: <strong>{position}</strong>
                  </span>
                  <span>
                    Time: <strong>{time}</strong>
                  </span>
                </div>
              );
            })}
          </section>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}
