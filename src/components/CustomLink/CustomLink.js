import {Link} from "react-router-dom";

function CustomLink({to, className, children, onClose}) {
  return (
    <Link
      to={to}
      onClick={onClose}
      className={className + ' custom-link'}
    >
      {children}
    </Link>
  );
}

export default CustomLink;