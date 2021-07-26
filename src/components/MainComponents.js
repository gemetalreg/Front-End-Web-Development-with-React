import React, { useState } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import Menu from "./MenuComponents";
import DishDetail from "./DishdetailComponent";
import DISHES from "../shared/dishes";

function Main(props) {
  const [dishes] = useState(DISHES);
  const [selectedDishId, setSelectedDishId] = useState(null);

  return (
    <div>
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
        </div>
      </Navbar>
      <Menu
        dishes={dishes}
        onClick={(dishId) => {
          setSelectedDishId(dishId);
        }}
      />
      <DishDetail
        dish={dishes.filter((dish) => dish.id === selectedDishId)[0]}
      />
    </div>
  );
}

export default Main;
