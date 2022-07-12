import {useState} from "react";
import {logError} from "../../utils/Constants";

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

  console.log(saved);
  const handleButtonEnter = () => {
    if (!isLoggedIn) {
      if (location === '/') setBtnMessage(<p className='news-card__btn-message'>Sign in to save articles</p>);
    } else {
      if (location === '/saved-news') setBtnMessage(<p className='news-card__btn-message'>Remove from saved</p>);
    }
  }

  const handleButtonLeave = () => {
    setBtnMessage(null);
  }

  const handleDeleteArticle = () => {
    onDeleteArticle(link)
      .then(() => {
        setSaved(false);
      })
      .catch(logError);
  }

  const handleSaveArticle = () => {
      const article = {
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      };
      onSaveArticle(article)
        .then(() => {
          setSaved(true);
        })
        .catch(logError)

  }

  const toggleSaveDelete = () => {

    if (isLoggedIn) {
      if(saved) handleDeleteArticle();
      else handleSaveArticle();
    } else {
      onSignInClick();
    }
  }


  const keywordTool = <p className='news-card__keyword'>{keyword[0].toUpperCase() + keyword.slice(1)}</p>;
  const mainButton = location === '/saved-news' ?
    <button onMouseEnter={handleButtonEnter} onMouseLeave={handleButtonLeave} onClick={handleDeleteArticle}
            className={`news-card__button news-card__button_type_trash`}></button> :
    <button onMouseEnter={handleButtonEnter} onMouseLeave={handleButtonLeave} onClick={toggleSaveDelete}
            className={`news-card__button${saved ? ' news-card__button_type_marked' : ' news-card__button_type_save'}`}></button>

  return (
    <div className='news-card'>
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
    </div>
  );
}

export default NewsCard;