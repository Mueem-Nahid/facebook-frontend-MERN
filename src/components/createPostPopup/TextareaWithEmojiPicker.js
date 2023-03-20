import EmojiPicker from "emoji-picker-react";
import {useEffect, useRef, useState} from 'react';

const TextareaWithEmojiPicker = ({text, setText, type2}) => {
   const [picker, setPicker] = useState(false);
   const [cursorPosition, setCursorPosition] = useState();
   const textRef = useRef(null);

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
      <div className={type2 ? "images_input" : ""}>
         <div className={!type2 ? "flex_center" : ""}>
            <textarea className={`post_input ${type2 ? 'post_input_2' : ''}`} ref={textRef} maxLength="600" value={text}
                      onChange={(e) => setText(e.target.value)} placeholder="What's on your mind, Mueem?">
            </textarea>
         </div>
         <div className={!type2 ? 'post_emojis_wrap' : ""}>
            {
               picker && <div className={`comment_emoji_picker ${type2 ? 'move_picker_2' : 'move_picker'}`}>
                  <EmojiPicker onEmojiClick={handleEmoji} height={350} width={300} searchDisabled
                               previewConfig={previewConfig}/>
               </div>
            }
            {
               !type2 && <img src="../../../icons/colorful.png" alt="colorful"/>
            }
            <i className={`emoji_icon_large ${type2 ? "move_left" : ""}`} onClick={() => setPicker(prev => !prev)}></i>
         </div>
      </div>
   );
};

export default TextareaWithEmojiPicker;