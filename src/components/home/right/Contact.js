import React from 'react';

const Contact = ({user}) => {
   return (
      <div className="contact hover3">
         <div className="contact_img">
            <img src={user?.picture} alt="contact-img"/>
         </div>
         <span>{user?.first_name} {user?.last_name}</span>
      </div>
   );
};

export default Contact;