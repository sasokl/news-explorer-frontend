import {useState} from "react";

function NewsCard({isLoggedIn, location, imgLink, date, title, text, tag, keyword, onSignInClick}) {

  const [isSaved, setIsSaved] = useState(false);
  const [btnMessage, setBtnMessage] = useState(null);

  const handleButtonEnter = () => {
    if (!isLoggedIn) {
      if(location === '/') setBtnMessage(<p className='news-card__btn-message'>Sign in to save articles</p>);
    }
    else {
      if (location === '/saved-news') setBtnMessage(<p className='news-card__btn-message'>Remove from saved</p>);
    }
  }

  const handleButtonLeave = () => {
    setBtnMessage(null);
  }

  const handleDeleteArticle = () => {
    console.log('Deleted');
  }

  const handleSaveArticle = () => {
    isLoggedIn ?
      setIsSaved(!isSaved) :
      onSignInClick();
  }

  const keywordTool = <p className='news-card__keyword'>{keyword}</p>;
  const mainButton = location === '/saved-news' ?
    <button onMouseEnter={handleButtonEnter} onMouseLeave={handleButtonLeave} onClick={handleDeleteArticle}
            className={`news-card__button news-card__button_type_trash`}></button> :
    <button onMouseEnter={handleButtonEnter} onMouseLeave={handleButtonLeave} onClick={handleSaveArticle}
            className={`news-card__button${isSaved ? ' news-card__button_type_marked' : ' news-card__button_type_save'}`}></button>

  return (
    <div className='news-card'>
      <div className="news-card__tools-row">
        {location === '/saved-news' && keywordTool}
        {btnMessage}
        {mainButton}
      </div>
      <img
        src={imgLink}
        alt={title}
        className="news-card__image"/>
      <div className="news-card__content">
        <p className='news-card__date'>{date}</p>
        <h2 className='news-card__title'>{title}</h2>
        <p className='news-card__text'>{text}</p>
        <p className='news-card__tag'>{tag}</p>
      </div>
    </div>
  );
}

export default NewsCard;