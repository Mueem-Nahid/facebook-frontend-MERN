import {ErrorMessage, useField} from 'formik'
import './style.css'
import useMediaQueryVariables from "../../../hooks/useMediaQueryVariables";

export default function RegisterInput({placeholder, bottom, ...props}) {
   const [field, meta] = useField(props);
   const {view1, view3} = useMediaQueryVariables()

   const test1 = view3 && field.name === 'first_name'
   const test2 = view3 && field.name === 'last_name'

   return (
      <div className='input_wrap register_input_wrap'>
         <input className={meta.touched && meta.error ? 'input_error_border' : ''}
                style={{
                   width: `${view1 && (field.name === 'first_name' || field.name === 'last_name') ? '100%'
                      : view1 && (field.name === 'email' || field.name === 'password') ? '370px' : '300px'}`
                }}
                type={field.type} name={field.name} placeholder={placeholder} {...field} {...props} />
         {
            meta.touched && meta.error &&
            <div className={view3 ? 'input_error input_error_desktop' : 'input_error'}
                 style={{left: `${test1 ? '-107%' : test2 ? '107%' : ''}`}}>
               <ErrorMessage name={field.name}/>
               <div className={view3 && field.name !== 'last_name'
                  ? 'error_arrow_left'
                  : view3 && field.name === 'last_name'
                     ? 'error_arrow_right'
                     : !view3 && 'error_arrow_bottom'}></div>
            </div>
         }
         {meta.touched && meta.error && <i className='error_icon'></i>}
      </div>
   )
}
