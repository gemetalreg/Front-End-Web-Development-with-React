import React, { useEffect } from "react";
import {} from "reactstrap";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useParams,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchDishes } from "../redux/ActionCreators";

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
  console.log(state.dishes.dishes);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="Main">
        <Header />
        <Switch>
          <Route path="/home">
            <Home
              dish={state.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={state.dishes.isLoading}
              dishesErrMess={state.dishes.errMess}
              promotion={state.promotions.filter((promo) => promo.featured)[0]}
              leader={state.leaders.filter((leader) => leader.featured)[0]}
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
              comments={state.comments}
              isLoading={state.dishes.isLoading}
              errMess={state.dishes.errMess}
            />
          </Route>
          <Route exact path="/contactus">
            <Contact />
          </Route>
          <Redirect to="/home"></Redirect>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default Main;
