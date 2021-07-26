import React from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";

function Menu(props) {
  return (
    <div className="container">
      <div className="row">
        {props.dishes.map((dish) => {
          return (
            <div className="col-12 col-md-5 m-1">
              <Card
                key={dish.id}
                onClick={() => {
                  props.onClick(dish.id);
                }}
              >
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardImgOverlay>
                  <CardTitle tag="h5">{dish.name}</CardTitle>
                </CardImgOverlay>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
