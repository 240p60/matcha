import React from 'react';
import classNames from 'classnames';
import styles from './Matchs.module.scss';

import { PictureSlider } from '../index';
import Close from './close.svg';
import Heart from './heart.svg';

export const Item = ({ data }) => {
  const setLike = (uid) => {
    fetch('http://localhost:3000/like/set', {
      method: 'POST',
      body: JSON.stringify({
        otherUid: uid,
        'x-auth-token': sessionStorage.getItem('x-auth-token'),
      })
    }).then(res => console.log(res.status));
  }

  const unsetLike = (uid) => {
    fetch('http://localhost:3000/like/unset', {
      method: 'POST',
      body: JSON.stringify({
        otherUid: uid,
        'x-auth-token': sessionStorage.getItem('x-auth-token'),
      })
    }).then(res => console.log(res.status));
  }

  return (
    <div id={data.uid} className={styles.matchsItem}>
      <div className={styles.itemArea}>
        <PictureSlider height="320px" uid={data.uid} />
        <div className={styles.itemBottomArea}>
          <div className={styles.itemInfo}>
            <div className={styles.itemMainInfo}>
              <span className={styles.itemName}>{`${data.fname} ${data.lname}, `}</span>
              <span className={styles.itemAge}>{data.age}</span>
            </div>
            <div className={styles.itemBio}>
              <b>Bio:</b> {data.bio}
            </div>
            <div className={styles.itemInterests}>
              <b>Interests:</b> {data.interests.join(', ')}
            </div>
            <div className={styles.itemGender}>
              <b>Gender:</b> {data.gender}
            </div>
            <div className={styles.itemOrientation}>
              <b>Orientation:</b> {data.orientation}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.itemActions}>
        <div className={classNames(styles.itemDislike, 'dislike')} onClick={() => unsetLike(data.uid)}>
          <img src={Close} alt="dislike" />
        </div>
        <div className={classNames(styles.itemLike, 'like')} onClick={() => setLike(data.uid)}>
          <img src={Heart} alt="like" />
        </div>
      </div>
    </div>
  );
};
