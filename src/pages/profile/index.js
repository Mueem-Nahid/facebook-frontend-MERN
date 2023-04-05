import {useSelector} from "react-redux";
import {useEffect, useReducer, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import "./style.css";
import Header from "../../components/header";
import {getProfile} from "../../apiServices/profile";
import {profileReducer} from "../../reducers/profileReducer";
import Cover from "../../components/profile/Cover";
import ProfilePictureInfos from "../../components/profile/ProfilePictureInfos";


export default function Profile() {
   const navigate = useNavigate();
   const {username} = useParams();
   const {user} = useSelector((state) => ({...state}));
   let userName = username === undefined ? user?.username : username;

   const [{loading, error, profile}, dispatch] = useReducer(profileReducer, {
      loading: false,
      profile: {},
      error: "",
   });

   const fetchUserProfile = async () => {
      try {
         dispatch({
            type: "PROFILE_REQUEST",
         });
         const {data} = await getProfile(userName, user.token);
         dispatch({
            type: "PROFILE_SUCCESS",
            payload: data,
         });
      } catch (error) {
         navigate("/profile");
         dispatch({
            type: "PROFILE_ERROR",
            payload: error.response.data.message,
         })
      }
   };

   useEffect(() => {
      fetchUserProfile();
   }, [userName])

   return (
      <div className="profile">
         <Header page="profile"/>
         <div className="profile_top">
            <div className="profile_container">
               <Cover cover={profile.cover}/>
               <ProfilePictureInfos profile={profile}/>
            </div>
         </div>
      </div>
   )
}
