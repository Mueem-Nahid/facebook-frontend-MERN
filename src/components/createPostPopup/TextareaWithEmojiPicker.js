import {useEffect, useState} from 'react';
import EmojiPicker from "emoji-picker-react";

const TextareaWithEmojiPicker = ({text, textRef, setText}) => {
   const [picker, setPicker] = useState(false);
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
   );
};

export default TextareaWithEmojiPicker;