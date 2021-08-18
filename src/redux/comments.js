import * as ActionTypes from "./ActionTypes";

const initialSate = { errMess: null, comments: [] };

export const Comments = (state = initialSate, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return { ...state, errMess: null, comments: action.payload };

    case ActionTypes.COMMENTS_FAILED:
      return { ...state, errMess: action.payload };

    case ActionTypes.ADD_COMMENT:
      var comment = action.payload;
      return { ...state, comments: state.comments.concat(comment) };

    default:
      return state;
  }
};
