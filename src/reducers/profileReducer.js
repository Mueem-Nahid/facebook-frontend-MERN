export function profileReducer(state, action) {
   switch (action.type) {
      case "PROFILE_REQUEST":
         return {...state, loading: true, error: ""};
      case "PROFILE_SUCCESS":
         return {...state, loading: false, profile: action.payload, error: ""};
      case "PROFILE_ERROR":
         return {...state, loading: false, error: ""};

      default:
         return state;
   }
}