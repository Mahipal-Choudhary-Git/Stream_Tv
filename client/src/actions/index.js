import jsonServerStreams from "../apis/json-serverStreams";
import history from "../history";
import {
    CREATE_STREAM,
    DELETE_STREAM,
    EDIT_STREAM,
    FETCH_STREAM,
    FETCH_STREAMS,
    SIGN_IN,
    SIGN_OUT,
} from "./types";

export const signIn = (userId) => ({ type: SIGN_IN, payload: userId });

export const signOut = () => ({ type: SIGN_OUT });

export const streamCreater = (formValues) => async (dispacth, getState) => {
    const { userId } = getState().auth;
    const response = await jsonServerStreams.post("/streams", {
        ...formValues,
        userId,
    });
    dispacth({ type: CREATE_STREAM, payload: response.data });
    history.push("/");
};

export const fetchStreams = () => async (dispatch) => {
    const response = await jsonServerStreams.get("/streams");
    dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async (dispacth) => {
    const response = await jsonServerStreams.get(`/streams/${id}`);
    dispacth({ type: FETCH_STREAM, payload: response.data });
};

export const deleteStream = (id) => async (dispatch) => {
    await jsonServerStreams.delete(`/streams/${id}`);
    dispatch({ type: DELETE_STREAM, payload: id });
    history.push("/");
};

export const editStream = (id, formValues) => async (dispacth) => {
    const response = await jsonServerStreams.patch(
        `/streams/${id}`,
        formValues
    );
    dispacth({ type: EDIT_STREAM, payload: response.data });
    history.push("/");
};
