import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";

function Main({isLoggedIn, onSignInClick}) {
  return (
    <main className='main'>
      <SearchForm
        onSubmit={() => {
        }}/>
      <NewsCardList
        isLoggedIn={isLoggedIn}
        location='/'
        onSignInClick={onSignInClick}/>
      <About/>
    </main>
  );
}

export default Main;