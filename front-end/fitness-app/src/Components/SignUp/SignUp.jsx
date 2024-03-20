import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import "./SignUp.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    weight: "",
    height: "",
    dob: "",
    goal: "",
    profileImg: null,
  });

  const handleChange = (event) => {
    if (event.target.name === "profileImg") {
      setUser({ ...user, [event.target.name]: event.target.files[0] });
    } else {
      setUser({ ...user, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("weight", user.weight);
      formData.append("height", user.height);
      formData.append("dob", user.dob);
      formData.append("goal", user.goal);
      formData.append("profileImg", user.profileImg);

      const response = await axios.post(
        "http://localhost:5000/createUser",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setUser({
        name: "",
        email: "",
        password: "",
        weight: "",
        height: "",
        dob: "",
        goal: "",
        profileImage: null,
      });

      navigate(`/goal`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("User already exists. Please login instead.");
      } else {
        console.error("Error creating user:", error);
        setErrorMessage("Internal server error. Please try again later.");
      }
    }
  };

  return (
    <div className="signUpParent">
      <div className="signUpDiv">
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form
          onSubmit={handleSubmit}
          action="/upload"
          method="post"
          enctype="multipart/form-data"
          className="signUpForm"
        >
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="name"
              required
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              name="email"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              required
              name="password"
              onChange={handleChange}
            />
          </Form.Group>

          <>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Enter weight"
                name="weight"
                value={user.weight}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Enter height"
                name="height"
                value={user.height}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={user.dob}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Label>Goal</Form.Label>
            <Form.Control
              as="select"
              name="goal"
              value={user.goal}
              onChange={handleChange}
              required
            >
              <option value="weight loss">Weight Loss</option>
              <option value="weight gain">Weight Gain</option>
            </Form.Control>

            <Form.Group className="mb-3">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="file"
                name="profileImg"
                onChange={handleChange}
              />
            </Form.Group>
          </>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="primary" type="submit">
              Create an account
            </Button>
          </div>

          <div className="text-center">
            Already have an account?<Link to="/login">Login</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
