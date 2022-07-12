import {useEffect, useState} from "react";

function NewsCard({
                    isLoggedIn,
                    isSaved,
                    location,
                    link,
                    image,
                    date,
                    title,
                    text,
                    source,
                    keyword,
                    onSignInClick,
                    onSaveArticle,
                    onDeleteArticle,
                  }) {

  const [saved, setSaved] = useState(isSaved);
  const [btnMessage, setBtnMessage] = useState(null);

  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);

  const handleButtonEnter = (e) => {

    if (!isLoggedIn) {
      if (location === '/') setBtnMessage(<p className='news-card__btn-message'>Sign in to save articles</p>);
    } else {
      if (location === '/saved-news') setBtnMessage(<p className='news-card__btn-message'>Remove from saved</p>);
    }
  }

  const handleButtonLeave = () => {
    setBtnMessage(null);
  }

  const handleDeleteArticle = (e) => {
    e.preventDefault();
    onDeleteArticle(link);
  }

  const handleSaveArticle = (e) => {
    e.preventDefault();
      const article = {
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      };
      onSaveArticle(article);
  }

  const toggleSaveDelete = (e) => {
    if (isLoggedIn) {
      if(saved) handleDeleteArticle(e);
      else handleSaveArticle(e);
    } else {
      e.preventDefault();
      onSignInClick();
    }
  }


  const keywordTool = <p className='news-card__keyword'>{keyword[0].toUpperCase() + keyword.slice(1)}</p>;
  const mainButton = location === '/saved-news' ?
    <button onMouseEnter={handleButtonEnter} onMouseLeave={handleButtonLeave} onClick={handleDeleteArticle}
            className={`news-card__button news-card__button_type_trash`}></button> :
    <button onMouseEnter={handleButtonEnter} onMouseLeave={handleButtonLeave} onClick={toggleSaveDelete}
            className={`news-card__button${saved ? ' news-card__button_type_marked' : ' news-card__button_type_save'}`}></button>;

  return (
    <a href={link} className='news-card' target='_blank' rel="noreferrer">
      <div className="news-card__tools-row">
        {location === '/saved-news' && keywordTool}
        {btnMessage}
        {mainButton}
      </div>
      <img
        src={image}
        alt={title}
        className="news-card__image"/>
      <div className="news-card__content">
        <p className='news-card__date'>{date}</p>
        <h3 className='news-card__title'>{title}</h3>
        <p className='news-card__text'>{text}</p>
        <p className='news-card__source'>{source}</p>
      </div>
    </a>
  );
}

export default NewsCard;