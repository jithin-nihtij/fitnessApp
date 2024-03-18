import React, { useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import axios from 'axios'

function Login() {

  const navigate = useNavigate();
  const [login, setlogin] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [userId,setUserId] = useState('')
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = login;
  
    axios.post(`http://localhost:5000/loginUser`, login)
      .then((res) => {
        console.log(res.data);
       
        
  
        if (email === 'admin@example.com') {
          navigate('/admin');
        } else {
          setUserId(res.data.userId)
         
        }
        
       
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setErrorMessage("Wrong Credentials.");
        } else {
          console.error("Error creating user:", err);
          setErrorMessage("Internal server error. Please try again later.");
        }
      });
  };

  useEffect(() => {
    if (userId) {
      navigate(`/profile/${userId}`);
    }
  }, [userId]);
  

  const handleChange=(event)=>{
    setlogin({...login,[event.target.name]:event.target.value})
  }

  return (
    <div className='loginParent'>
      <div className='loginDiv'>
      {errorMessage ? (
  <Alert variant="danger">{errorMessage}</Alert>
) : null}

      <Form onSubmit={handleSubmit} action="/upload" method="post" enctype="multipart/form-data" >
            
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

            <div style={{display:"flex",justifyContent:"center"}}>
            <Button  variant="primary" type="submit">
               Login
            </Button>
            </div>
            
            <div className="text-center">
            Already have an account?<Link to='/signup'>Sign Up</Link>
            </div>
            
          </Form>
      </div>
    </div>
  )
}

export default Login 