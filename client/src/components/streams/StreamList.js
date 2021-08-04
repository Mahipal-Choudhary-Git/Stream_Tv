import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams } from "../../actions";

const renderAdmin = (stream, auth) => {
    if (stream.userId === auth.userId)
        return (
            <div className="right floated content">
                <Link
                    to={`/stream/edit/${stream.id}`}
                    className="ui button teal circular icon"
                >
                    <i className="icon pencil alternate" />
                </Link>
                <Link
                    to={`/stream/delete/${stream.id}`}
                    className="ui button circular youtube icon"
                >
                    <i className="icon trash alternate" />
                </Link>
            </div>
        );
};

const renderList = (streams, auth) =>
    streams.map((stream) => (
        <div key={stream.id} className="item">
            {auth.isSignedIn && <div>{renderAdmin(stream, auth)}</div>}
            <i className="large middle aligned icon play circle" />
            <div className="content">
                <Link to={`/stream/${stream.id}`} className="header">
                    <h4> {stream.title}</h4>
                </Link>
                <div className="description">{stream.description}</div>
            </div>
        </div>
    ));

const renderCreateStream = () => (
    <div style={{ textAlign: "right" }}>
        <Link to="stream/new" className="ui button twitter">
            Create Stream
        </Link>
    </div>
);

const StreamList = ({ fetchStreams, streams, auth }) => {
    useEffect(() => {
        fetchStreams();
    }, []);
    return (
        <div>
            <h2>Streams</h2>
            <div className="ui celled list">{renderList(streams, auth)}</div>
            {auth.isSignedIn && renderCreateStream()}
        </div>
    );
};

const mapStateToProps = (state) => {
    return { streams: Object.values(state.streams), auth: state.auth };
};
export default connect(mapStateToProps, { fetchStreams })(StreamList);
