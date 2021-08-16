import * as ActionTypes from "./ActionTypes";

export const addComment = (dishId, rating, author, comment) => {
  return {
    type: ActionTypes.ADD_COMMENT,
    payload: {
      id: undefined,
      dishId: dishId,
      rating: rating,
      author: author,
      comment: comment,
      date: new Date().toISOString(),
    },
  };
};
