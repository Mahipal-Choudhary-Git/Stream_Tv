import { useEffect } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

const GoogleOAuth = ({ signIn, signOut, isSignedIn }) => {
    useEffect(() => {
        window.gapi.load("client:auth2", () => {
            window.gapi.client
                .init({
                    clientId:
                        "611178499483-46rb0j76gbkqpptv9pgmi18o5d234jh5.apps.googleusercontent.com",
                    scope: "email",
                })
                .then(() => {
                    const auth = window.gapi.auth2.getAuthInstance();
                    // setIsSignedIn(auth.isSignedIn.get());
                    if (auth.isSignedIn.get())
                        signIn(auth.currentUser.get().getId());
                    else signOut();
                    auth.isSignedIn.listen(() => {
                        // setIsSignedIn(auth.isSignedIn.get());
                        if (auth.isSignedIn.get())
                            signIn(auth.currentUser.get().getId());
                        else signOut();
                    });
                });
        });
    }, []);

    const renderAuthButton = () => {
        if (isSignedIn === null) {
            return (
                <button className="ui button primary">
                    <i className="spinner loading icon" />
                    loading . . .
                </button>
            );
        } else if (isSignedIn) {
            return (
                <button
                    onClick={() =>
                        window.gapi.auth2.getAuthInstance().signOut()
                    }
                    className="ui red google button"
                >
                    <i className="google icon" />
                    Logout
                </button>
            );
        } else if (isSignedIn === false) {
            return (
                <button
                    onClick={() => window.gapi.auth2.getAuthInstance().signIn()}
                    className="ui green google button"
                >
                    <i className="google icon" />
                    Login
                </button>
            );
        }
    };

    return <div className="item">{renderAuthButton()}</div>;
};

const mapStateToProps = (state) => ({ isSignedIn: state.auth.isSignedIn });
export default connect(mapStateToProps, { signIn, signOut })(GoogleOAuth);
