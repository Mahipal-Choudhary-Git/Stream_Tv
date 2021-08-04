import { Link } from "react-router-dom";
import GoogleOAuth from "./GoogleOAuth";

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item">
                Stream TV
            </Link>
            <div className="right menu">
                <Link to="/" className="item">
                    <i className="icon home" />
                    All Streams
                </Link>
                <GoogleOAuth />
            </div>
        </div>
    );
};

export default Header;
