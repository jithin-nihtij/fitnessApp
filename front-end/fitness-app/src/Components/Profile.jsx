import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const { userId } = useParams();

  const [user, setuser] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:5000/singleUser/${userId}`)
      .then((res) => {
        console.log(res.data);
        setuser(res.data);
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
        <h1 className="text-center">{user.name}</h1>
        <div className="userDetails">
          <div>
            <p>age</p>
            <p>{user.age}</p>
          </div>
          <div>
            <p>weight</p>
            <p>{user.weight}</p>
          </div>
          <div>
            <p>height</p>
            <p>{user.height}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
