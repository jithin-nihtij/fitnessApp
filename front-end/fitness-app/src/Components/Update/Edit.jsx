import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

function Edit() {
  const { userId } = useParams();
 const navigate = useNavigate()
  const [user, setuser] = useState({
    name: "",
    weight: "",
    height: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/singleUser/${userId}`).then((response) => {
      console.log(response.data);
      setuser(response.data);
    });
  }, []);

  const handleChange = (event) => {
    setuser({...user,[event.target.name]:event.target.value})
  };

  const handleSubmit = (event) => {
    event.preventDefault()

    const token = JSON.parse(localStorage.getItem('token'))
    console.log('token',token);

    axios.put(`http://localhost:5000/updateUser/${userId}`,user,{
        headers:{
          Authorization:`Bearer ${token}`
        }
    }).then((response)=>{
      console.log(response.data)
      navigate(-1)
    })
  };

  const changePass=()=>{
    navigate(`/changePass/${userId}`)
  }

  return (
    <div>
      <div>
        <img src={`http://localhost:5000/uploads/${user.profileImg}`} alt="" />
      </div>
      <Form
        onSubmit={handleSubmit}
        action="/upload"
        method="post"
        enctype="multipart/form-data"
        
      >
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="name"
            value={user.name}
            required
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
         
        </>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="primary" type="submit">
            Submit Edit
          </Button>
        </div>
      </Form>
      <div>
        <Button onClick={changePass}>Change Password</Button>
      </div>
    </div>
  );
}

export default Edit;
