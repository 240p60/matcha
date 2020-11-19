import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ChatIcon } from "./right-arrow.svg";
import styles from "./Dialogs.module.scss";

export const DialogItem = ({ dialog }) => {
  return (
    <div className={styles.DialogItem}>
      <Link to={`/user/page/${dialog.uid}`} className={styles.DialogImage}>
        <picture>
          <source srcSet={dialog.avatar}/>
          <img className="user__picture" src={dialog.avatar} alt="user" />
        </picture>
      </Link>
      <div className={styles.DialogContent}>
        <Link to={`/user/page/${dialog.uid}`} className={styles.CompanionName}>{`${dialog.fname} ${dialog.lname}`}</Link>
        <div className={styles.LastMessage}>{`${dialog.lastMessageBody ? (dialog.uid === dialog.uidReceiver ? `You: ${dialog.lastMessageBody}` : dialog.lastMessageBody) : 'Начните диалог'}`}</div>
        <Link to={`/chat/${dialog.uid}`} className={styles.DialogLink}>
          <ChatIcon />
        </Link>
      </div>
    </div>
  );
}