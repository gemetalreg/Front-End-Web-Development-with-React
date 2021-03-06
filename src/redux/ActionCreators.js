import * as ActionTypes from "./ActionTypes";
import { baseUrlJoin } from "../shared/baseUrl";

export const addComment = (comment) => {
  return {
    type: ActionTypes.ADD_COMMENT,
    payload: comment,
  };
};

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  const newComment = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment,
    date: new Date().toISOString(),
  };

  return fetch(baseUrlJoin("comments"), {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(addComment(response)))
    .catch((error) => {
      console.log("post comments", error.message);
      alert(`Your comment could not be posted\nError: ${error.message}`);
    });
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

export const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess,
});

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING,
});

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders,
});

export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading());

  return fetch(baseUrlJoin("leaders"))
    .then(
      (response) => {
        if (response.ok) {
          return response;
        }
        const error = new Error(
          `Error ${response.status}: ${response.statusText}`
        );
        error.response = response;
        throw error;
      },
      (err) => {
        const errmess = new Error(err.message);
        throw errmess;
      }
    )
    .then((res) => res.json())
    .then((leaders) => dispatch(addLeaders(leaders)))
    .catch((err) => dispatch(leadersFailed(err)));
};

export const postFeedback = (feedback) => (dispatch) => {
  const newFeedback = {
    firstname: feedback.firstname,
    lastname: feedback.lastname,
    telnum: feedback.telnum,
    email: feedback.email,
    agree: feedback.agree,
    contactType: feedback.contactType,
    message: feedback.message,
  };

  return fetch(baseUrlJoin("feedback"), {
    method: "POST",
    body: JSON.stringify(newFeedback),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((feedback) => {
      alert("Current State is: " + JSON.stringify(feedback));
    })
    .catch((error) => {
      console.log("Feedback", error.message);
      alert(`Your Feedback could not be posted\nError: ${error.message}`);
    });
};
