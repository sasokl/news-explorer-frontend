import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";

function Main({isLoggedIn, onSignInClick, onSearchClick, isSearching}) {
  return (
    <main className='main'>
      <SearchForm
        onSubmit={onSearchClick}/>
      <NewsCardList
        isLoggedIn={isLoggedIn}
        isSearching={isSearching}
        location='/'
        onSignInClick={onSignInClick}/>
      <About/>
    </main>
  );
}

export default Main;