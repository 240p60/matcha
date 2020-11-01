import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { ChatForm } from './ChatForm';
import { Message } from './Message';
import { fetchInitMessages } from '../../store/actions';
import styles from './Chat.module.scss';

const Chat = () => {
  const history = useHistory();
  const [receiverUid, setReceiveUid] = React.useState(parseInt(history.location.pathname.split('/')[2]));
  const messages = useSelector((store) => store.messages);
  const dispatch = useDispatch();

  const getMessages = React.useCallback((uid) => {
    dispatch(fetchInitMessages(uid));
  }, [dispatch]);

  React.useEffect(() => {
    setReceiveUid(parseInt(history.location.pathname.split('/')[2]));
  }, [history]);

  React.useEffect(() => {
    getMessages(receiverUid);
  }, [receiverUid]);

  return (
    <div className={styles.Chat}>
      <div className={styles.ChatContainer}>
        <div className={styles.ChatContent}>
          <div className={styles.Messages}>
            {messages && Array.isArray(messages) && messages.map((item) => (
              <Message
                id={item.mid}
                receiver={receiverUid}
                myMessage={item.uidSender !== receiverUid}
                key={item.mid}
              >
                {item.body}
              </Message>
            ))}
          </div>
        </div>
        <ChatForm receiver={receiverUid} />
      </div>
    </div>
  )
}

export default Chat;