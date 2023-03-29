import React from 'react'
import "./Topbar.css"
import {Chat, Person, Search, Notifications} from "@mui/icons-material"
import {Link, useNavigate} from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from '../../context/AuthContext'

function Topbar() {
  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const history = useNavigate()
  const click = () =>{
    console.log(user)
    history(`/profile/${user.username}`)
  }
  return (
    <div className='topbarContainer'>
      <div className="topbarLeft">
        <Link to="/" style={{textDecoration:"none"}}>
        <span className="logo">Lamasocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className='searchIcon' />
          <input placeholder='Search for friends, posts or videos' className='searchInput' name="" id="" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Home Page</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topBarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topBarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topBarIconBadge">1</span>
          </div>
        </div>
          <img onClick={click} src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" className='topbarImg' />
      </div>
    </div>
  )
}

export default Topbar;
