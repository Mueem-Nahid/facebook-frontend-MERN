import {useRef, useState} from "react";

import ProfilePictureModal from "./profilePicture";

const ProfilePictureInfos = ({user, profile, visitor, profilePictures}) => {
   const [show, setShow] = useState(false);
   const profileRef = useRef(null);

   return (
      <div className="profile_img_wrap">
         {show && <ProfilePictureModal user={user} profilePictures={profilePictures} setShow={setShow}
                                       profileRef={profileRef}/>}
         <div className="profile_w_left">
            <div className="profile_w_img">
               <div className="profile_w_bg" ref={profileRef}
                    style={{backgroundSize: "cover", backgroundImage: `url(${profile?.picture})`}}>
               </div>
               {!visitor && <div className="profile_circle hover1" onClick={() => setShow(true)}>
                  <i className="camera_filled_icon"></i>
               </div>}
            </div>
            <div className="profile_w_col">
               <div className="profile_name">
                  {profile?.first_name} {profile?.last_name}
                  <div className="other_name">(Hridoy)</div>
               </div>
               <div className="profile_friend_images"></div>
            </div>
         </div>
         {
            visitor ? "" :
               <div className="profile_w_right">
                  <div className="blue_btn">
                     <img src="../../../icons/plus.png" alt="" className="invert"/>
                     <span>Add to story</span>
                  </div>
                  <div className="gray_btn">
                     <i className="edit_icon"></i>
                     <span>Edit profile</span>
                  </div>
               </div>
         }
      </div>
   );
};

export default ProfilePictureInfos;