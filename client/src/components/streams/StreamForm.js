import { Field, reduxForm } from "redux-form";

const renderInput = ({ input, label, meta }) => (
    <div className="six column wide field">
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {meta.touched && meta.error && (
            <div className="ui error message">
                <div className="header">{meta.error}</div>
            </div>
        )}
    </div>
);

const StreamForm = ({ handleSubmit, onSubmitAction }) => {
    return (
        <form onSubmit={handleSubmit(onSubmitAction)} className="ui form error">
            <Field name="title" component={renderInput} label="Title" />
            <Field
                name="description"
                component={renderInput}
                label="Description"
            />
            <button className="ui button primary">Submit</button>
        </form>
    );
};

const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) errors.title = "plz enter title";
    if (!formValues.description) errors.description = "plz enter description";
    return errors;
};

export default reduxForm({ form: "form", validate })(StreamForm);
