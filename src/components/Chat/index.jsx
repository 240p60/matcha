import React from "react";
import { ChatForm } from './ChatForm';
import { Message } from './Message';
import styles from './Chat.module.scss';
import { useHistory } from 'react-router-dom';

const Chat = () => {
  const history = useHistory();
  const receiverUid = history.location.pathname.split('/')[2];

  React.useEffect(() => {
    fetch('http://localhost:3000/message/get/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        'otherUid': receiverUid,
        'x-auth-token': sessionStorage.getItem('x-auth-token'),
      }),
    }).then(res => res.json()).then(data => console.log(data));
  }, []);

  return (
    <div className={styles.Chat}>
      <div className={styles.ChatContainer}>
        <div className={styles.ChatContent}>
          <Message />
        </div>
        <ChatForm receiver={receiverUid} />
      </div>
    </div>
  )
}

export default Chat;