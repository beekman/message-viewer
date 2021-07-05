import { React, useState } from 'react';
import Message from './Message';
import './Messages.css';
import prevIcon from '../../images/arrow-prev.svg';
import nextIcon from '../../images/arrow-next.svg';
import sortAscIcon from '../../images/arrow-ascending.svg';
import sortDescIcon from '../../images/arrow-descending.svg';

const Messages = ({ messages }) => {
  const [isAscendingSort, setAscendingSort] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 5;
  const uniqueSortedMessages = messages.filter((v, i, a) => a
    .findIndex(t => (t.uuid === v.uuid && t.content === v.content)) === i)
    .sort((a, b) => {
      return new Date(a.sentAt) - new Date(b.sentAt);
    });

  const [messageList, setMessageList] = useState(uniqueSortedMessages);

  const [pages, setPages] = useState(Math.round(messageList.length / messagesPerPage));

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const getPaginatedMessages = () => {
    const startIndex = currentPage * messagesPerPage - messagesPerPage;
    const endIndex = startIndex + messagesPerPage;
    return messageList.slice(startIndex, endIndex);
  };

  const currentMessages = getPaginatedMessages();

  const handleSortClick = () => {
    setAscendingSort(toggled => !toggled);
    setMessageList(messageList.sort((a, b) => {
      if(isAscendingSort) {
        return new Date(b.sentAt) - new Date(a.sentAt);
      }
      else {
        return new Date(a.sentAt) - new Date(b.sentAt);
      }
    }));
  };

  const handleRemoveMessageClick = (e) => {
    const uuid = e.target.getAttribute("id");
    setMessageList(messageList.filter(message => message.uuid !== uuid));
    let newPagesCount = Math.round((messageList.length + 1) / messagesPerPage);
    if(newPagesCount === 0) newPagesCount = 1; // "Correct" pages count to 1 when there are no messages
    setPages(newPagesCount);
  };

  const MessageList = currentMessages.map((d, i) => {
    return (
      <li key={i} className="Message">
        <span id={currentMessages[i].uuid} className='delete' onClick={handleRemoveMessageClick}>X</span>
        <Message {...currentMessages[i]} />
      </li>
    );
  });

  return (
    <>
      <section className="Messages">
        <nav>
          <div className="pagination">
            <button
              onClick={goToPreviousPage}
              className={`prev ${currentPage <= 1 ? 'hidden' : ''}`}
            >
              <img alt='Previous Page Icon' src={prevIcon} />
            </button>

            Page {currentPage} of {pages}

            <button
              onClick={goToNextPage}
              className={`next ${currentPage >= pages ? 'hidden' : ''}`}
            >
              <img alt='Next Page Icon' src={nextIcon} />
            </button>
          </div>
          <button onClick={handleSortClick} >
            {isAscendingSort ? <img alt="Ascending Sort" src={sortAscIcon} /> : <img alt="Descending Sort" src={sortDescIcon} />}
          </button>
        </nav>
        <ul>
          {MessageList}
        </ul>

      </section>
    </>
  );
};

export default Messages;
