import React from "react";
import {} from "reactstrap";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useParams,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./HomeComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Menu from "./MenuComponent";
import Contact from "./ContactComponent";
import DishDetail from "./DishdetailComponent";
import About from "./AboutComponent";

function DishWithId(props) {
  let { dishId } = useParams();
  console.log(dishId);
  return (
    <DishDetail
      dish={props.dishes.filter((dish) => dish.id === parseInt(dishId, 10))[0]}
      comments={props.comments.filter(
        (comment) => comment.dishId === parseInt(dishId, 10)
      )}
    />
  );
}

function Main(props) {
  const state = useSelector((state) => state);
  return (
    <BrowserRouter>
      <div className="Main">
        <Header />
        <Switch>
          <Route path="/home">
            <Home
              dish={state.dishes.filter((dish) => dish.featured)[0]}
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
            <DishWithId dishes={state.dishes} comments={state.comments} />
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
