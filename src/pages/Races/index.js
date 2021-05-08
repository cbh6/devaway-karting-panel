import React, { useCallback } from 'react';
import { useLocation } from 'wouter';
import { useData } from 'context/DataContext';
import Spinner from 'components/Spinner';

import styles from './Races.module.scss';

export default function RacesPage() {
  const [, setLocation] = useLocation();
  const { rankingByRace, drivers } = useData();

  const navigateToDriverPage = useCallback((driverId) => setLocation(`/driver/${driverId}`), [setLocation]);

  return (
    <>
      <h2>Races</h2>
      {Object.keys(rankingByRace).length ? (
        <section className={styles.races}>
          {Object.keys(rankingByRace).map((race) => (
            <article className={styles.race} key={race}>
              <div className={styles.race__title}>{race}</div>
              <div className={styles.race__podium}>
                <div
                  className={styles['race__podium--second']}
                  onClick={() => navigateToDriverPage(rankingByRace[race][1])}
                >
                  {drivers[rankingByRace[race][1]].name} <span>2</span>
                </div>
                <div
                  className={styles['race__podium--first']}
                  onClick={() => navigateToDriverPage(rankingByRace[race][0])}
                >
                  {drivers[rankingByRace[race][0]].name} <span>1</span>
                </div>
                <div
                  className={styles['race__podium--third']}
                  onClick={() => navigateToDriverPage(rankingByRace[race][2])}
                >
                  {drivers[rankingByRace[race][2]].name} <span>3</span>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <Spinner />
      )}
    </>
  );
}
