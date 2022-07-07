import NewsCard from "../NewsCard/NewsCard";
import CirclePreloader from "../CirclePreloader/CirclePreloader";

function NewsCardList({isLoggedIn, location, onSignInClick, isSearching}) {
  // These section's data below are temporary till I'll finish stage 3.

  const notFoundSection =
    <section className='news-card-list news-card-list_type_not-found'>
      <div className="news-card-list__not-found-icon"/>
      <h2 className="news-card-list__title news-card-list__title_type_not-found">Nothing found</h2>
      <p className="news-card-list__text news-card-list__text_type_not-found">Sorry, but nothing matched
        your search terms.</p>
    </section>;

  const content = !isSearching ?
    <section className='news-card-list'>
      {location === '/' && <h2 className='news-card-list__title'>Search results</h2>}
      <div className='news-card-list__cards'>
        <NewsCard
          isLoggedIn={isLoggedIn}
          location={location}
          onSignInClick={onSignInClick}
          imgLink={require('../../images/temp/1card.jpg')}
          date='November 4, 2020'
          title={'Everyone Needs a Special \'Sit Spot\' in Nature'}
          text={`Ever since I read Richard Louv's influential book, "Last Child in the Woods," the idea of having a
           special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is
            for both adults and children to find...`}
          tag='treehugger'
          keyword='Nature'
        />
        <NewsCard
          isLoggedIn={isLoggedIn}
          location={location}
          onSignInClick={onSignInClick}
          imgLink={require('../../images/temp/2card.jpg')}
          date='February 19, 2019'
          title={'Nature makes you better'}
          text={`We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, 
          the scents of a forest, the way dappled sunlight dances through leaves.`}
          tag='national geographic'
          keyword='Nature'
        />
        <NewsCard
          isLoggedIn={isLoggedIn}
          location={location}
          onSignInClick={onSignInClick}
          imgLink={require('../../images/temp/3card.jpg')}
          date='October 19, 2020'
          title={'Grand Teton Renews Historic Crest Trail'}
          text={`“The linking together of the Cascade and Death Canyon trails, at their heads, took place on October 1,
           1933, and marked the first step in the realization of a plan whereby the hiker will be...`}
          tag='National parks traveler'
          keyword='Yellowstone'
        />
      </div>
      <button className="news-card-list__button">
        Show more
      </button>
    </section> :
    <section className='news-card-list news-card-list_type_preloader'>
      <CirclePreloader/>
      <p className='news-card-list__text'>Searching for news...</p>
    </section>;

  return (
    <>
      {content}
    </>
  );
}

export default NewsCardList;