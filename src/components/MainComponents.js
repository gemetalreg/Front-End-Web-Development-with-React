import React, { useState } from "react";
import {} from "reactstrap";
import Header from "./HeaderComponents";
import Footer from "./FooterComponent";
import Menu from "./MenuComponents";
import DishDetail from "./DishdetailComponent";
import DISHES from "../shared/dishes";

function Main(props) {
  const [dishes] = useState(DISHES);
  const [selectedDishId, setSelectedDishId] = useState(null);

  return (
    <div>
      <Header />
      <Menu
        dishes={dishes}
        onClick={(dishId) => {
          setSelectedDishId(dishId);
        }}
      />
      <DishDetail
        dish={dishes.filter((dish) => dish.id === selectedDishId)[0]}
      />
      <Footer />
    </div>
  );
}

export default Main;
