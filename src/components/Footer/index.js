import React from 'react';

import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      Made with ❤️ by{' '}
      <a href="https://github.com/cbh6" target="_blank" rel="noreferrer">
        <i>Cristian Botella Hurtado</i>
      </a>
    </footer>
  );
}
