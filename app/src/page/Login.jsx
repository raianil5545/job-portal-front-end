import React, { useState, useRef } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { validPassword } from "../utils/validator";
import ErrorText from "../component/ErrorText";
import { ContextUser } from "../Context/Context";

const LoginForm = ({ handleClose }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const rememberMeRef = useRef();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setUserdata } = React.useContext(ContextUser);

  const onSubmit = (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const rememberUser = rememberMeRef.current.checked;
    setErrors({});
    if (!validPassword.test(password)) {
      setErrors({
        ...errors,
        ["password"]:
          "Minimun 8 character long, must contain atleast one lowercase, uppercase, number and symbol",
      });
    } else {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/user/login`, {
          email,
          password,
        })
        .then((response) => {
          navigate("/");
          if (rememberUser === "true") {
            localStorage.setItem("accessToken", response.data.accessToken);
          }
          setUserdata({
            isloggedIn: true,
            token: response.data.accessToken,
            user: response.data.user,
          });
          handleClose();
        })
        .catch((err) => {
          setErrors();
          err?.response?.data?.errors?.forEach((el) => {
            setErrors((prevErr) => {
              return {
                ...prevErr,
                [el.param]: el.msg,
              };
            });
          });
        });
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          ref={emailRef}
        />
        <ErrorText errors={errors} field="email" data={emailRef} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          ref={passwordRef}
        />
        <ErrorText errors={errors} field="password" data={passwordRef} />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="Remember Me!"
          name="remember_me"
          ref={rememberMeRef}
        />
      </Form.Group>
      <Button variant="primary" type="submit" block>
        Login
      </Button>
    </Form>
  );
};

export default function Login() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "10vh" }}
      >
        <div>
          <Link variant="primary" onClick={handleShow}>
            Jobseeker
          </Link>
        </div>
        <div className="mx-3">
          <Link variant="primary" onClick={handleShow}>
            Employer
          </Link>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}
