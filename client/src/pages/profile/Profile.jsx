import React, { useEffect, useState } from 'react'
import "./profile.css"
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import Feed from '../../components/feed/Feed'
import axios from "axios"
import { useParams } from 'react-router'

function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const params = useParams();
    console.log(params)
    useEffect(() =>{
        const getUser = async() =>{
            const res = await axios.get(`http://localhost:8800/api/users?username=${params.username}`)
            setUser(res.data);
        }
        getUser();
    },[params.username])
  return (
    <>
    <Topbar />
    <div className="profile">
        <Sidebar/>
        <div className="profileRight">
            <div className="profileRightTop">
                <div className="profileCover">
                    <img src={user.coverPicture || PF + "person/noCover.png"} alt="" className="profileCoverImg" />
                    <img src={user.profilePicture || PF + "person/noAvatar.png"} alt="" className="profileUserImg" />
                </div>
                <div className="profileInfo">
                    <h4 className="profileInfoName">{user.username}</h4>
                    <span className="profileInfoDesc">{user.desc}</span>
                </div>

            </div>
            <div className="profileRightBottom">
                <Feed username={params.username} />
                <Rightbar user={user} />
            </div>
        </div>
    </div>
    </>
  )
}

export default Profile
