import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {


  const navigate = useNavigate()
    const [step, setStep] = useState(1);
    const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
      weight: "",
      height: "",
      age: "",
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
  
      if (step === 1) {
        setStep(2);
      } else {
        try {
          const formData = new FormData();
          formData.append('name', user.name);
          formData.append('email', user.email);
          formData.append('password', user.password);
          formData.append('weight', user.weight);
          formData.append('height', user.height);
          formData.append('age', user.age);
          formData.append('profileImg', user.profileImg);

          const response = await axios.post(
            "http://localhost:5000/createUser",
            formData,{
              headers:{
                'Content-Type':'multipart/form-data'
              }
            }
          );
          console.log(response.data);
          setUser({
            name: "",
            email: "",
            password: "",
            weight: "",
            height: "",
            age: "",
            profileImage: null,
          });
          setStep(1);
          navigate('/profile')

        } catch (error) {
          console.error("Error creating user:", error);
        }
      }
    };
  
    return (
      <div>
        <div className="signUpDiv">
          <Form onSubmit={handleSubmit} action="/upload" method="post" enctype="multipart/form-data">
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
  
            {step === 2 && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Weight</Form.Label>
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
                  <Form.Label>Height</Form.Label>
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
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter age"
                    name="age"
                    value={user.age}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
  
                <Form.Group className="mb-3">
                  <Form.Label>Profile Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="profileImg"
                    onChange={handleChange}
                  />
                </Form.Group>
              </>
            )}
  
            <Button variant="primary" type="submit">
              {step === 1 ? 'Next' : 'Create an account'}
            </Button>
          </Form>
        </div>
      </div>
    );
  }
  

export default SignUp;
