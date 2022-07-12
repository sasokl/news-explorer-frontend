import {useEffect, useState} from "react";

function SearchForm({onSubmit, cards}) {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if(cards.length) setSearchText(cards[0].keyword);
  }, [cards])
  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  }

  const handleButtonMousedown = (e) => {
    e.target.className = 'search-form__button search-form__button_mousedown'
  }

  const handleButtonMouseup = (e) => {
    e.target.className = 'search-form__button'
  }

  const handleSubmit= (e) => {
    e.preventDefault();
    onSubmit(searchText);
  }

  return (
    <section className='search-form'>
      <div className="search-form__container">
        <h1 className="search-form__title">What's going on in the world?</h1>
        <p className="search-form__subtitle">Find the latest news on any topic and save them in your personal account.</p>
        <form
          className='search-form__form-elem'
          onSubmit={handleSubmit}>
          <input
            type='text'
            name='search-field'
            id='search-input'
            className='search-form__input'
            value={searchText || ''}
            onChange={handleSearchTextChange}
            placeholder='Enter topic'
          />
          <button
            className="search-form__button"
            onMouseDown={handleButtonMousedown}
            onMouseUp={handleButtonMouseup}
            onMouseLeave={handleButtonMouseup}
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;