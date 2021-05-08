import React from 'react';
import { useData } from 'context/DataContext';
import Spinner from 'components/Spinner';

export default function RankingPage() {
  const { data } = useData();

  return (
    <>
      <h2>Ranking</h2>
      {data.length ? data.map((driver) => <p>{driver.name}</p>) : <Spinner />}
    </>
  );
}
