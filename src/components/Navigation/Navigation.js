import CustomLink from "../CustomLink/CustomLink";
import {useHistory} from 'react-router-dom'

function Navigation({isThemeDark, isLoggedIn, onClose = () => {}}) {
  const history = useHistory();
  const location = history.location.pathname;
  return (
    <nav className='navigation'>
      <CustomLink
        to='/'
        onClose={onClose}
        className={`navigation__item navigation__item_type_home${isThemeDark ? ' navigation__item_theme_dark' : ''}
        ${location === '/' ? 
          ` navigation__item_active${isThemeDark ? ' navigation__item_active_theme_dark' : ''}` : 
          ''}`}
        >
        Home
      </CustomLink>
      {isLoggedIn && <CustomLink
        to='/saved-news'
        onClose={onClose}
        className={`navigation__item navigation__item_type_saved-news${isThemeDark ? ' navigation__item_theme_dark' : ''}
        ${location ==='/saved-news' ?
          ` navigation__item_active${isThemeDark ? ' navigation__item_active_theme_dark' : ''}` :
          ''}`}
      >
        Saved articles
      </CustomLink>}

    </nav>
  );
}

export default Navigation;