import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  List,
} from "reactstrap";
import { Link } from "react-router-dom";

const MRenderDish = React.memo(function RenderDish({ dish }) {
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
});

const MRenderComments = React.memo(function RenderComments({ comments }) {
  if (comments == null) {
    return <div></div>;
  }

  return (
    <List type="unstyled">
      <h5>Comments</h5>
      {comments.map((commentObj) => {
        return (
          <li key={commentObj.id}>
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
});

const DishDetail = (props) => {
  if (props.dish == null) {
    return (
      <div className="container">
        <div className="row">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/menu">Menu</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <MRenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <MRenderComments comments={props.comments} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(DishDetail);
