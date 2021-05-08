import React from 'react';
import { Route, Switch } from 'wouter';

import { DataProvider } from 'context/DataContext';
import Ranking from 'pages/Ranking';
import Races from 'pages/Races';
import Driver from 'pages/Driver';
import Header from 'components/Header';

import './App.css';

function App() {
  return (
    <DataProvider>
      <div className="app">
        <section className="app-content">
          <Header />
          <Switch>
            <Route component={Ranking} path="/" />
            <Route component={Races} path="/races" />
            <Route component={Driver} path="/driver/:id" />
          </Switch>
        </section>
      </div>
    </DataProvider>
  );
}

export default App;
