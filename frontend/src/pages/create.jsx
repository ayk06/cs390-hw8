import {useState} from "react";
import {Link} from "react-router-dom";

export function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [done, setDone] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const requestData = JSON.stringify({title, content, password});
    const headers = {"content-type": "application/json"};
    //fetch
    fetch("http://localhost:3000/blog/create-post", {method: 'POST', body: requestData, headers})
    .then((res) => {
      setDone(true)
      return res.json()
    })
    .then((response) => {
      console.log(response)
      setIsError(response.error === true ? true : false)
    })
  
  }

  if (done) {
    if(isError){
      return (
        <div>
          <h3>Error: Wrong Password!</h3>
          <Link to="/">Try Again</Link>
        </div>
      );
    }
    return (
      <div>
        <Link to="/view">Check out your blog post</Link>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
        ></textarea>
      </div>
      <div>
      <input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      </div>
      <button>Post</button>
    </form>
  );
}
