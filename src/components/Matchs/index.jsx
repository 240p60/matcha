import React from 'react';
import classNames from 'classnames';

import styles from './Matchs.module.scss';
import Close from './close.svg';
import Heart from './heart.svg';
import Sesh from './sesh.jpg';

export default function Matchs() {
  //   const [users, setUsers] = useState({});
  //   const page = 1;

  //   useEffect(() => {
  //     fetch(`http://localhost:3000/matchs/users/${page}`)
  //       .then((res) => res.json())
  //       .then((data) => setUsers(data));
  //   }, [users]);
  return (
    <div className={styles.matchs}>
      <div className={styles.inner}>
        <div className="matchs__container">
          <div className={styles.matchsItem}>
            <div className={styles.itemArea}>
              <div className={styles.itemImage}>
                <img src={Sesh} alt="Картинка" />
              </div>
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
