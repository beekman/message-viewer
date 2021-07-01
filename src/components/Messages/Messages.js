import React from 'react';
import Message from './Message';
import styles from './Messages.css';

const Messages = ({ messages }) => {
  const MessageList = messages.map((uuid, i) => {
    return (
      <li key={i} className={styles.Message}>
        <Message {...messages[i]} />
      </li>
    );
  });

  return (
    <ul>
      {MessageList}
    </ul>
  );
};

export default Messages;
