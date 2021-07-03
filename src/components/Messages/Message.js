import React from 'react';

const Message = ({ content, sentAt, senderUuid }) => {
  const sentDate = new Date(sentAt);

  const hh = sentDate.getHours();
  let h = hh;
  let dd = 'AM';
  if(h > 12) h = hh - 12;
  if(h >= 12) dd = "PM";

  let seconds = sentDate.getSeconds();
  if(sentDate.getSeconds() < 10) seconds = "0" + seconds;

  let minutes = sentDate.getMinutes();
  if(sentDate.getMinutes() < 10) minutes = "0" + sentDate.getMinutes();

  const readableDate = sentDate.toDateString() + ' at ' + h + ':' + minutes + ':' + seconds + ' ' + dd;

  return (
    <>
      <h3>{readableDate}</h3>
      <p>senderUuid: {senderUuid}</p>
      <p>content: {content}</p>
    </>
  );
};
export default Message;
