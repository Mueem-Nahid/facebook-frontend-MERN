import {reactsArray} from "../../utils/constants";

const ReactsPopup = ({visible, handleReactsPopup}) => {

   return (
      <>
         {
            visible &&
            <div className="reacts_popup" onMouseOver={() => handleReactsPopup(true)}
                 onMouseLeave={() => handleReactsPopup(false)}>
               {
                  reactsArray.map((react, i) => (
                     <div className="react" key={i}>
                        <img src={react.image} alt={react.name}/>
                     </div>
                  ))
               }
            </div>
         }
      </>
   );
};

export default ReactsPopup;