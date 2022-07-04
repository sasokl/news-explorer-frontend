import CustomLink from "../CustomLink/CustomLink";

function Footer() {
  return (
    <footer className='footer'>
      <p className="footer__copyright">&copy; 2022 Alexander Blaus</p>
      <nav className="navigation">
          <CustomLink to="/" className="navigation__item footer__navigation-item">
              Home
          </CustomLink>
      </nav>
      <nav className="navigation footer__social">
          <CustomLink to="https://github.com/sasokl" className="footer__social-item footer__social-item_type_git">
            <div className="footer__social-type-git"/>
          </CustomLink>
          <CustomLink to="/" className="footer__social-item footer__social-item_type_facebook">
            <div className="footer__social-type-li"/>
          </CustomLink>
      </nav>
    </footer>
  );
}

export default Footer;