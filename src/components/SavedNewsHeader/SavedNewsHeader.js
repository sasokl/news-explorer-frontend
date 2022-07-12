import React, {useEffect, useState} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function SavedNewsHeader({savedArticles}) {
  const currentUser = React.useContext(CurrentUserContext);

  const sortByFrequency = (array) => {
    const frequency = {};

    array.forEach(function (value) {
      frequency[value] = 0;
    });

    const uniques = array.filter((value) => {
      return ++frequency[value] === 1;
    });

    return uniques.sort((a, b) => {
      return frequency[b] - frequency[a];
    });
  }

  const [keywords, setKeywords] = useState([])
  const keywordsText =
    keywords.length > 3 ?
      `${keywords
        .slice(0,2)
        .map(keyword => {
          return keyword[0].toUpperCase() + keyword.slice(1);
        })
        .join(', ')} and ${keywords.length - 2} other` :
      keywords
        .map(keyword => {
          return keyword[0].toUpperCase() + keyword.slice(1);
        })
        .join(', ');

  useEffect(() => {
    setKeywords(sortByFrequency(savedArticles.map(article => {
      return article.keyword;
    })));
  }, [savedArticles]);

  return (
    <section className="saved-news-header">
      <p className="saved-news-header__description">Saved articles</p>
      <h2 className="saved-news-header__title">{`${currentUser.name}, you have ${savedArticles.length} saved articles`}</h2>
      <div className="saved-news-header__keywords-container">
        <p className="saved-news-header__keywords-line">
          By keywords:
          <span className="saved-news-header__keywords"> {keywordsText}</span>
        </p>
      </div>
    </section>
  );
}

export default SavedNewsHeader;