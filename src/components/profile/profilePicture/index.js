import {useRef, useState} from "react";

import "./style.css";
import {handleImages} from "../../../utils/utils";
import UpdateProfilePicture from "./UpdateProfilePicture";


const ProfilePictureModal = ({setShow, profileRef}) => {
   const refInput = useRef(null);
   const [image, setImage] = useState([]);
   const [error, setError] = useState("");

   const handleOpenInput = () => {
      refInput.current.click();
   };

   const handleImageInput = (e) => {
      handleImages(e, setError, setImage)
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
                  <button className="light_blue_btn" onClick={handleOpenInput}>
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
            <div className="old_pictures_wrap"></div>
         </div>
         {image.length !== 0 &&
            <UpdateProfilePicture image={image} setImage={setImage} error={error} setError={setError} setShow={setShow} profileRef={profileRef}/>}
      </div>
   );
};

export default ProfilePictureModal;