import {useRef, useState} from "react";
import {PulseLoader} from "react-spinners";

import './style.css';
import PostError from "./PostError";
import ImagePreview from "./ImagePreview";
import AddToYourPost from "./AddToYourPost";
import {createPost, uploadImages} from "../../apiServices/post";
import useClickOutside from "../../hooks/useClickOutside";
import TextareaWithEmojiPicker from "./TextareaWithEmojiPicker";
import dataURItoBlob from "../../utils/dataURItoBlob";

const CreatePostPopup = ({user, setCreatePostVisibility}) => {
   const createPostModal = useRef(null);
   const [text, setText] = useState("");
   const [showPrev, setShowPrev] = useState(false);
   const [images, setImages] = useState([]);
   const [background, setBackground] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   useClickOutside(createPostModal, () => {
      setCreatePostVisibility(false);
   });

   const prepareToPost = async (type, background, text, images, user, token) => {
      setLoading(true);
      await createPost(type, background, text, images, user, token);
      setLoading(false);
      setCreatePostVisibility(false);
      background && setBackground("");
      text && setText("");
      images && setImages("");
   }

   const handlePostSubmit = async () => {
      try {
         if (background) {
            await prepareToPost(null, background, text, null, user.id, user.token);
         } else if (images && images.length) {
            setLoading(true);
            const preparedImages = images.map((img) => {
               return dataURItoBlob(img);
            });
            const path = `${process.env.REACT_APP_CLOUDINARY_FOLDER_NAME}/${user.username}/post Images`;
            let formData = new FormData();
            formData.append("path", path);
            preparedImages.forEach((image) => {
               formData.append("file", image);
            });
            const arrayOfImages = await uploadImages(formData, path, user.token);
            await prepareToPost(null, null, text, arrayOfImages, user.id, user.token);
         } else if (text) {
            await prepareToPost(null, null, text, null, user.id, user.token);
         } else {
            console.log("Nothing")
         }
      } catch (error) {
         setLoading(false);
         setError(error.response.data.message)
      }
   }

   return (
      <div className="blur">
         <div className="postBox" ref={createPostModal}>
            {
               error && <PostError error={error} setError={setError}/>
            }
            <div className="box_header">
               <div className="small_circle" onClick={() => setCreatePostVisibility(false)}>
                  <i className="exit_icon"></i>
               </div>
               <span>Create post</span>
            </div>
            <div className="box_profile">
               <img className="box_profile_img" src={user?.picture} alt={user?.first_name}/>
               <div className="box_col">
                  <div className="box_profile_name">
                     {user?.first_name} {user?.last_name}
                  </div>
                  <div className="box_privacy">
                     <img src="../../../icons/public.png" alt="icon"/>
                     <span>Public</span>
                     <i className="arrowDown_icon"></i>
                  </div>
               </div>
            </div>
            {
               !showPrev ?
                  <TextareaWithEmojiPicker text={text} setText={setText} background={background}
                                           setBackground={setBackground}/>
                  : <ImagePreview text={text} setText={setText} images={images} setImages={setImages}
                                  setShowPrev={setShowPrev}/>
            }
            <AddToYourPost setShowPrev={setShowPrev}/>
            <button className="post_submit" onClick={handlePostSubmit} disabled={loading}>
               {loading ? <PulseLoader color="#fff" size="5px"/> : "Post"}
            </button>
         </div>
      </div>
   );
};

export default CreatePostPopup;