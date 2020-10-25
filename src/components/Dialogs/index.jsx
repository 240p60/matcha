import React from "react";
import PropTypes from 'prop-types';
import { ChatItem } from './ChatItem';
import styles from './Chat.module.scss';

const Chat = () => {
  const [chats, setChats] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:3000/user/getFriends/', {
      method: 'POST',
      body: JSON.stringify({
        'x-auth-token': sessionStorage.getItem('x-auth-token'),
      }),
    })
      .then((res) => res.json())
      .then((data) => setChats(data));
  }, []);
  return (
    <div className={styles.Chat}>
      <h2>Диалоги</h2>
      {Array.isArray(chats) && chats.length && chats.map((item) => {
        return <ChatItem key={item} chat={item} />;
      })}
    </div>
  )
}

Chat.propTypes = {
  chats: PropTypes.arrayOf(PropTypes.number),
}

Chat.defaultProps = {
  chats: [],
}

export default Chat;