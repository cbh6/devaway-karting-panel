import React, { useCallback } from 'react';
import { useLocation } from 'wouter';
import icon from './tv.png';
import { useData } from 'context/DataContext';

import styles from './TVButton.module.scss';

export default function TVButton() {
  const { isTVMode, setIsTVMode } = useData();
  const [, setLocation] = useLocation();

  console.log(isTVMode);

  const enableTVMode = useCallback(() => {
    setIsTVMode(true);
    setLocation('/tv');
  }, [setIsTVMode, setLocation]);
  const disableTVMode = useCallback(() => {
    setIsTVMode(false);
    setLocation('/');
  }, [setIsTVMode, setLocation]);

  return (
    <div className={styles.button}>
      {isTVMode ? (
        <div className={styles.disable} onClick={disableTVMode}>
          Salir del modo TV
        </div>
      ) : (
        <div className={styles.enable} onClick={isTVMode ? disableTVMode : enableTVMode}>
          <img src={icon} alt="Logo" />
        </div>
      )}
    </div>
  );
}
