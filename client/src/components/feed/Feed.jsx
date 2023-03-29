import React, { useEffect, useState } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import "./feed.css"
import axios from "axios"

function Feed({username}) {
  const [posts, setPosts] = useState([]);
  useEffect(() =>{
    const fetchPosts = async() =>{
      const res = username ? await axios.get(`http://localhost:8800/api/post/profile/${username}`) : await axios.get("http://localhost:8800/api/post/timeline/641cb5487a2dcbff786bc354");
      setPosts(res.data)
    }
    fetchPosts();
  },[username])
  return (
    <div className='feed'>
      <div className="feedWrapper">
        <Share />
        {posts.map((p) =>(
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  )
}

export default Feed
