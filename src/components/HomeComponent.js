import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

import Loading from "./LoadingComponent";
import { baseUrlJoin } from "../shared/baseUrl";
import { CSSTransition } from "react-transition-group";

const MRenderCard = React.memo(function RenderCard({
  item,
  isLoading,
  errMess,
}) {
  if (isLoading) {
    return <Loading />;
  } else if (errMess) {
    return <h4>{errMess}</h4>;
  }

  return (
    <CSSTransition
      in={true}
      appear
      classNames="homecards"
      timeout={500}
      exit={false}
    >
      <Card>
        <CardImg src={baseUrlJoin(item.image)} alt={item.name} />
        <CardBody>
          <CardTitle>{item.name}</CardTitle>
          {item.designation ? (
            <CardSubtitle>{item.designation}</CardSubtitle>
          ) : null}
          <CardText>{item.description}</CardText>
        </CardBody>
      </Card>
    </CSSTransition>
  );
});

function Home(props) {
  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          <MRenderCard
            item={props.dish}
            isLoading={props.dishesLoading}
            errMess={props.dishesErrMess}
          />
        </div>
        <div className="col-12 col-md m-1">
          <MRenderCard
            item={props.promotion}
            isLoading={props.promoLoading}
            errMess={props.promoErrMess}
          />
        </div>
        <div className="col-12 col-md m-1">
          <MRenderCard
            item={props.leader}
            isLoading={props.leaderLoading}
            errMess={props.leaderErrMess}
          />
        </div>
      </div>
    </div>
  );
}
export default React.memo(Home);
