import React from 'react';
import { Link } from 'wouter';
import { useData } from 'context/DataContext';

import './Header.css';

export default function Header() {
  const { isTVMode } = useData();

  return (
    !isTVMode && (
      <header className="header">
        <Link to="/">Ranking</Link>
        <Link to="/races">Races</Link>
      </header>
    )
  );
}
