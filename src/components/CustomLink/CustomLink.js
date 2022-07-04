import {Link} from "react-router-dom";

function CustomLink({to, className, children}) {
  return (
    <Link
      to={to}
      className={className + ' custom-link'}
    >
      {children}
    </Link>
  );
}

export default CustomLink;