import useMediaQueryVariables from "../../hooks/useMediaQueryVariables";

const GenderSelect = ({handleRegisterChange, genderError}) => {
   const {view3} = useMediaQueryVariables()
   return (
      <div className="reg_grid" style={{marginBottom: `${genderError && !view3 ? '90px' : '0'}`}}>
         <label htmlFor="male">
            Male
            <input type='radio' name='gender' id='male' value='male'
                   onChange={handleRegisterChange}/>
         </label>
         <label htmlFor="female">
            Female
            <input type='radio' name='gender' id='female' value='female'
                   onChange={handleRegisterChange}/>
         </label>
         <label htmlFor="custom">
            Custom
            <input type='radio' name='gender' id='custom' value='custom'
                   onChange={handleRegisterChange}/>
         </label>
         {genderError && <div className={!view3 ? 'input_error' : 'input_error input_error_select_large'}>
            <div className={!view3 ? 'error_arrow_bottom' : 'error_arrow_left'}></div>
            {genderError}</div>}
      </div>
   );
};

export default GenderSelect;