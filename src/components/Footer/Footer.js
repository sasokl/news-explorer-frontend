import CustomLink from "../CustomLink/CustomLink";

function Footer() {
  return (
    <footer className='footer'>
      <p className="footer__copyright">&copy; {`${new Date().getFullYear()} Alexander Blaus`}</p>
      <div className="footer__content-container">
        <nav className="navigation footer__navigation">
          <CustomLink to="/" className="navigation__item footer__navigation-item">
            Home
          </CustomLink>
          <a href="https://practicum.com/" className="custom-link navigation__item footer__navigation-item" target="_blank" rel="noreferrer">
            Practicum by Yandex
          </a>
        </nav>
        <nav className="navigation footer__navigation footer__social">
          <a href="https://github.com/sasokl" className="custom-link" target="_blank" rel="noreferrer">
            <div className="footer__social-item footer__social-item_type_git"/>
          </a>
          {/* I have no facebook account, so I'll just add the global facebook url for now. */}
          <a href="https://www.facebook.com/" className="custom-link" target="_blank" rel="noreferrer">
            <div className="footer__social-item footer__social-item_type_facebook"/>
          </a>
        </nav>
      </div>

    </footer>
  );
}

export default Footer;