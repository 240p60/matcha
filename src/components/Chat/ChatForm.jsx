import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { Button } from '../index';
import styles from "./Chat.module.scss";

export const ChatForm = ({ receiver }) => {
  const socket = useSelector((store) => store.socket);
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch();

  const handleSendMessage = React.useCallback(() => {
      let message = {};
      message.type = "message";
      message.uidReceiver = receiver;
      message.body = value;
      let jsonMessage = JSON.stringify(message);
      console.log("tx: " + jsonMessage);
      socket.send(jsonMessage);
      setValue('');
  }, [dispatch, value, receiver])

  return (
    <div className={styles.ChatForm}>
      <div className={styles.inputContainer}>
        <input className={styles.messageInput} placeholder="Введите сообщение" type='text' value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
      <div className={styles.buttonContainer}>
        <Button type="submit" onClick={handleSendMessage} text="Отправить" subClass="submit" />
      </div>
    </div>
  );
}