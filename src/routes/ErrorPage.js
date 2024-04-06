import { Link } from "react-router-dom";
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className="error-box">
      <h1>Page not found</h1>
      <Link to={"/"}><h1>Go back</h1></Link>
    </div>);
}

export default ErrorPage;