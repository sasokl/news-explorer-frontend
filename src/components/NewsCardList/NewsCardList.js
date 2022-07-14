import NewsCard from "../NewsCard/NewsCard";
import CirclePreloader from "../CirclePreloader/CirclePreloader";
import {useEffect, useState} from "react";

function NewsCardList({
                        isLoggedIn,
                        onSaveArticle,
                        onDeleteArticle,
                        location,
                        onSignInClick,
                        isSearching = false,
                        savedArticles = [],
                        cards = []
                      }) {
  const [isSearchActivated, setIsSearchActivated] = useState(false);
  const [cardsToShow, setCardsToShow] = useState(3);

  useEffect(() => {
    if (isSearching) {
      setCardsToShow(3);
      setIsSearchActivated(true);
    }
  }, [isSearching])

  useEffect(() => {
    if (cards.length) setIsSearchActivated(true);
  }, [cards])

  const handleShowMore = () => setCardsToShow(cardsToShow + 3);

  const timeConvert = (d) => {
    const date = new Date(d);
    const month = date.toLocaleString('default', {month: 'long'});
    const splittedDate = date.toDateString().split(' ');
    return `${month} ${splittedDate[2]}, ${splittedDate[3]}`;
  }

  let content = <></>;// Init state

  switch (location) {
    case '/saved-news':
      content =
        cards.length ?
          <section className='news-card-list'>
            <div className='news-card-list__cards'>
              {
                cards.slice(0, cardsToShow).map((card, i) => {
                  return (
                    <NewsCard
                      key={i}
                      isLoggedIn={isLoggedIn}
                      isSaved={card.isSaved}
                      location={location}
                      onSignInClick={onSignInClick}
                      onSaveArticle={onSaveArticle}
                      onDeleteArticle={onDeleteArticle}
                      link={card.link}
                      keyword={card.keyword}
                      image={card.image}
                      date={timeConvert(card.date)}
                      title={card.title}
                      text={card.text}
                      source={card.source}/>
                  );
                })
              }
            </div>
            {(cards.length > 3 && cardsToShow < cards.length) ?
              <button onClick={handleShowMore} className="news-card-list__button">
                Show more
              </button> :
              <></>
            }
          </section> :
          <></>;
      break;
    case '/':
      if (isSearching) { // In searching progress (preloader showed)
        content =
          <section className='news-card-list news-card-list_type_preloader'>
            <CirclePreloader/>
            <p className='news-card-list__text'>Searching for news...</p>
          </section>;
      } else if (isSearchActivated) {
        if (!cards.length) { // Search Activated but nothing found
          content =
            <section className='news-card-list news-card-list_type_not-found'>
              <div className="news-card-list__not-found-icon"/>
              <h2 className="news-card-list__title news-card-list__title_type_not-found">Nothing found</h2>
              <p className="news-card-list__text news-card-list__text_type_not-found">Sorry, but nothing matched
                your search terms.</p>
            </section>;
        } else { // Search Activated and news found
          content =
            <section className='news-card-list'>
              <h2 className='news-card-list__title'>Search results</h2>
              <div className='news-card-list__cards'>
                {
                  cards.slice(0, cardsToShow).map((card, i) => {
                    return (
                      <NewsCard
                        key={i}
                        isLoggedIn={isLoggedIn}
                        isSaved={
                          isLoggedIn && savedArticles &&
                          !!(savedArticles.find(article => {
                            return (article.link === card.link);
                          }))
                        }
                        location={location}
                        onSignInClick={onSignInClick}
                        onSaveArticle={onSaveArticle}
                        onDeleteArticle={onDeleteArticle}
                        link={card.link}
                        keyword={card.keyword}
                        image={card.image}
                        date={timeConvert(card.date)}
                        title={card.title}
                        text={card.text}
                        source={card.source}/>
                    );
                  })
                }
              </div>
              {(cards.length > 3 && cardsToShow < cards.length) ?
                <button onClick={handleShowMore} className="news-card-list__button">
                  Show more
                </button> : <></>
              }
            </section>
        }
      }
      break;
    default:
      content = <></>;
  }


  return (
    <>
      {content}
    </>
  );
}

export default NewsCardList;