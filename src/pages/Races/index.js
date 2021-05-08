import React from 'react';
import { useData } from 'context/DataContext';
import Spinner from 'components/Spinner';

import styles from './Races.module.scss';

export default function RacesPage() {
  const { rankingByRace, drivers } = useData();

  return (
    <>
      <h2>Races</h2>
      {Object.keys(rankingByRace).length ? (
        <section className={styles.races}>
          {Object.keys(rankingByRace).map((race) => (
            <article className={styles.race} key={race}>
              <div className={styles.race__title}>{race}</div>
              <div className={styles.race__podium}>
                <div className={styles['race__podium--second']}>
                  {drivers[rankingByRace[race][1]].name} <span>2</span>
                </div>
                <div className={styles['race__podium--first']}>
                  {drivers[rankingByRace[race][0]].name} <span>1</span>
                </div>
                <div className={styles['race__podium--third']}>
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
