import EmojiPicker from "emoji-picker-react";
import {useEffect, useRef, useState} from 'react';

import {emojiHandler} from "../../utils/utils";
import {postBackground} from "../../utils/constants";

const TextareaWithEmojiPicker = ({text, setText, type2, background, setBackground}) => {
   const [picker, setPicker] = useState(false);
   const [showBackground, setShowBackground] = useState(false);
   const [cursorPosition, setCursorPosition] = useState();
   const textRef = useRef(null);
   const backgroundRef = useRef(null);

   const previewConfig = {
      showPreview: false
   };

   const handleEmoji = ({emoji}) => {
      emojiHandler({emoji, textRef, text, setText, setCursorPosition});
   }

   const handleBackground = (i = null) => {
      backgroundRef.current.style.backgroundImage = i !== null ? `url(${postBackground[i]})` : "";
      setBackground(i !== null ? postBackground[i] : "");
      i !== null ? backgroundRef.current.classList.add("background_handler") :
         backgroundRef.current.classList.remove("background_handler");
   }

   useEffect(() => {
      textRef.current.selectionEnd = cursorPosition;
   }, [cursorPosition]);

   return (
      <div className={type2 ? "images_input" : ""}>
         <div className={!type2 ? "flex_center" : ""} ref={backgroundRef}>
            <textarea className={`post_input ${type2 ? 'post_input_2' : ''}`} ref={textRef} maxLength="600" value={text}
                      onChange={(e) => setText(e.target.value)} placeholder="What's on your mind, Mueem?"
                      style={{
                         paddingTop: `${background ?
                            Math.abs(textRef.current.value.length * 0.1 - 32) :
                            "0"}%`,
                      }}>
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
               !type2 && <img src="../../../icons/colorful.png" alt="colorful"
                              onClick={() => setShowBackground((prev) => !prev)}/>
            }
            {
               !type2 && showBackground &&
               <div className="post_background">
                  <div className="no_background" onClick={() => handleBackground(null)}></div>
                  {
                     postBackground.map((bg, i) => (
                        <img src={bg} key={i} alt={`background-${i}`} onClick={() => handleBackground(i)}/>
                     ))
                  }
               </div>
            }
            <i className={`emoji_icon_large ${type2 ? "move_left" : ""}`} onClick={() => setPicker(prev => !prev)}></i>
         </div>
      </div>
   );
};

export default TextareaWithEmojiPicker;