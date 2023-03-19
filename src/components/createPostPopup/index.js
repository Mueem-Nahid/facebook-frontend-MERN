import EmojiPicker from 'emoji-picker-react';
import {useEffect, useRef, useState} from "react";

import './style.css';

const CreatePostPopup = () => {
   const [text, setText] = useState("");
   const [showPrev, setShowPrev] = useState(false);
   const [picker, setPicker] = useState(false);
   const textRef = useRef(null);
   const [cursorPosition, setCursorPosition] = useState();

   const previewConfig = {
      showPreview: false
   };

   const handleEmoji = ({emoji}) => {
      const ref = textRef.current;
      ref.focus();
      const start = text.substring(0, ref.selectionStart);
      const end = text.substring(ref.selectionStart);
      const newText = start + emoji + end;
      setText(newText);
      setCursorPosition(start.length + emoji.length); // setting cursor at the right position after clicking an emoji
   }

   useEffect(() => {
      textRef.current.selectionEnd = cursorPosition;
   }, [cursorPosition]);

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
               !showPrev && <div className="flex_center">
               <textarea className="post_input" ref={textRef} maxLength="600" value={text}
                         onChange={(e) => setText(e.target.value)} placeholder="What's on your mind, Mueem?">

               </textarea>
               </div>
            }
            <div className="post_emojis_wrap">
               {
                  picker && <div className="comment_emoji_picker rlmove">
                     <EmojiPicker onEmojiClick={handleEmoji} height={350} width={300} searchDisabled
                                  previewConfig={previewConfig}/>
                  </div>
               }
               <img src="../../../icons/colorful.png" alt="colorful"/>
               <i className="emoji_icon_large" onClick={() => setPicker(prev => !prev)}></i>
            </div>
         </div>
      </div>
   );
};

export default CreatePostPopup;