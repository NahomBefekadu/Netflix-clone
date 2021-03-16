import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { auth } from "../../firebase";
import NavBar from "../NavBar/NavBar";
import "./Profile.css";

function Profile() {
  const user = useSelector(selectUser);
  return (
    <div className="profile">
      <NavBar />
      <div className="profile__body">
        <h1>Edit Profile</h1>
        <div className="profile__info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt=""
          />
          <div className="profile__details">
            <h2>{user.email}</h2>
            <div className="profile__plans">
              <h3>Plans</h3>
              <p>Renewal Date</p>
              <div className="profile__plan">
                <div className="profile__planDescription">
                  <h4>Netflix Standard</h4>
                  <h5>1080p</h5>
                </div>
                <button>Subscribe</button>
              </div>
              <div className="profile__plan">
                <div className="profile__planDescription">
                  <h4>Netflix Basic</h4>
                  <h5>480p</h5>
                </div>
                <button>Subscribe</button>
              </div>
              <div className="profile__plan">
                <div className="profile__planDescription">
                  <h4>Netflix Premium</h4>
                  <h5>4K+HDR</h5>
                </div>
                <button>Subscribe</button>
              </div>
              <button
                className="profile__signOutButton"
                // onClick={() => auth.signOut()}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
