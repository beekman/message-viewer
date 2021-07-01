import React from 'react';

const Message = ({ uuid, content, sentAt, senderUuid }) => (
  <>
    <p>senderUuid: {senderUuid}</p>
    <p>sentAt: {sentAt}</p>
    <p>content: {content}</p>
    <p>uuid: {uuid}</p>
  </>
);
export default Message;
