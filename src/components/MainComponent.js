import React, { useEffect, useCallback } from "react";
import {} from "reactstrap";
import {
  Switch,
  Route,
  Redirect,
  useParams,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { actions } from "react-redux-form";
import {
  fetchDishes,
  fetchPromos,
  fetchComments,
  fetchLeaders,
  postFeedback,
} from "../redux/ActionCreators";

import Home from "./HomeComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Menu from "./MenuComponent";
import Contact from "./ContactComponent";
import DishDetail from "./DishdetailComponent";
import About from "./AboutComponent";

function DishWithId(props) {
  let { dishId } = useParams();
  return (
    <DishDetail
      dish={props.dishes.filter((dish) => dish.id === parseInt(dishId, 10))[0]}
      comments={props.comments.filter(
        (comment) => comment.dishId === parseInt(dishId, 10)
      )}
      isLoading={props.isLoading}
      errMess={props.errMess}
    />
  );
}

function Main(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchDishes());
    dispatch(fetchLeaders());
    dispatch(fetchComments());
    dispatch(fetchPromos());
  }, [dispatch]);

  const resetFeedbackForm = useCallback(() => {
    dispatch(actions.reset("feedback"));
  }, [dispatch]);

  const postFeedbackForm = useCallback(
    (feedback) => {
      dispatch(postFeedback(feedback));
    },
    [dispatch]
  );

  return (
    <div className="Main">
      <Header />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="page" timeout={300}>
          <Switch location={location}>
            <Route path="/home">
              <Home
                dish={state.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={state.dishes.isLoading}
                dishesErrMess={state.dishes.errMess}
                promotion={
                  state.promotions.promotions.filter(
                    (promo) => promo.featured
                  )[0]
                }
                promoLoading={state.promotions.isLoading}
                promoErrMess={state.promotions.errMess}
                leader={
                  state.leaders.leaders.filter((leader) => leader.featured)[0]
                }
                leaderLoading={state.leaders.isLoading}
                leaderErrMess={state.leaders.errMess}
              />
            </Route>
            <Route exact path="/menu">
              <Menu dishes={state.dishes} />
            </Route>
            <Route exact path="/aboutus">
              <About leaders={state.leaders} />
            </Route>
            <Route path="/menu/:dishId">
              <DishWithId
                dishes={state.dishes.dishes}
                isLoading={state.dishes.isLoading}
                errMess={state.dishes.errMess}
                comments={state.comments.comments}
                commentsErrMess={state.comments.errMess}
              />
            </Route>
            <Route exact path="/contactus">
              <Contact
                resetFeedbackForm={resetFeedbackForm}
                postFeedback={postFeedbackForm}
              />
            </Route>
            <Redirect to="/home"></Redirect>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </div>
  );
}

export default Main;
