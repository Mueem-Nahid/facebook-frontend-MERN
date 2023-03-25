const PostError = ({error, setError}) => {
   return (
      <div className="post_error">
         <div>{error}</div>
         <button className="blue_btn" onClick={() => setError("")}>Try again</button>
      </div>
   );
};

export default PostError;