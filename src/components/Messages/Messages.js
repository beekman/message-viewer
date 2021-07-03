import { React, useState, useEffect } from 'react';
import Message from './Message';
import styles from './Messages.css';
import prevIcon from '../../images/arrow-prev.svg';
import nextIcon from '../../images/arrow-next.svg';

const Messages = ({ messages }) => {
  const [isAscendingSort, setAscendingSort] = useState(true);
  const messagesPerPage = 5;
  const [pages] = useState(Math.round(messages.length / messagesPerPage));
  const [currentPage, setCurrentPage] = useState(1);


  let uniqueMessages = messages.filter((v, i, a) => a
    .findIndex(t => (t.uuid === v.uuid && t.content === v.content)) === i)
    .sort((a, b) => {
      if(isAscendingSort) {
        return new Date(a.sentAt) - new Date(b.sentAt);
      }
      else {
        return new Date(b.sentAt) - new Date(a.sentAt);
      }
    });

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  };

  const getPaginatedMessages = () => {
    const startIndex = currentPage * messagesPerPage - messagesPerPage;
    const endIndex = startIndex + messagesPerPage;
    return uniqueMessages.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    const pageLimit = 5;
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  const handleSortClick = () => setAscendingSort(toggled => !toggled);

  const currentMessages = getPaginatedMessages();
  console.log(currentMessages);

  const MessageList = getPaginatedMessages().map((d, i) => {
    return (
      <Message key={i} {...currentMessages[i]} />
    );
  });

  return (
    <>
      <section>
        <button onClick={handleSortClick} >
          Sort By {isAscendingSort ? 'ASC' : 'DESC'}
        </button>

        <ul>
          {MessageList}
        </ul>
        <div className="pagination">
          <button
            onClick={goToPreviousPage}
            className={`prev ${currentPage === 1 ? 'hidden' : ''}`}
          >
            <img alt='previous' src={prevIcon} />
          </button>

          Page {currentPage} of {pages}

          <button
            onClick={goToNextPage}
            className={`next ${currentPage === pages ? 'hidden' : ''}`}
          >
          <img alt='next' src={nextIcon}/>
          </button>
        </div>
      </section>
    </>
  );
};

export default Messages;
