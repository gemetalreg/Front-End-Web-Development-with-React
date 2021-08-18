import * as ActionTypes from "./ActionTypes";
import { baseUrlJoin } from "../shared/baseUrl";

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

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess,
});

export const fetchComments = () => (dispatch) => {
  return fetch(baseUrlJoin("comments"))
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)));
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
    dispatch(dishesLoading());

    await new Promise((resolve) => setTimeout(resolve(), 2000));

    return fetch(baseUrlJoin("dishes"))
      .then((res) => res.json())
      .then((dishes) => dispatch(addDishes(dishes)));
  };
};

export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading());

  return fetch(baseUrlJoin("promotions"))
    .then((response) => response.json())
    .then((promos) => dispatch(addPromos(promos)));
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
});

export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess,
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos,
});
