import COMMENTS from "../shared/comments";
import * as ActionTypes from "./ActionTypes";

export const Comments = (state = COMMENTS, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
      const comment = action.payload;
      comment.id = state.length;
      console.log("ADD_COMMENT: ", comment);
      return state.concat(comment);
    default:
      return state;
  }
};
