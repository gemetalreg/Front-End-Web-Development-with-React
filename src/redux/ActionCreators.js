import * as ActionTypes from "./ActionTypes";
import DISHES from "../shared/dishes";

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

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess,
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

export const fetchDishes = () => {
  return async (dispatch) => {
    dispatch(dishesLoading(true));

    await new Promise((resolve) => setTimeout(resolve(), 2000));

    dispatch(addDishes(DISHES));
  };
};
