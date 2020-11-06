import React from 'react';
import { Message } from './Message';

export const MessageList = ({messages, receiver}) => {
  return (
    <>
    {messages && Array.isArray(messages) && messages.map((item, index) => (
      <Message
        id={index}
        receiver={receiver}
        myMessage={item.uidSender !== receiver}
        key={index}
      >
        {item.body}
      </Message>
    ))}
    </>
  );
}