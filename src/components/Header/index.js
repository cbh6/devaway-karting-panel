import React from 'react';
import { Link } from 'wouter';

import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <Link to="/">Ranking</Link>
      <Link to="/races">Races</Link>
    </header>
  );
}
