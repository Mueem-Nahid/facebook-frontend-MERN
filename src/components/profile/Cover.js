import {useRef, useState} from "react";

import useClickOutside from "../../hooks/useClickOutside";
import {handleImages, handleOpenInput} from "../../utils/utils";

const Cover = ({cover, visitor}) => {
   const [showCoverMenu, setShowCoverMenu] = useState(false);
   const [coverPicture, setCoverPicture] = useState([]);
   const [error, setError] = useState("");
   const menuRef = useRef(null);
   const refInput = useRef(null);

   useClickOutside(menuRef, () => setShowCoverMenu(false));

   const handleImageInput = (e) => {
      handleImages(e, setError, setCoverPicture)
   }

   return (
      <div className="profile_cover">
         <input type="file" ref={refInput} hidden accept="image/jpeg, image/png, image/webp, image/gif"
                onChange={handleImageInput}/>
         {
            error &&
            <div className="post_error comment_error">
               <div className="post_error_text">{error}</div>
               <button className="blue_btn" onClick={() => setError("")}>Try again</button>
            </div>
         }
         {
            cover &&
            <img src={cover} className="cover" alt="cover"/>
         }
         {
            !visitor &&
            <div className="update_cover_wrapper">
               <div className="open_cover_update" onClick={() => setShowCoverMenu((prev) => !prev)}>
                  <i className="camera_filled_icon"></i>
                  Add Cover Photo
               </div>
               {
                  showCoverMenu &&
                  <div className="open_cover_menu" ref={menuRef}>
                     <div className="open_cover_menu_item hover1">
                        <i className="photo_icon"></i>
                        Select Photo
                     </div>
                     <div className="open_cover_menu_item hover1" onClick={() => handleOpenInput(refInput)}>
                        <i className="upload_icon"></i>
                        Upload Photo
                     </div>
                  </div>
               }
            </div>
         }
      </div>
   );
};

export default Cover;