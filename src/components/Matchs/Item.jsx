import React from 'react';
import classNames from 'classnames';
import styles from './Matchs.module.scss';

import { PictureSlider } from '../index';
import Close from './close.svg';
import Heart from './heart.svg';

export const Item = ({ data }) => {
  return (
    <div className={styles.matchsItem}>
      <div className={styles.itemArea}>
        <PictureSlider height="320px" uid={data.uid} />
        <div className={styles.itemBottomArea}>
          <div className={styles.itemMainInfo}>
            <span
              className={styles.itemName}
            >{`${data.fname} ${data.lname}, `}</span>
            <span className={styles.itemAge}>{data.age}</span>
          </div>
          <div className={styles.itemBio}>{data.bio}</div>
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
      <div className={styles.itemActions}>
        <div className={classNames(styles.itemDislike, 'dislike')}>
          <img src={Close} alt="dislike"></img>
        </div>
        <div className={classNames(styles.itemLike, 'like')}>
          <img src={Heart} alt="like"></img>
        </div>
      </div>
    </div>
  );
};
