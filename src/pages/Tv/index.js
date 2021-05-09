import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import RacesPage from 'pages/Races';
import RankingPage from 'pages/Ranking';
import DriverPage from 'pages/Driver';
import Spinner from 'components/Spinner';

import { useData } from 'context/DataContext';

// import styles from './Tv.module.scss';

const TRANSITION_INTERVAL = 3000;
const TRANSITION_PAGES = [
  { type: 'Ranking' },
  { type: 'Races' },
  { type: 'Driver', id: '5f3a3c5faa55d5c4ea549ac1' },
  { type: 'Driver', id: '5f3a3c5f4984bd9be6a6f655' },
  { type: 'Driver', id: '5f3a3c5fc4c1a2c2dd9df702' },
  { type: 'Driver', id: '5f3a3c5f8a23c3e2c85cab74' },
  { type: 'Driver', id: '5f3a3c5f355a5be1fb74076a' },
  { type: 'Ranking' },
  { type: 'Races' },
  { type: 'Driver', id: '5f3a3c5fc42b87fc0d6e31a9' },
  { type: 'Driver', id: '5f3a3c5f86cbcda872a8f1ed' },
  { type: 'Driver', id: '5f3a3c5f65e328c1a1263781' },
  { type: 'Driver', id: '5f3a3c5fde8d2bb91cab3352' },
  { type: 'Driver', id: '5f3a3c5f5a4ce67633e028ad' },
  { type: 'Ranking' },
  { type: 'Races' },
  { type: 'Driver', id: '5f3a3c5f0e202f4a527bf502' },
  { type: 'Driver', id: '5f3a3c5ff1c5e552442b292d' },
  { type: 'Driver', id: '5f3a3c5f086b43d06ac5a984' },
  { type: 'Driver', id: '5f3a3c5f2744fa89349fe0f3' },
  { type: 'Driver', id: '5f3a3c5f970bc40e21b8ee63' },
  { type: 'Ranking' },
  { type: 'Races' },
  { type: 'Driver', id: '5f3a3c5f0a5f78c603fc1d14' },
  { type: 'Driver', id: '5f3a3c5f876488cda4de309a' },
  { type: 'Driver', id: '5f3a3c5f8bd0087dc1b70b77' },
  { type: 'Driver', id: '5f3a3c5f8df3fe2e8c6ae477' },
  { type: 'Driver', id: '5f3a3c5f0c713e786503e798' },
  { type: 'Ranking' },
  { type: 'Races' },
  { type: 'Driver', id: '5f3a3c5f37ce779261434517' },
  { type: 'Driver', id: '5f3a3c5fdc6f6738e4f35dd7' },
  { type: 'Driver', id: '5f3a3c5fdc6f6738e4f35dd7' }
];

export default function TvPage() {
  const { isTVMode, setIsTVMode } = useData();

  useEffect(() => {
    // Enable TV Mode if user access to /tv url directly
    if (!isTVMode) setIsTVMode(true);
  });

  const Ranking = useMemo(() => <RankingPage />, []);
  const Races = useMemo(() => <RacesPage />, []);

  const [currentPage, setCurrentPage] = useState(Ranking);
  const currentPageIndex = useRef(0);

  const getPageComponent = useCallback(
    (transitionPage) => {
      if (transitionPage.type === 'Ranking') return Ranking;
      if (transitionPage.type === 'Races') return Races;
      return <DriverPage driverId={transitionPage.id} />;
    },
    [Ranking, Races]
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextPageIndex = (currentPageIndex.current + 1) % TRANSITION_PAGES.length;
      const nextPage = getPageComponent(TRANSITION_PAGES[nextPageIndex]);
      currentPageIndex.current = nextPageIndex;

      setCurrentPage(nextPage);
    }, TRANSITION_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  });
  return currentPage || <Spinner />;
}
