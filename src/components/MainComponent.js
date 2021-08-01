import React, { useState } from "react";
import {} from "reactstrap";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useParams,
} from "react-router-dom";

import Home from "./HomeComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Menu from "./MenuComponent";
import Contact from "./ContactComponent";
import DishDetail from "./DishdetailComponent";
import About from "./AboutusComponent";

import DISHES from "../shared/dishes";
import COMMENTS from "../shared/comments";
import PROMOTIONS from "../shared/promotions";
import LEADERS from "../shared/leaders";

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
  const [dishes] = useState(DISHES);
  const [comments] = useState(COMMENTS);
  const [promotions] = useState(PROMOTIONS);
  const [leaders] = useState(LEADERS);
  // const [selectedDishId, setSelectedDishId] = useState(null);

  return (
    <BrowserRouter>
      <div className="Main">
        <Header />
        <Switch>
          <Route path="/home">
            <Home
              dish={dishes.filter((dish) => dish.featured)[0]}
              promotion={promotions.filter((promo) => promo.featured)[0]}
              leader={leaders.filter((leader) => leader.featured)[0]}
            />
          </Route>
          <Route exact path="/menu">
            <Menu dishes={dishes} />
          </Route>
          <Route exact path="/aboutus">
            <About leaders={leaders} />
          </Route>
          <Route path="/menu/:dishId">
            <DishWithId dishes={dishes} comments={comments} />
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
