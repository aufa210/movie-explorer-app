import React from 'react';
import styles from './Home.module.scss';

export const Home: React.FC = () => {
  return (
    <div>
      <h1 className={styles.tes}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
        asperiores iste necessitatibus velit odio voluptate doloremque magnam
        expedita laborum, repudiandae mollitia quisquam natus quo sequi suscipit
        iusto! Labore, quas voluptatem!
      </h1>

      <div className={styles.box}></div>
    </div>
  );
};
