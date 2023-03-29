import { PermMedia, Label, Room, EmojiEmotions } from '@mui/icons-material'
import React from 'react'
import "./share.css"

function Share() {
  return (
    <div className='share'>
      <div className="shareWrapper">
        <div className="shareTop">
            <img src="/assets/person/1.jpeg" alt="" className="shareProfileImg" />
            <input placeholder="What's in your mind" className="shareInput" />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
            <div className="shareOptions">
                <div className="shareOption">
                    <PermMedia htmlColor='tomato' className='shareIcon' />
                    <span className="shareoptionText">Photo or Video</span>
                </div>
                <div className="shareOption">
                    <Label htmlColor='blue' className='shareIcon' />
                    <span className="shareoptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor='green' className='shareIcon' />
                    <span className="shareoptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
                    <span className="shareoptionText">Feelings</span>
                </div>
            </div>
            <button className="shareButton">Share</button>
        </div>
      </div>
    </div>
  )
}

export default Share
