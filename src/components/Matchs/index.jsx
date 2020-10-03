import React from 'react';
import classNames from 'classnames';
import { PictureSlider, Range } from '../index';

import styles from './Matchs.module.scss';
import Close from './close.svg';
import Heart from './heart.svg';

export default function Matchs() {
  //   const [users, setUsers] = useState({});
  //   const page = 1;

  React.useEffect(() => {
    fetch('http://localhost:3000/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'x-auth-token': sessionStorage.getItem('x-auth-token'),
      }),
    }).then((res) => console.log(res));
  }, []);
  return (
    <div className={styles.matchs}>
      <div className={styles.inner}>
        <div className={styles.matchsFilters}>
          <Range title="Rating" />
          <Range title="Age" min={18} defaultValue={[18, 30]} />
          <Range
            title="Radius"
            min={1}
            max={10000}
            step={100}
            defaultValue={[1, 1000]}
          />
        </div>
        <div className={styles.matchsContainer}>
          <div className={styles.matchsItem}>
            <div className={styles.itemArea}>
              <PictureSlider height="320px" />
              <div className={styles.itemBottomArea}>
                <div className={styles.itemMainInfo}>
                  <span className={styles.itemName}>{`Rashid Alhoev, `}</span>
                  <span className={styles.itemAge}>{`23`}</span>
                </div>
                <div className={styles.itemBio}>
                  I look like Erick Harris, but you never seen me banging
                </div>
                <div className={styles.itemInterests}>
                  <b>Interests:</b> Hookahs, Sport, Films
                </div>
                <div className={styles.itemGender}>
                  <b>Gender:</b> Male
                </div>
                <div className={styles.itemOrientation}>
                  <b>Orientation:</b> Hetero
                </div>
              </div>
            </div>
            <div className={styles.itemActions}>
              <div className={classNames(styles.itemDislike, 'dislike')}>
                <img src={Close} alt="dislike"></img>
              </div>
              <div className={classNames(styles.itemLike, 'like')}>
                <img src={Heart} alt="like"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
