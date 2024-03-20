import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './Profile.css'
import { Button } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";

function Profile() {
  const { userId } = useParams();

  const [user, setUser] = useState({});
  const [age, setAge] = useState('');
  
  useEffect(() => { 
    axios
      .get(`http://localhost:5000/singleUser/${userId}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
  
        const dobParts = res.data.dob.split('-');
        console.log(dobParts)
        const dob = new Date(`${dobParts[0]}-${dobParts[1]}-${dobParts[2]}`);
        const ageDate = new Date(Date.now() - dob.getTime());
        const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
        setAge(calculatedAge.toString());
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, [userId]);
  


  return (
    <div className="profileParent">
      <div className="profileDiv">
        <div className="imgDiv">
          <img
            src={`http://localhost:5000/uploads/${user.profileImg}`}
            alt=""
          />
        </div>
        <h1 className="text-center" style={{ textTransform: "uppercase" }}>
          {user.name}
        </h1>
        <div className="userDetails">
          <div>
            <p>age</p>
            <p>{age}</p>
          </div>
          <div>
            <p>weight</p>
            <p>{user.weight}kg</p>
          </div>
          <div>
            <p>height</p>
            <p>{user.height}cm</p>
          </div>
        </div>
      </div>
      <div className="editBtn">
        <Link to={`/edit/${userId}`}>
          <Button>
            <CiEdit />
          </Button>
        </Link>
      </div>
      <div>
        <Link to={`/feed/${userId}`}>
          Feed
        </Link>
      </div>
    </div>
  );
}

export default Profile;
