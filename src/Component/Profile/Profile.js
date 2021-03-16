import React from "react";
import NavBar from "../NavBar/NavBar";
import "./Profile.css";

function Profile() {
  return (
    <div className="profile">
      <NavBar />
      <div className="profile__body">
        <h1>Edit Profile</h1>
      </div>
    </div>
  );
}

export default Profile;
