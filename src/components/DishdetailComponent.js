import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, List } from "reactstrap";

function DishDetail(props) {
  function renderDish(dish) {
    if (dish == null) {
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
    if (dish == null) {
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
                --{commentObj.author},{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(Date.parse(commentObj.date)))}
              </p>
            </li>
          );
        })}
      </List>
    );
  }

  if (props.dish == null) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-5 m-1">{renderDish(props.dish)}</div>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-5 m-1">{renderDish(props.dish)}</div>
        <div className="col-12 col-md-5 m-1">{renderComments(props.dish)}</div>
      </div>
    </div>
  );
}

export default DishDetail;
