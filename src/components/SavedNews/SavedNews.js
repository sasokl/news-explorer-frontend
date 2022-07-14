import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";

function SavedNews({isLoggedIn, savedArticles, onSignInClick, onDeleteArticle}) {
  return (
    <main className='saved-news'>
      <SavedNewsHeader
        savedArticles={savedArticles}/>
      <NewsCardList
      isLoggedIn={isLoggedIn}
      location='/saved-news'
      cards={savedArticles}
      savedArticles={savedArticles}
      onSignInClick={onSignInClick}
      onDeleteArticle={onDeleteArticle}/>
    </main>
  );
}

export default SavedNews;