import CustomLink from "../CustomLink/CustomLink";
import {useHistory} from 'react-router-dom'

function Navigation({isThemeDark, loggedIn}) {
  const history = useHistory();
  const location = history.location.pathname;

  return (
    <nav className='navigation'>
      <CustomLink
        to='/'
        className={`navigation__item navigation__item_type_home${isThemeDark ? ' navigation__item_theme-dark' : ''}
        ${location === '/' ? 
          ` navigation__item_active${isThemeDark ? ' navigation__item_active_theme-dark' : ''}` : 
          ''}`}
        >
        Home
      </CustomLink>
      {loggedIn && <CustomLink
        to='/saved-news'
        className={`navigation__item navigation__item_type_saved-news${isThemeDark ? ' navigation__item_theme-dark' : ''}
        ${location ==='/saved-news' ?
          ` navigation__item_active${isThemeDark ? ' navigation__item_active_theme-dark' : ''}` :
          ''}`}
      >
        Saved articles
      </CustomLink>}

    </nav>
  );
}

export default Navigation;