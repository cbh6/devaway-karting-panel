import React, { useCallback } from 'react';
import { useLocation } from 'wouter';
import { useData } from 'context/DataContext';
import Spinner from 'components/Spinner';

import styles from './Ranking.module.scss';

export default function RankingPage() {
  const [, setLocation] = useLocation();
  const { globalRanking, drivers } = useData();

  const getPodiumClass = (position) => {
    if (position === 1) return styles['ranking-row--first'];
    if (position === 2) return styles['ranking-row--second'];
    if (position === 3) return styles['ranking-row--third'];
    return;
  };

  const navigateToDriverPage = useCallback((driverId) => setLocation(`/driver/${driverId}`), [setLocation]);

  return (
    <>
      <h2>Ranking</h2>
      {globalRanking.length ? (
        <div className={styles.ranking}>
          <div className={`${styles['ranking-row']} ${styles['ranking-row--header']} `}>
            <div>POS</div>
            <div>DRIVER</div>
            <div>TEAM</div>
            <div>PTS</div>
            <div>PODIUMS</div>
            <div>WINS</div>
          </div>
          {globalRanking.map(({ driverId, rankingData }, index) => (
            <div
              className={`${styles['ranking-row']} ${getPodiumClass(index + 1)}`}
              key={driverId}
              onClick={() => navigateToDriverPage(driverId)}
            >
              <div>{index + 1}</div>
              <div>
                <strong>{drivers[driverId].name}</strong>
              </div>
              <div>{drivers[driverId].team}</div>
              <div>{rankingData.points}</div>
              <div>{rankingData.podiums}</div>
              <div>{rankingData.wins}</div>
            </div>
          ))}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}
