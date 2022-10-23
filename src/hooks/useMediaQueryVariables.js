import {useMediaQuery} from "react-responsive";

function useMediaQueryVariables(props) {
   const view1 = useMediaQuery({
      query: '(min-width: 539px)',
   });
   const view2 = useMediaQuery({
      query: '(min-width: 850px)',
   });
   const view3 = useMediaQuery({
      query: '(min-width: 1170px)',
   });

   return {view3, view2, view1}
}

export default useMediaQueryVariables;


