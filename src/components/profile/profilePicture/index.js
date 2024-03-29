import {useRef, useState} from "react";

import "./style.css";
import UpdateProfilePicture from "./UpdateProfilePicture";
import {handleImages, handleOpenInput} from "../../../utils/utils";


const ProfilePictureModal = ({user, profilePictures, setShow, profileRef}) => {
   const refInput = useRef(null);
   const [image, setImage] = useState([]);
   const [error, setError] = useState("");

   const handleImageInput = (e) => {
      handleImages(e, setError, setImage)
   }

   const handleImage = (photo) => {
      setImage(photo.secure_url);
   }

   return (
      <div className="blur">
         <input type="file" ref={refInput} hidden onChange={handleImageInput}
                accept="image/jpeg, image/png, image/webp, image/gif"/>
         <div className="post_box picture_box">
            <div className="box_header">
               <div className="small_circle" onClick={() => setShow(false)}>
                  <i className="exit_icon"></i>
               </div>
               <span>Update profile picture</span>
            </div>
            <div className="update_profile_picture_wrap">
               <div className="update_picture_buttons">
                  <button className="light_blue_btn" onClick={() => handleOpenInput(refInput)}>
                     <i className="plus_icon filter_blue"></i>
                     Upload photo
                  </button>
                  <button className="gray_btn">
                     <i className="frame_icon"></i>
                     Add frame
                  </button>
               </div>
            </div>
            {
               error &&
               <div className="post_error comment_error">
                  <div className="post_error_text">{error}</div>
                  <button className="blue_btn" onClick={() => setError("")}>Try again</button>
               </div>
            }
            <div className="old_pictures_wrap scrollbar">
               <h4>Your profile pictures</h4>
               <div className="old_pictures">
                  {
                     profilePictures?.filter(
                        (img) => img.folder === `${process.env.REACT_APP_CLOUDINARY_FOLDER_NAME}/${user.username}/${process.env.REACT_APP_CLOUDINARY_PROFILE_PICTURE_FOLDER_NAME}`
                     ).map((photo) => (
                        <img src={photo.secure_url} key={photo.public_id} alt="" onClick={() => handleImage(photo)}/>
                     ))
                  }
               </div>
               <h4>Other pictures</h4>
               <div className="old_pictures">
                  {
                     profilePictures?.filter(
                        (img) => img.folder !== `${process.env.REACT_APP_CLOUDINARY_FOLDER_NAME}/${user.username}/${process.env.REACT_APP_CLOUDINARY_PROFILE_PICTURE_FOLDER_NAME}`
                     ).map((photo) => (
                        <img src={photo.secure_url} key={photo.public_id} alt="" onClick={() => handleImage(photo)}/>
                     ))
                  }
               </div>
            </div>
         </div>
         {image.length !== 0 &&
            <UpdateProfilePicture image={image} setImage={setImage} error={error} setError={setError} setShow={setShow}
                                  profileRef={profileRef}/>}
      </div>
   );
};

export default ProfilePictureModal;