import React from "react";
import { ChatForm } from './ChatForm';
import { Message } from './Message';
import styles from './Chat.module.scss';

const Chat = () => {
  return (
    <div className={styles.Chat}>
      <div className={styles.ChatContainer}>
        <div className={styles.ChatContent}>
          <Message />
        </div>
        <ChatForm />
      </div>
    </div>
  )
}

export default Chat;