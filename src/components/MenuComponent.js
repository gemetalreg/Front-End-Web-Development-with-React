import React from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

import Loading from "./LoadingComponent";

const MRenderMenuItem = React.memo(function RenderMenuItem({ dish }) {
  return (
    <Card key={dish.id}>
      <Link to={`/menu/${dish.id}`}>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardImgOverlay>
          <CardTitle tag="h5">{dish.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
});

const Menu = ({ dishes }) => {
  if (dishes.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (dishes.errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4>{dishes.errMess}</h4>
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
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Menu</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>Menu</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        {dishes.dishes.map((dish) => {
          return (
            <div className="col-12 col-md-5 m-1">
              <MRenderMenuItem dish={dish} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(Menu);
