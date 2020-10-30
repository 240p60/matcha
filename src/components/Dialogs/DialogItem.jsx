import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./Dialogs.module.scss";

export const DialogItem = ({dialog, onClick}) => {
  return (
    <Link to={`/chat/${dialog.uid}`} onClick={onClick} className={styles.DialogItem}>
      <div className={styles.DialogImage}></div>
      <div className={styles.DialogContent}>
        <div className={styles.CompanionName}>{`${dialog.fname} ${dialog.lname}`}</div>
        <div className={styles.LastMessage}>{dialog.lastMessageBody || 'Начните диалог'}</div>
      </div>
    </Link>
  );
}