import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from 'react-router-dom';
import { ChatForm } from './ChatForm';
import { MessageList } from './MessageList';
import { fetchInitMessages } from '../../store/actions';
import styles from './Chat.module.scss';

const Chat = () => {
  const url = useParams();
  const dispatch = useDispatch();
  const [receiverUid, setReceiveUid] = React.useState(parseInt(url.id));
  const dialogs = useSelector((store) => store.dialogs);
  const messages = useSelector((store) => store.messages);
  const fetchMessages = useSelector((store) => store.fetchMessages);

  const getMessages = React.useCallback((uid) => {
    dispatch(fetchInitMessages(uid));
  }, [dispatch]);

  React.useEffect(() => {
    setReceiveUid(parseInt(url.id));
  }, [url.id]);

  React.useEffect(() => {
    getMessages(receiverUid);
  }, [receiverUid, getMessages]);

  React.useEffect(() => {
    if (+fetchMessages.newMessage === +receiverUid)
      getMessages(receiverUid);
  }, [fetchMessages.newMessage, getMessages, receiverUid]);

  React.useEffect(() => {
    document.querySelector('.contentRef').scrollTop = 999999;
  });

  let name = null;
  dialogs.map(item => {
    if (item.uid === receiverUid)
      name = item.fname + ' ' + item.lname;
    return item;
  });

  return (
    <div className={styles.Chat}>
      <h1>
        <Link className={styles.Title} to={`/user/page/${url.id}`}>
          {name}
        </Link>
      </h1>
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