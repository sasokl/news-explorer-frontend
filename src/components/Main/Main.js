import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";

function Main({isLoggedIn}) {
  return (
    <main className='main'>
      <SearchForm/>
      <NewsCardList
        isLoggedIn={isLoggedIn}
        location='/'/>
      <About/>
    </main>
  );
}

export default Main;