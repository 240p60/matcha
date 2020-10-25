import React from 'react';
import styles from "./Chat.module.scss";

export const ChatItem = ({chat}) => {
  console.log(chat);
  return (
    <div className={styles.ChatItem}>
      <div className={styles.ChatImage}></div>
      <div className={styles.ChatContent}>
        <div className={styles.CompanionName}>{`${chat.fname} ${chat.lname}`}</div>
        <div className={styles.LastMessage}>{chat.lastMessageBody || 'Начните диалог'}</div>
      </div>
    </div>
  );
}