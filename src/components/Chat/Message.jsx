import React from "react";
import styled from 'styled-components';

export const Message = () => {
  return (
    <MessageItem>
      I look like Erick Harris, but you never seen me banging
    </MessageItem>
  )
}

const MessageItem = styled.div`
  border-radius: 4px;
  padding: 10px;
`;