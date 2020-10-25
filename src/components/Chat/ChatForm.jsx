import React from "react";
import { Button } from '../index';
import styles from "./Chat.module.scss";

export const ChatForm = () => {
  const [message, setMessage] = React.useState('');

  return (
    <div className={styles.ChatForm}>
      <div className={styles.inputContainer}>
        <input className={styles.messageInput} placeholder="Введите сообщение" type='text' value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <div className={styles.buttonContainer}>
        <Button type="submit" text="Отправить" subClass="submit" />
      </div>
    </div>
  );
}