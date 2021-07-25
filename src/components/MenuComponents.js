import React, { useState } from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";

import DishDetail from "./DishdetailComponent";

function Menu(props) {
  const [selectedDish, setSelectedDish] = useState(null);

  function onDishSelect(dish) {
    setSelectedDish(dish);
  }

  const menu = props.dishes.map((dish) => {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card key={dish.id} onClick={() => onDishSelect(dish)}>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardImgOverlay>
            <CardTitle tag="h5">{dish.name}</CardTitle>
          </CardImgOverlay>
        </Card>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">{menu}</div>
      <DishDetail selectedDish={selectedDish} />
    </div>
  );
}

export default Menu;