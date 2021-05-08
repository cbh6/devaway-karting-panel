import React, { useMemo } from 'react';
import { useData } from 'context/DataContext';
import Spinner from 'components/Spinner';

import styles from './Driver.module.scss';

export default function DriverPage({ params }) {
  const { rankingByRace, drivers, globalRanking } = useData();

  const driverData = drivers[params.id];
  const rankingData = useMemo(() => {
    if (!Object.keys(globalRanking).length) return {};
    const index = globalRanking.findIndex((e) => e.driverId === params.id);
    console.log(globalRanking[index]);
    return { position: index + 1, ...globalRanking[index].rankingData };
  }, [globalRanking, params.id]);

  if (Object.values(drivers).length && !driverData) {
    return <p className={styles.error}>No driver found with id {params.id}</p>;
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
              <h4>Global Ranking position</h4>
              <p className={styles['high-label']}>{rankingData.position}</p>
              <hr />
              <p className={styles['mid-label']}>
                Points: <span>{rankingData.points}</span>
              </p>
              <p className={styles['mid-label']}>
                Wins: <span>{rankingData.wins}</span>
              </p>
              <p className={styles['mid-label']}>
                Podiums: <span>{rankingData.podiums}</span>
              </p>
            </div>
          </section>

          <section className={styles.races}>
            {Object.keys(rankingByRace).map((raceName) => {
              const position = rankingByRace[raceName].findIndex((e) => e === params.id);
              const time = driverData.races[raceName].time;

              return (
                <div className={styles.races__race} key={raceName}>
                  <span>{raceName}</span>
                  <span>pos: {position}</span>
                  <span>time: {time}</span>
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
