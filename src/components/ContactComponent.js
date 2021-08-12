/* eslint-disable react/jsx-pascal-case */
import React, { useState, useRef } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  FormFeedback,
} from "reactstrap";
import { Control, LocalForm } from "react-redux-form";
import { Link } from "react-router-dom";

const Contact = (props) => {
  const [contactInfo, setContactInfo] = useState({
    firstname: "",
    lastname: "",
    telnum: "",
    email: "",
    agree: false,
    contactType: "Tel.",
    message: "",
  });

  const touchedFields = useRef({
    firstname: false,
    lastname: false,
    telnum: false,
    email: false,
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    telnum: "",
    email: "",
  });

  function handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setContactInfo({ ...contactInfo, [name]: value });
  }

  function handleBlur(event) {
    const { name } = event.target;

    let isTouched = touchedFields.current[name];
    if (!isTouched) {
      touchedFields.current = { ...touchedFields.current, [name]: true };
    }

    validate(contactInfo);
  }

  function validate({ firstname, lastname, telnum, email }) {
    const validate_errors = {
      firstname: "",
      lastname: "",
      telnum: "",
      email: "",
    };

    if (touchedFields.current.firstname && firstname.length < 3) {
      validate_errors["firstname"] = "First Name should be >= 3 characters";
    } else if (touchedFields.current.firstname && firstname.length > 10) {
      validate_errors["firstname"] = "First Name should be <= 10 characters";
    }

    if (touchedFields.current.lastname && lastname.length < 3) {
      validate_errors["lastname"] = "First Name should be >= 3 characters";
    } else if (touchedFields.current.lastname && lastname.length > 10) {
      validate_errors["lastname"] = "Last Name should be <= 10 characters";
    }

    const reg = /^\d+$/;
    if (touchedFields.current.telnum && !reg.test(telnum)) {
      validate_errors["telnum"] = "Tel. Number should contain only numbers";
    }

    if (touchedFields.current.email && !email.includes("@")) {
      validate_errors["email"] = "Email should contain a @";
    }

    setErrors(validate_errors);
  }

  function handleSubmit(values) {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
  }

  return (
    <div className="container contactus">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Contact Us</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>Contact Us</h3>
          <hr />
        </div>
      </div>

      <div className="row row-content">
        <div className="col-12">
          <h3>Send us your Feedback</h3>
        </div>
        <div className="col-12 col-md-9">
          <LocalForm onSubmit={(values) => handleSubmit(values)}>
            <Row className="form-group">
              <Label htmlFor="firstname" md={2}>
                First Name
              </Label>
              <Col md={10}>
                <Control.text
                  model=".firstname"
                  id="firstname"
                  name="firstname"
                  placeholder="First Name"
                  className="form-control"
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Label htmlFor="lastname" md={2}>
                Last Name
              </Label>
              <Col md={10}>
                <Control.text
                  model=".lastname"
                  id="lastname"
                  name="lastname"
                  placeholder="Last Name"
                  className="form-control"
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Label htmlFor="telnum" md={2}>
                Contact Tel.
              </Label>
              <Col md={10}>
                <Control
                  type="telnum"
                  model=".telnum"
                  id="telnum"
                  name="telnum"
                  placeholder="Tel. Number"
                  className="form-control"
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Label htmlFor="email" md={2}>
                Email
              </Label>
              <Col md={10}>
                <Control
                  type="email"
                  model=".email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="form-control"
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col md={{ size: 6, offset: 2 }}>
                <div className="form-check">
                  <Label check>
                    <Control.checkbox
                      model=".agree"
                      name="agree"
                      className="form-check-input"
                    />{" "}
                    <strong>May we contact you?</strong>
                  </Label>
                </div>
              </Col>
              <Col md={{ size: 3, offset: 1 }}>
                <Control.select
                  model=".contactType"
                  name="contactType"
                  className="form-control"
                >
                  <option>Tel.</option>
                  <option>Email</option>
                </Control.select>
              </Col>
            </Row>
            <Row className="form-group">
              <Label htmlFor="message" md={2}>
                Your Feedback
              </Label>
              <Col md={10}>
                <Control.textarea
                  model=".message"
                  id="message"
                  name="message"
                  rows="12"
                  className="form-control"
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col md={{ size: 10, offset: 2 }}>
                <Button type="submit" color="primary">
                  Send Feedback
                </Button>
              </Col>
            </Row>
          </LocalForm>
        </div>
      </div>

      <div className="row row-content">
        <div className="col-12">
          <h3>Location Information</h3>
        </div>
        <div className="col-12 col-sm-4 offset-sm-1">
          <h5>Our Address</h5>
          <address>
            121, Clear Water Bay Road
            <br />
            Clear Water Bay, Kowloon
            <br />
            HONG KONG
            <br />
            <i className="fa fa-phone"></i>: +852 1234 5678
            <br />
            <i className="fa fa-fax"></i>: +852 8765 4321
            <br />
            <i className="fa fa-envelope"></i>:{" "}
            <a href="mailto:confusion@food.net">confusion@food.net</a>
          </address>
        </div>
        <div className="col-12 col-sm-6 offset-sm-1">
          <h5>Map of our Location</h5>
        </div>
        <div className="col-12 col-sm-11 offset-sm-1">
          <div className="btn-group" role="group">
            <a
              role="button"
              className="btn btn-primary"
              href="tel:+85212345678"
            >
              <i className="fa fa-phone"></i> Call
            </a>
            <a role="button" className="btn btn-info" href="tel:+85212345678">
              <i className="fa fa-skype"></i> Skype
            </a>
            <a
              role="button"
              className="btn btn-success"
              href="mailto:confusion@food.net"
            >
              <i className="fa fa-envelope-o"></i> Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
