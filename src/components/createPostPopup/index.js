import {useRef, useState} from "react";
import {PulseLoader} from "react-spinners";

import './style.css';
import PostError from "./PostError";
import ImagePreview from "./ImagePreview";
import AddToYourPost from "./AddToYourPost";
import {createPost} from "../../apiServices/post";
import useClickOutside from "../../hooks/useClickOutside";
import TextareaWithEmojiPicker from "./TextareaWithEmojiPicker";

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

   const handlePostSubmit = async () => {
      try {
         if (background) {
            setLoading(true);
            await createPost(null, background, text, null, user.id, user.token);
            setLoading(false);
            setCreatePostVisibility(false);
            setBackground("");
            setText("");
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