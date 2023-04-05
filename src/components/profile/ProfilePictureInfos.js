import React from 'react';

const ProfilePictureInfos = ({profile}) => {
   return (
      <div className="profile_img_wrap">
         <div className="profile_w_left">
            <div className="profile_w_img">
               <div className="profile_w_bg"
                    style={{backgroundSize: "cover", backgroundImage: `url(${profile?.picture})`}}>
               </div>
               <div className="profile_circle hover1">
                  <i className="camera_filled_icon"></i>
               </div>
            </div>
            <div className="profile_w_col">
               <div className="profile_name">
                  {profile?.first_name} {profile?.last_name}
                  <div className="other_name">Hridoy</div>
               </div>
               <div className="profile_friend_images"></div>
            </div>
         </div>
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
      </div>
   );
};

export default ProfilePictureInfos;