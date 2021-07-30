import React, { useState } from "react";
import {} from "reactstrap";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./HomeComponent";
import Header from "./HeaderComponents";
import Footer from "./FooterComponent";
import Menu from "./MenuComponents";
import Contact from "./ContactComponent";
// import DishDetail from "./DishdetailComponent";
import DISHES from "../shared/dishes";
import COMMENTS from "../shared/comments";
import PROMOTIONS from "../shared/promotions";
import LEADERS from "../shared/leaders";

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
            <Menu
              dishes={dishes}
              // onClick={(dishId) => {
              //   setSelectedDishId(dishId);
              // }}
            />
            {/* <DishDetail
            dish={dishes.filter((dish) => dish.id === selectedDishId)[0]}
          /> */}
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
