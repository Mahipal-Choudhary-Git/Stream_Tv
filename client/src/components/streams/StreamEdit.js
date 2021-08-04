import _ from "lodash";
import { useEffect } from "react";
import { connect } from "react-redux";
import { editStream, fetchStream } from "../../actions";
import StreamForm from "./StreamForm";

const StreamEdit = ({ stream, match, fetchStream, editStream }) => {
    useEffect(() => {
        fetchStream(match.params.id);
    }, []);
    if (!stream) {
        return (
            <div className="ui active inverted dimmer">
                <div className="ui large text loader">Loading</div>
            </div>
        );
    }
    return (
        <div>
            <h3>Edit Stream</h3>
            <StreamForm
                initialValues={_.pick(stream, "title", "description")}
                onSubmitAction={(formValues) =>
                    editStream(match.params.id, formValues)
                }
            />
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    stream: state.streams[ownProps.match.params.id],
});
export default connect(mapStateToProps, { fetchStream, editStream })(
    StreamEdit
);
