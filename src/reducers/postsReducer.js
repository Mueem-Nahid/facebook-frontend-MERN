export function postsReducer(state, action) {
   switch (action.type) {
      case "POSTS_REQUEST":
         return {...state, loading: true, error: ""};
      case "POSTS_SUCCESS":
         return {...state, loading: false, posts: action.payload, error: ""};
      case "POSTS_ERROR":
         return {...state, loading: false, error: ""};

      default:
         return state;
   }
}