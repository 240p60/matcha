import React from 'react';
import { useSelector } from 'react-redux';
import { Message } from './Message';

export const MessageList = ({messages, receiver}) => {
  const user = useSelector((store) => store.user);

  return (
  <>
    {messages && Array.isArray(messages) && messages.map((item, index) => {
      if (item.uidSender === receiver || item.uidSender === user.uid) {
        return (
          <Message
            id={index}
            receiver={receiver}
            myMessage={item.uidSender !== receiver}
            key={index}
          >
            {item.body}
          </Message>
        )
      } else return null;
    })}
  </>
  );
}