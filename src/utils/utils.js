import {maxFileSize} from "./constants";

export const emojiHandler = ({emoji, textRef, text, setText, setCursorPosition}) => {
   const ref = textRef.current;
   ref.focus();
   const start = text.substring(0, ref.selectionStart);
   const end = text.substring(ref.selectionStart);
   const newText = start + emoji + end;
   setText(newText);
   setCursorPosition(start.length + emoji.length); // setting cursor at the right position after clicking an emoji
};

const validateImage = (img) => {
   if (img.type !== 'image/jpeg' &&
      img.type !== 'image/png' &&
      img.type !== 'image/webp' &&
      img.type !== 'image/gif') {
      return `${img.name} format is not supported. Select jpeg/png/webp/gif format.`;
   } else if (img.size > maxFileSize) {
      return `${img.name} is too large. Max 1mb is allowed.`;
   }
}

export const handleImages = (e, setError, setImages, multipleImage = false) => {
   let files = Array.from(e.target.files); //by default, it gives file list, converting them into an array
   files.forEach((img) => {
      let imgStatus = validateImage(img);
      if (imgStatus) {
         setError(imgStatus);
         files = files.filter((item) => item.name !== img.name);
         return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readerEvent) => {
         setImages((images) => [...images, readerEvent.target.result]);
      };
   });
};
