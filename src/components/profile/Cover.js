import Cropper from "react-easy-crop";
import {useCallback, useEffect, useRef, useState} from "react";

import useClickOutside from "../../hooks/useClickOutside";
import {handleImages, handleOpenInput} from "../../utils/utils";


const Cover = ({cover, visitor}) => {
   const [showCoverMenu, setShowCoverMenu] = useState(false);
   const [coverPicture, setCoverPicture] = useState([]);
   const [error, setError] = useState("");
   const [crop, setCrop] = useState({x: 0, y: 0});
   const [zoom, setZoom] = useState(1);
   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
   const [coverImageWidth, setCoverImageWidth] = useState(0);

   const menuRef = useRef(null);
   const refInput = useRef(null);
   const coverRef = useRef(null);

   useClickOutside(menuRef, () => setShowCoverMenu(false));

   const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
   }, []);

   const handleImageInput = (e) => {
      handleImages(e, setError, setCoverPicture)
   };

   useEffect(() => {
      setCoverImageWidth(coverRef.current.clientWidth);
   }, [window.innerWidth]);

   return (
      <div className="profile_cover" ref={coverRef}>
         {
            coverPicture.length !== 0 &&
            <div className="save_changes_cover">
               <div className="save_changes_left">
                  <i className="public_icon"></i>
                  Your cover photo is public
               </div>
               <div className="save_changes_right">
                  <button className="blue_btn opacity_btn">Cancel</button>
                  <button className="blue_btn">Save changes</button>
               </div>
            </div>
         }
         <input type="file" ref={refInput} hidden accept="image/jpeg, image/png, image/webp, image/gif"
                onChange={handleImageInput}/>
         {
            error &&
            <div className="post_error comment_error">
               <div className="post_error_text">{error}</div>
               <button className="blue_btn" onClick={() => setError("")}>Try again</button>
            </div>
         }
         {coverPicture &&
            <div className="cover_cropper">
               <Cropper
                  image={coverPicture}
                  crop={crop}
                  zoom={zoom}
                  aspect={coverImageWidth / 350}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  showGrid={true}
                  objectFit="horizontal-cover"
               />
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