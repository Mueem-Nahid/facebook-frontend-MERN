import { useMediaQuery } from 'react-responsive'
import { ErrorMessage, useField } from 'formik'
import './style.css'

export default function LoginInput({ placeholder, bottom, ...props }) {
   const [field, meta] = useField(props);
   const desktopView = useMediaQuery({
      query: '(min-width: 850px)',
   });

   return (
      <div className='input_wrap'>
         {
            meta.touched && meta.error && !bottom && <div className={desktopView ? 'input_error input_error_desktop' : 'input_error'} style={{ transform: 'translateY(4px)' }}>
               <ErrorMessage name={field.name} />
               <div className={desktopView ? 'error_arrow_left' : 'error_arrow_top'}></div>
            </div>
         }
         <input className={meta.touched && meta.error ? 'input_error_border' : ''} type={field.type} name={field.name} placeholder={placeholder} {...field} {...props} />
         {
            meta.touched && meta.error && bottom && <div className={desktopView ? 'input_error input_error_desktop' : 'input_error'}>
               <ErrorMessage name={field.name} />
               <div className={desktopView ? 'error_arrow_left' : 'error_arrow_bottom'}></div>
            </div>
         }
         {meta.touched && meta.error && <i className='error_icon' style={{ top: `${!bottom && !desktopView ? '63%' : '15px'}` }}></i>}
      </div>
   )
}
