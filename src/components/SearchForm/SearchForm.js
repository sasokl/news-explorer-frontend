import {useState} from "react";

function SearchForm({onSubmit}) {
  const [searchText, setSearchText] = useState('');

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
    onSubmit();
  }

  return (
    <section className='search-form'>
      <h1 className="search-form__title">What's going on in the world?</h1>
      <p className="search-form__subtitle">Find the latest news on any topic and save them in your personal account.</p>
      <form
        className='search-form__form-elem'
        onSubmit={()=>{}}>
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
          onClick={handleSubmit}
          className="search-form__button"
          onMouseDown={handleButtonMousedown}
          onMouseUp={handleButtonMouseup}
          onMouseLeave={handleButtonMouseup}
          type="submit"
        >
          Search
        </button>
      </form>

    </section>
  );
}

export default SearchForm;