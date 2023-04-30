import Cookies from "js-cookie";
import Cropper from "react-easy-crop";
import {PulseLoader} from "react-spinners";
import {useCallback, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import getCroppedImage from "../../../utils/getCroppedImage";
import {updateProfilePicture} from "../../../apiServices/profile";
import {createPost, uploadImages} from "../../../apiServices/post";
import handleImageCrop from "../../../utils/imageCropperHandler";


const UpdateProfilePicture = ({image, setImage, error, setError, setShow, profileRef}) => {
   const {user} = useSelector((state) => ({...state}));
   const [description, setDescription] = useState("");
   const [crop, setCrop] = useState({x: 0, y: 0});
   const [zoom, setZoom] = useState(1);
   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
   const [loading, setLoading] = useState(false);
   const sliderRef = useRef(null);
   const dispatch = useDispatch();

   const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
   }, []);

   const handleZoom = (type) => {
      // type = true for zoom in and type = false for zoom out
      if (type) {
         sliderRef.current.stepUp();
         setZoom(sliderRef.current.value);
      } else {
         sliderRef.current.stepDown();
         setZoom(sliderRef.current.value);
      }
   };

   const handleDesc = (e) => {
      setDescription(e.target.value);
   };

   const handleImage = () => {
      setImage([]);
   }

   const getCroppedImageHandler = useCallback(async (showCroppedImage = false) => {
      try {
         const img = await getCroppedImage(image, croppedAreaPixels);
         if (showCroppedImage) {
            setZoom(1);
            setCrop({x: 0, y: 0});
            setImage(img);
         } else {
            return img;
         }
      } catch (error) {
         setError(error);
         console.log("Error getting cropped image: ", error)
      }
   }, [croppedAreaPixels]);

   const updateProfilePictureHandler = async () => {
      try {
         setLoading(true);
         // TODO: use reusable function handleImageCrop if possible
         let img = await getCroppedImageHandler()
         let blob = await fetch(img).then((b) => b.blob());
         const path = `${process.env.REACT_APP_CLOUDINARY_FOLDER_NAME}/${user.username}/${process.env.REACT_APP_CLOUDINARY_PROFILE_PICTURE_FOLDER_NAME}`;
         let formData = new FormData();
         formData.append("file", blob);
         formData.append("path", path);
         const uploadImagesRes = await uploadImages(formData, path, user.token);
         const {data} = await updateProfilePicture(uploadImagesRes[0].url, user.token);
         await createPost("profilePicture", null, description, uploadImagesRes, user.id, user.token);
         profileRef.current.style.backgroundImage = `url(${data.picture})`;
         Cookies.set("user", JSON.stringify({...user, picture: data?.picture}));
         dispatch({type: "UPDATE_PICTURE", payload: data?.picture});
         setLoading(false);
         setShow(false);
         handleImage();
      } catch (error) {
         setLoading(false);
         setError(error.response.data.message);
      }
   }

   return (
      <div className="post_box update_image">
         <div className="box_header">
            <div className="small_circle" onClick={handleImage}>
               <i className="exit_icon"></i>
            </div>
            <span>Update profile picture</span>
         </div>
         <div className="update_image_desc">
            <textarea value={description} onChange={handleDesc} placeholder="Description..."
                      className="textarea_blue details_input"></textarea>
         </div>
         <div className="update_center">
            <div className="cropper">
               <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  showGrid={false}
               />
            </div>
            <div className="slider">
               <div className="slider_circle hover1" onClick={() => handleZoom(false)}>
                  <i className="minus_icon"></i>
               </div>
               <input type="range" value={zoom} min="1" max="3" step="0.2" ref={sliderRef}
                      onChange={(e) => setZoom(e.target.value)}/>
               <div className="slider_circle hover1" onClick={() => handleZoom(true)}>
                  <i className="plus_icon"></i>
               </div>
            </div>
         </div>
         <div className="flex_btn_section">
            <div className="gray_btn" onClick={() => getCroppedImageHandler(true)}>
               <i className="crop_icon"></i>Crop photo
            </div>
            <div className="gray_btn">
               <i className="temp_icon"></i>Make temporary
            </div>
         </div>
         <div className="flex_photo_privacy">
            <i className="public_icon"></i>
            Your profile picture is public
         </div>
         <div className="update_submit_wrap">
            <div className="blue_link" onClick={handleImage}>Cancel</div>
            <button className="blue_btn" disabled={loading} onClick={updateProfilePictureHandler}>
               {loading ? <PulseLoader color="#fff" size="5px"/> : "Save"}
            </button>
         </div>
      </div>
   );
};

export default UpdateProfilePicture;