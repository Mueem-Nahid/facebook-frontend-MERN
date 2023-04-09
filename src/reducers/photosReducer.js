export function photosReducer(state, action) {
   switch (action.type) {
      case "PHOTOS_REQUEST":
         return {...state, loading: true, error: ""};
      case "PHOTOS_SUCCESS":
         return {...state, loading: false, photos: action.payload, error: ""};
      case "PHOTOS_ERROR":
         return {...state, loading: false, error: ""};

      default:
         return state;
   }
}