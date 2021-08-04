import { useEffect, useRef } from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

const StreamShow = ({ fetchStream, stream, match }) => {
    const videoRef = useRef(null);
    useEffect(() => {
        if (!stream) fetchStream(match.params.id);
        const renderedPlayer = buildPlayer();
        if (renderedPlayer)
            return () => {
                renderedPlayer.destroy();
            };
    });
    const buildPlayer = () => {
        let player = false;
        if (player || !stream) return;
        player = flv.createPlayer({
            type: "flv",
            url: `http://localhost:8000/live/${match.params.id}.flv`,
        });
        player.attachMediaElement(videoRef.current);
        player.load();
        return player;
    };
    if (stream)
        return (
            <div>
                <video ref={videoRef} style={{ width: "100%" }} controls />
                <div>{stream.title}</div>
            </div>
        );
    return <div>strem</div>;
};

const mapStateToProps = (state, ownProps) => ({
    stream: state.streams[ownProps.match.params.id],
});

export default connect(mapStateToProps, { fetchStream })(StreamShow);
