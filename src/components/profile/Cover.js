import Cropper from "react-easy-crop";
import {PulseLoader} from "react-spinners";
import {useCallback, useEffect, useRef, useState} from "react";

import useClickOutside from "../../hooks/useClickOutside";
import {updateCoverPicture} from "../../apiServices/profile";
import {handleImages, handleOpenInput} from "../../utils/utils";
import {createPost, uploadImages} from "../../apiServices/post";
import useImageCropperHandler from "../../hooks/useImageCropperHandler";


const Cover = ({user, cover, visitor}) => {
   const [coverImage, setCoverImage] = useState(cover);
   const [showCoverMenu, setShowCoverMenu] = useState(false);
   const [coverPicture, setCoverPicture] = useState([]);
   const [error, setError] = useState("");
   const [crop, setCrop] = useState({x: 0, y: 0});
   const [zoom, setZoom] = useState(1);
   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
   const [coverImageWidth, setCoverImageWidth] = useState(0);
   const [loading, setLoading] = useState(false);

   const menuRef = useRef(null);
   const refInput = useRef(null);
   const coverRef = useRef(null);
   const coverPictureRef = useRef(null);
   useClickOutside(menuRef, () => setShowCoverMenu(false));

   const handleImageCrop = useImageCropperHandler(coverPicture, croppedAreaPixels, setZoom, setCrop, setCoverImage, setError);

   const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
   }, []);

   const handleImageInput = (e) => {
      handleImages(e, setError, setCoverPicture)
   };

   useEffect(() => {
      setCoverImageWidth(coverRef.current.clientWidth);
   }, [window.innerWidth]);

   const updateCoverHandler = async () => {
      try {
         setLoading(true);
         let img = await handleImageCrop();
         let blob = await fetch(img).then((b) => b.blob());
         const path = `${process.env.REACT_APP_CLOUDINARY_FOLDER_NAME}/${user.username}/${process.env.REACT_APP_CLOUDINARY_COVER_PICTURE_FOLDER_NAME}`;
         let formData = new FormData();
         formData.append("file", blob);
         formData.append("path", path);
         const uploadImagesRes = await uploadImages(formData, path, user.token);
         console.log(uploadImagesRes)
         const {data} = await updateCoverPicture(uploadImagesRes[0].url, user.token);
         console.log("data: ", data)
         await createPost("cover", null, null, uploadImagesRes, user.id, user.token);
         coverPictureRef.current.src = `${uploadImagesRes[0]?.url}`;
         setCoverPicture([]);
         setLoading(false);
      } catch (error) {
         setLoading(false);
         setError(error.response.data.message);
      }
   }

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
                  <button className="blue_btn" onClick={updateCoverHandler}>
                     {loading ? <PulseLoader color="#fff" size="5px"/> : "Save changes"}
                  </button>
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
            <img src={cover} className="cover" alt="cover" ref={coverPictureRef}/>
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