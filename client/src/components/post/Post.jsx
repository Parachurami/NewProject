import { MoreVert } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import "./posts.css"
import axios from "axios";
import {format} from "timeago.js"
import {Link} from "react-router-dom"

function Posts({post}) {
  const [likes, setLikes] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({})
  useEffect(()=>{
    const getUser = async() =>{
      const res = await axios.get(`http://localhost:8800/api/users?userId=${post.userId}`)
      setUser(res.data)
    }
    getUser();
  }, [post.userId])
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const likehandler = () =>{
    setLikes(isLiked?likes-1:likes+1)
    setIsLiked(!isLiked)
  }
  return (
    <div className='post'>
      <div className="postWrapper">
        <div className="postTop">
            <div className="postTopLeft">
              <Link to={`/profile/${user.username}`}>
              <img src={user.profilePicture || PF +"person/noAvatar.png"} alt="" className="postProfileImg" />
              </Link>
                <span className="postUsername">{user.username}</span>
                <span className="postDate">{format(post.createdAt)}</span>
            </div>
            <div className="postTopRight">
                <MoreVert />
            </div>
        </div>
        <div className="postCenter">
            <span className="postText">{post?.desc}</span>
            <img className='postImg' src={PF+post.img} alt="" />
        </div>
        <div className="postBottom">
            <div className="postBottomLeft">
                <img className='likeIcon' onClick={likehandler} src="/assets/like.png" alt="" />
                <img className='likeIcon' onClick={likehandler} src="/assets/heart.png" alt="" />
                <span className="postLikeCounter">{likes} people like it</span>
            </div>
            <div className="postBottomRight">
                <span className="postCommentText">{post.comment} comments</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Posts
