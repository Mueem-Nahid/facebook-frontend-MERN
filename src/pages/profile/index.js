import {useSelector} from "react-redux";
import {useEffect, useReducer,} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

import "./style.css";
import Header from "../../components/header";
import Cover from "../../components/profile/Cover";
import {getProfile} from "../../apiServices/profile";
import CreatePost from "../../components/createPost";
import GridPosts from "../../components/profile/GridPosts";
import {profileReducer} from "../../reducers/profileReducer";
import ProfileMenu from "../../components/profile/ProfileMenu";
import PeopleYouMayKnow from "../../components/profile/PeopleYouMayKnow";
import ProfilePictureInfos from "../../components/profile/ProfilePictureInfos";
import Post from "../../components/post";
import Photos from "../../components/profile/Photos";
import Friends from "../../components/profile/Friends";


export default function Profile({setCreatePostVisibility}) {
   const navigate = useNavigate();
   const {username} = useParams();
   const {user} = useSelector((state) => ({...state}));
   let userName = username === undefined ? user?.username : username;
   let visitor = userName !== user?.username;

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
               <Cover cover={profile?.cover} visitor={visitor}/>
               <ProfilePictureInfos profile={profile} visitor={visitor}/>
               <ProfileMenu/>
            </div>
         </div>
         <div className="profile_bottom">
            <div className="profile_container">
               <div className="bottom_container">
                  <PeopleYouMayKnow/>
                  <div className="profile_grid">
                     <div className="profile_left">
                        <Photos username={userName} token={user.token}/>
                        <Friends friends={profile?.friends}/>

                        {/*TODO: use a common component*/}
                        <div className="relative_fb_copyright">
                           <Link to="#">Privacy </Link>
                           <span>. </span>
                           <Link to="#">Terms </Link>
                           <span>. </span>
                           <Link to="#">Advertising </Link>
                           <span>. </span>
                           <Link to="#">Ad Choices <i className="ad_choices_icon"></i>{" "} </Link>
                           <span>. </span>
                           <Link to="#">Cookies </Link>
                           <span>. </span>
                           <Link to="#">More</Link>
                           <span>. </span> <br/>
                           Meta @ 2022
                        </div>
                     </div>
                     <div className="profile_right">
                        {
                           !visitor &&
                           <CreatePost user={user} setCreatePostVisibility={setCreatePostVisibility} profile/>
                        }
                        <GridPosts/>
                        <div className="posts">
                           {
                              profile.posts && profile.posts.length !== 0 ?
                                 profile.posts.map((post) => (
                                    <Post key={post._id} post={post} user={user} profile/>
                                 )) :
                                 <div className="no_post">No post available</div>
                           }
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
