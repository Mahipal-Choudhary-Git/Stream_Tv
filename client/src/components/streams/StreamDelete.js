import { connect } from "react-redux";
import Modal from "../Modal";
import history from "../../history";
import { deleteStream, fetchStream } from "../../actions";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const renderContent = (stream) => {
    if (!stream) return "Are You Sure?  Want To Delete This Stream.";
    return `Are You Sure?  Want To Delete Stream - ${stream.title}`;
};

const StreamDelete = ({ fetchStream, stream, match, deleteStream }) => {
    useEffect(() => {
        fetchStream(match.params.id);
    }, []);
    const actions = (
        <>
            <button
                onClick={() => deleteStream(match.params.id)}
                className="ui button youtube"
            >
                Delete
            </button>
            <Link to="/" className="ui button twitter">
                Cancel
            </Link>
        </>
    );

    return (
        <Modal
            title="Delete Stream"
            content={renderContent(stream)}
            onDismiss={() => history.push("/")}
            actions={actions}
        />
    );
};

const mapStateToProps = (state, ownProps) => ({
    stream: state.streams[ownProps.match.params.id],
});

export default connect(mapStateToProps, { fetchStream, deleteStream })(
    StreamDelete
);
