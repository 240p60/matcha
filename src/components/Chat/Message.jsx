import React from "react";
import {useSelector} from "react-redux";
import styled from 'styled-components';

export const Message = ({ id, receiver, myMessage, children }) => {
  const dialogs = useSelector((store) => store.dialogs);

  return (
    <MessageItem myMessage={myMessage}>
      {!myMessage && dialogs.map((item) => {
        if (item.uid === receiver)
          return (
            <MessageImage key={id}>
              <picture>
                <source srcSet={item.avatar}/>
                <img className="user__picture" src={item.avatar} alt="user" />
              </picture>
            </MessageImage>
          );
      })}
      <MessageContent>
        {children}
      </MessageContent>
    </MessageItem>
  )
}

const MessageItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: ${({ myMessage }) => myMessage ? 'flex-end' : 'flex-start'};
  padding-bottom: 10px;
`;

const MessageContent = styled.div`
  color: #fff;
  border-radius: 10px;
  background-color: #f62354;
  padding: 5px 10px;
`;

const MessageImage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  border: 1px solid #f62354;

  img {
    width: 100%;
  }
`;