import {useState} from "react";

import './style.css';
import ImagePreview from "./ImagePreview";
import AddToYourPost from "./AddToYourPost";
import TextareaWithEmojiPicker from "./TextareaWithEmojiPicker";

const CreatePostPopup = () => {
   const [text, setText] = useState("");
   const [showPrev, setShowPrev] = useState(false);
   const [images, setImages] = useState([]);
   const [background, setBackground] = useState("");

   return (
      <div className="blur">
         <div className="postBox">
            <div className="box_header">
               <div className="small_circle">
                  <i className="exit_icon"></i>
               </div>
               <span>Create post</span>
            </div>
            <div className="box_profile">
               <img className="box_profile_img" src="https://randomuser.me/api/portraits/men/86.jpg" alt="user"/>
               <div className="box_col">
                  <div className="box_profile_name">
                     Mueem Nahid
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
                  <TextareaWithEmojiPicker text={text} setText={setText} background={background} setBackground={setBackground}/>
                  : <ImagePreview text={text} setText={setText} images={images} setImages={setImages} setShowPrev={setShowPrev}/>
            }
            <AddToYourPost setShowPrev={setShowPrev}/>
            <button className="post_submit">Post</button>
         </div>
      </div>
   );
};

export default CreatePostPopup;