import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";

function Main({
                isLoggedIn,
                onSignInClick,
                onSaveArticle,
                onDeleteArticle,
                onSearchClick,
                isSearching,
                savedArticles,
                cards
              }) {
  return (
    <main className='main'>
      <SearchForm
        onSubmit={onSearchClick}
        cards={cards}/>
      <NewsCardList
        isLoggedIn={isLoggedIn}
        isSearching={isSearching}
        onSaveArticle={onSaveArticle}
        onDeleteArticle={onDeleteArticle}
        savedArticles={savedArticles}
        cards={cards}
        location='/'
        onSignInClick={onSignInClick}/>
      <About/>
    </main>
  );
}

export default Main;