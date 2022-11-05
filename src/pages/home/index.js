import {useRef, useState} from "react";
import Header from "../../components/header";
import useClickOutside from "../../hooks/useClickOutside";

export default function Home() {
   const [visible, setVisible] = useState(true);
   const el = useRef(null);

   useClickOutside(el, () => {
      setVisible(false);
      // el.current.style.display = "none";
   });

   return (
      <div>
         <Header/>
         {visible && <div className="card" ref={el}></div>}
      </div>
   )
}
