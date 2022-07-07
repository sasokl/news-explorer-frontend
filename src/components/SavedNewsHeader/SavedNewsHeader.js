function SavedNewsHeader() {
  return (
    <section className="saved-news-header">
      <p className="saved-news-header__description">Saved articles</p>
      <h2 className="saved-news-header__title">Elise, you have 5 saved articles</h2>
      <div className="saved-news-header__keywords-container">
        <p className="saved-news-header__keywords-line">
          By keywords:
          <span className="saved-news-header__keywords"> Nature, Yellowstone, and 2 other</span>
        </p>
      </div>
    </section>
  );
}

export default SavedNewsHeader;