import EmojiPicker from "emoji-picker-react";
import {useEffect, useRef, useState} from "react";

import {emojiHandler, handleImages} from "../../utils/utils";

const CreateComment = ({user}) => {
   const textRef = useRef(null);
   const imageInputRef = useRef(null);
   const [picker, setPicker] = useState(false);
   const [text, setText] = useState("");
   const [cursorPosition, setCursorPosition] = useState();
   const [error, setError] = useState("");
   const [commentImage, setCommentImage] = useState([]);

   const previewConfig = {
      showPreview: false
   };

   const handleEmoji = ({emoji}) => {
      emojiHandler({emoji, textRef, text, setText, setCursorPosition});
   };

   const handleOpenInput = () => {
      imageInputRef.current.click();
   };

   const handleCommentImage = (e) => {
      handleImages(e, setError, setCommentImage)
   }

   useEffect(() => {
      if (text) {
         textRef.current.selectionEnd = cursorPosition;
      }
   }, [cursorPosition]);

   return (
      <div className="create_comment_wrap">
         <div className="create_comment">
            <img src={user?.picture} alt="user"/>
            <div className="comment_input_wrap">
               {
                  picker &&
                  <div className="comment_emoji_picker">
                     <EmojiPicker onEmojiClick={handleEmoji} height={350} width={300} searchDisabled
                                  previewConfig={previewConfig}/>
                  </div>
               }
               <input type="file" hidden ref={imageInputRef} onChange={handleCommentImage}
                      accept="image/jpeg, image/png, image/webp, image/gif"/>
               {
                  error &&
                  <div className="post_error comment_error">
                     <div className="post_error_text">{error}</div>
                     <button className="blue_btn" onClick={() => setError("")}>Try again</button>
                  </div>
               }
               <input type="text" ref={textRef} value={text} placeholder="Write a comment..."
                      onChange={(e) => setText(e.target.value)}/>

               <div className="comment_circle_icon hover2" onClick={() => setPicker(prev => !prev)}>
                  <i className="emoji_icon"></i>
               </div>
               <div className="comment_circle_icon hover2" onClick={handleOpenInput}>
                  <i className="camera_icon"></i>
               </div>
               <div className="comment_circle_icon hover2">
                  <i className="gif_icon"></i>
               </div>
               <div className="comment_circle_icon hover2">
                  <i className="sticker_icon"></i>
               </div>
            </div>
         </div>
         {
            commentImage.length ?
               <div className="comment_image_preview">
                  <img src={commentImage[0]} alt=""/>
                  <div className="small_white_circle" onClick={() => setCommentImage([])}>
                     <i className="exit_icon"></i>
                  </div>
               </div> : ""
         }
      </div>
   );
};

export default CreateComment;