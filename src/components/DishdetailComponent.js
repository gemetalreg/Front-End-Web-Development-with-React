/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  List,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Label,
} from "reactstrap";
import { LocalForm, Control, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
import { postComment } from "../redux/ActionCreators";
import { useDispatch } from "react-redux";
import Loading from "./LoadingComponent";
import { baseUrlJoin } from "../shared/baseUrl";
import { CSSTransition } from "react-transition-group";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

const CommentForm = ({ dishId }) => {
  function handleSubmit(values) {
    console.log("Current State is: " + JSON.stringify(values));
    console.log("dishId: ", dishId);

    alert("Current State is: " + JSON.stringify(values));
    toggle();
    dispatch(postComment(dishId, values.rating, values.author, values.comment));
  }

  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button outline color="secondary" onClick={toggle}>
        <i className="fa fa-pencil" aria-hidden="true"></i> Submit Comment
      </Button>
      <Modal isOpen={modal} toggle={toggle} centered={true}>
        <ModalHeader toggle={toggle}>Submit Comment</ModalHeader>
        <ModalBody>
          <LocalForm
            className="container"
            onSubmit={(values) => handleSubmit(values)}
          >
            <Row className="form-group mb-4">
              <Label htmlFor="commentRating" className="h6">
                Rating
              </Label>
              <Control.select
                model=".rating"
                name="rating"
                id="commentRating"
                className="form-control"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Control.select>
            </Row>
            <Row className="form-group mb-4">
              <Label htmlFor="commentAuthor" className="h6">
                Author
              </Label>
              <Control.text
                model=".author"
                name="author"
                id="commentAuthor"
                placeholder="Jogesh Muppala"
                className="form-control"
                validators={{
                  required,
                  minLength: minLength(3),
                  maxLength: maxLength(15),
                }}
              />
              <Errors
                className="text-danger"
                model=".author"
                show="touched"
                messages={{
                  required: "Required",
                  minLength: "Must be greater than 2 characters",
                  maxLength: "Must be 15 characters or less",
                }}
              />
            </Row>
            <Row className="form-group mb-4">
              <Label htmlFor="commentComment" className="h6">
                Comment
              </Label>
              <Control.textarea
                model=".comment"
                name="comment"
                id="commentComment"
                className="form-control"
                placeholder="This is a comment"
              />
            </Row>
            <Row>
              <Button color="primary" type="submit">
                Submit
              </Button>
            </Row>
          </LocalForm>
        </ModalBody>
      </Modal>
    </div>
  );
};

const MRenderDish = React.memo(function RenderDish({ dish }) {
  const [transitionState, setTransitionState] = useState(false);

  useEffect(() => {
    setTransitionState(true);
  }, []);

  if (dish == null) {
    return <div></div>;
  }

  return (
    <CSSTransition in={transitionState} classNames="homecards" timeout={500}>
      <Card>
        <CardImg top src={baseUrlJoin(dish.image)} alt={dish.name} />
        <CardBody>
          <CardTitle tag="h5">{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </CSSTransition>
  );
});

const MRenderComments = React.memo(function RenderComments({
  dishId,
  comments,
}) {
  const defaultStyle = (i) => {
    return {
      opacity: "0",
      animation: `fade 500ms forwards`,
      animationDelay: `${i * 200}ms`,
    };
  };

  if (comments == null) {
    return <div></div>;
  }

  return (
    <React.Fragment>
      <List type="unstyled">
        <h5>Comments</h5>
        {comments.map((commentObj, index) => {
          return (
            <li key={commentObj.id} style={{ ...defaultStyle(index) }}>
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
      <CommentForm dishId={dishId} />
    </React.Fragment>
  );
});

const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  }
  if (props.dish == null) {
    return (
      <div className="container">
        <div className="row">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/menu">Menu</Link>
              </BreadcrumbItem>
            </Breadcrumb>
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
          <MRenderComments dishId={props.dish.id} comments={props.comments} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(DishDetail);
