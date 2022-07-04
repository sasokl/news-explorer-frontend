import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";

function SavedNews({isLoggedIn}) {
  return (
    <main className='saved-news'>
      <SavedNewsHeader/>
      <NewsCardList
      isLoggedIn={isLoggedIn}
      location='/saved-news'/>
    </main>
  );
}

export default SavedNews;