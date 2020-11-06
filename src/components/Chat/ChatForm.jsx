import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { addMessage } from '../../store/actions';
import { Button } from '../index';
import styles from "./Chat.module.scss";

export const ChatForm = ({ receiver }) => {
  const socket = useSelector((store) => store.socket);
  const user = useSelector((store) => store.user);
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch();

  const handleSendMessage = React.useCallback(() => {
    if (value !== '') {
      let message = {};
      message.type = "message";
      message.uidReceiver = receiver;
      message.uidSender = user.uid;
      message.body = value;
      let jsonMessage = JSON.stringify(message);
      socket.send(jsonMessage);
      dispatch(addMessage({
        uidReceiver: message.uidReceiver,
        uidSender: message.uidSender,
        body: message.body,
      }));
      setValue('');
    }
  }, [dispatch, value, receiver, socket, user.uid])

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className={styles.ChatForm}>
        <div className={styles.inputContainer}>
          <input className={styles.messageInput} placeholder="Введите сообщение" type='text' value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <div className={styles.buttonContainer}>
          <Button type="submit" onClick={handleSendMessage} text="Отправить" subClass="submit" />
        </div>
      </div>
    </form>
  );
}