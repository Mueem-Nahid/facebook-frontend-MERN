import {ErrorMessage, useField} from 'formik'

import './style.css'
import useMediaQueryVariables from "../../../hooks/useMediaQueryVariables";

export default function LoginInput({placeholder, bottom, ...props}) {
   const [field, meta] = useField(props);
   const {view2, view8} = useMediaQueryVariables();

   return (
      <div className='input_wrap'>
         {
            meta.touched && meta.error && !bottom &&
            <div className={view2 && view8 && field.name === 'password' ? 'input_error input_error_desktop err_res_password' :
               view2 ? 'input_error input_error_desktop' : 'input_error'}
                 style={{transform: 'translateY(4px)'}}>
               <ErrorMessage name={field.name}/>
               <div className={view2 ? 'error_arrow_left' : 'error_arrow_top'}></div>
            </div>
         }
         <input className={meta.touched && meta.error ? 'input_error_border' : ''} type={field.type} name={field.name}
                placeholder={placeholder} {...field} {...props} />
         {
            meta.touched && meta.error && bottom &&
            <div className={view2 && view8 && field.name === 'confirmPassword' ? 'input_error conf_password_error'
               : view2 ? 'input_error input_error_desktop' : 'input_error'}>
               <ErrorMessage name={field.name}/>
               <div className={view2 ? 'error_arrow_left' : 'error_arrow_bottom'}></div>
            </div>
         }
         {meta.touched && meta.error &&
            <i className='error_icon' style={{top: `${!bottom && !view2 ? '63%' : '15px'}`}}></i>}
      </div>
   )
}
