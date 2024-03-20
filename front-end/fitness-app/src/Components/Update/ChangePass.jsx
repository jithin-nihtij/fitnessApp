import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form,Button } from 'react-bootstrap'
import {  Navigate, useNavigate, useParams } from 'react-router-dom'

function ChangePass() {

    const {userId} = useParams()
    const navigate = useNavigate()
    const [user, setuser] = useState({})
    useEffect(() => {
      axios.get(`http://localhost:5000/singleUser/${userId}`).then((response)=>{
        setuser(response.data)
        console.log(response.data)
      })
    }, [])

    const handleChange =(event)=>{
        setuser({...user,[event.target.name]:event.target.value})
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:5000/updateUser/${userId}`, user).then((response) => {
          console.log(response.data);
          navigate(-1)
          alert('password change successfull')
        }).catch((err) => {
          if (err.response && err.response.status === 401) {
            alert('Old Password doesn\'t match new password');
          }
        });
      };
      
      

  return (
    
    <div>
         <Form onSubmit={handleSubmit}>
    
       
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter old password"
              name="oldpassword"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter new password"
              name="newpassword"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button type='submit'>Change Password</Button>
        </Form>
    </div>
  )
}

export default ChangePass