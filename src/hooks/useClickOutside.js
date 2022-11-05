import {useEffect} from "react";

export default function useClickOutside(ref, func) {
   useEffect(() => {
      const listener = (e) => {
         if (!ref.current || ref.current.contains(e.target)) {
            return;
         }
         func();
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
         document.removeEventListener("mousedown", listener);
         document.removeEventListener("touchstart", listener);
      }
   }, [ref])
}