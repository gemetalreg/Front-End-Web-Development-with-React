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
    .then(
      (res) => {
        if (res.ok) {
          return res;
        }
        const err = new Error(`Error ${res.status}: ${res.statusText}`);
        err.response = res;
        throw err;
      },
      (err) => {
        const errmess = new Error(err.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
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

    return fetch(baseUrlJoin("dishes"))
      .then(
        (res) => {
          if (res.ok) {
            return res;
          }
          const err = new Error(`Error ${res.status}: ${res.statusText}`);
          err.response = res;
          throw err;
        },
        (err) => {
          const errmess = new Error(err.message);
          throw errmess;
        }
      )
      .then((res) => res.json())
      .then((dishes) => dispatch(addDishes(dishes)))
      .catch((error) => dispatch(dishesFailed(error.message)));
  };
};

export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading());

  return fetch(baseUrlJoin("promotions"))
    .then(
      (res) => {
        if (res.ok) {
          return res;
        }
        const err = new Error(`Error ${res.status}: ${res.statusText}`);
        err.response = res;
        throw err;
      },
      (err) => {
        const errmess = new Error(err.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((promos) => dispatch(addPromos(promos)))
    .catch((error) => dispatch(promosFailed(error)));
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
