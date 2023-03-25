import {useRef, useState} from "react";

import './style.css';
import ImagePreview from "./ImagePreview";
import AddToYourPost from "./AddToYourPost";
import TextareaWithEmojiPicker from "./TextareaWithEmojiPicker";
import useClickOutside from "../../hooks/useClickOutside";

const CreatePostPopup = ({user, setCreatePostVisibility}) => {
   const createPostModal = useRef(null);
   const [text, setText] = useState("");
   const [showPrev, setShowPrev] = useState(false);
   const [images, setImages] = useState([]);
   const [background, setBackground] = useState("");

   useClickOutside(createPostModal, () => {
      setCreatePostVisibility(false);
   })

   return (
      <div className="blur">
         <div className="postBox" ref={createPostModal}>
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
            <button className="post_submit">Post</button>
         </div>
      </div>
   );
};

export default CreatePostPopup;