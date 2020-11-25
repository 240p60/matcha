import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Close } from "./close.svg";
import styles from "./Ignore.module.scss";

export const IgnoreItem = ({ type, unset, item }) => {
  return (
    <div className={styles.DialogItem}>
      <Link to={`/user/page/${item.uid}`} className={styles.DialogImage}>
        <picture>
          <source srcSet={item.avatar}/>
          <img className="user__picture" src={item.useravatar} alt="user" />
        </picture>
      </Link>
      <div className={styles.DialogContent}>
        <Link to={`/user/page/${item.uid}`} className={styles.CompanionName}>{`${item.fname} ${item.lname}`}</Link>
          {(type === 'guests' || type === 'history') && <div className={styles.DialogTime}>{item.time}</div>}
          {(type === 'ignore' || type === 'blacklist') && (
            <div className={styles.DialogLink} onClick={() => unset(item.uid)}>
              <Close />
            </div>
          )}
      </div>
    </div>
  );
}