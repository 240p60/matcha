import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { ChatForm } from './ChatForm';
import { MessageList } from './MessageList';
import { fetchInitMessages } from '../../store/actions';
import styles from './Chat.module.scss';

const Chat = () => {
  const history = useHistory();
  const [receiverUid, setReceiveUid] = React.useState(parseInt(history.location.pathname.split('/')[2]));
  const messages = useSelector((store) => store.messages);
  const fetchMessages = useSelector((store) => store.fetchMessages);
  const dispatch = useDispatch();

  const getMessages = React.useCallback((uid) => {
    dispatch(fetchInitMessages(uid));
  }, [dispatch]);

  React.useEffect(() => {
    setReceiveUid(parseInt(history.location.pathname.split('/')[2]));
  }, [history]);

  React.useEffect(() => {
    getMessages(receiverUid);
  }, [receiverUid, getMessages]);

  React.useEffect(() => {
    if (fetchMessages.newMessage == receiverUid)
      getMessages(receiverUid);
  }, [fetchMessages.newMessage]);

  React.useEffect(() => {
    document.querySelector('.contentRef').scrollTop = 999999;
  });

  return (
    <div className={styles.Chat}>
      <div className={styles.ChatContainer}>
        <div className={`contentRef ${styles.ChatContent}`}>
          <div className={styles.Messages}>
            <MessageList messages={messages} receiver={receiverUid} />
          </div>
        </div>
        <ChatForm receiver={receiverUid} />
      </div>
    </div>
  )
}

export default Chat;