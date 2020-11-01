import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./Dialogs.module.scss";

export const DialogItem = ({ dialog }) => {
  return (
    <Link to={`/chat/${dialog.uid}`} className={styles.DialogItem}>
      <div className={styles.DialogImage}>
        <picture>
          <source srcSet={dialog.avatar}/>
          <img className="user__picture" src={dialog.avatar} alt="user" />
        </picture>
      </div>
      <div className={styles.DialogContent}>
        <div className={styles.CompanionName}>{`${dialog.fname} ${dialog.lname}`}</div>
        <div className={styles.LastMessage}>{dialog.lastMessageBody || 'Начните диалог'}</div>
      </div>
    </Link>
  );
}