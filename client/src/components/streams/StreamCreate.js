import { connect } from "react-redux";
import { streamCreater } from "../../actions";
import StreamForm from "./StreamForm";

const StreamCreate = ({ streamCreater }) => {
    return (
        <div>
            <h3>Create A Stream</h3>
            <StreamForm
                onSubmitAction={(formValues) => streamCreater(formValues)}
            />
        </div>
    );
};

export default connect(null, { streamCreater })(StreamCreate);
