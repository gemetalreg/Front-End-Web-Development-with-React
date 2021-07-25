import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, List } from "reactstrap";

function DishDetail(props) {
  function renderDish(dish) {
    if (dish === null) {
      return <div></div>;
    }
    return (
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle tag="h5">{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  }

  function renderComments(dish) {
    if (dish === null) {
      return <div></div>;
    }

    return (
      <List type="unstyled">
        <h5>Comments</h5>
        {dish.comments.map((commentObj) => {
          return (
            <li key={dish.comments.id}>
              <p>{commentObj.comment}</p>
              <p>
                --{commentObj.author}, {commentObj.date}
              </p>
            </li>
          );
        })}
      </List>
    );
  }

  if (props.selectedDish === null) {
    return (
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {renderDish(props.selectedDish)}
        </div>
      </div>
    );
  }
  return (
    <div className="row">
      <div className="col-12 col-md-5 m-1">
        {renderDish(props.selectedDish)}
      </div>
      <div className="col-12 col-md-5 m-1">
        {renderComments(props.selectedDish)}
      </div>
    </div>
  );
}

export default DishDetail;
