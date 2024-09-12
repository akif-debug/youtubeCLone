import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { YOUTUBE_VIDEO_API } from './../constant/youtube';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';

const VideoContainer = () => {
  const [video, setVideo] = useState([])
  const fetchingYoutubeVideo = async () => {
    try {
      const res = await axios.get(`${YOUTUBE_VIDEO_API}`)
      setVideo(res?.data?.items)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchingYoutubeVideo()
  }, [])
  return (
    <div className='grid grid-cols-3 gap-3'>
      {
        video.map((item) => {
          return (
            <Link key={item.id} to={`/watch?v=${item.id}`}>
              <VideoCard item={item} />
            </Link>
          )
        })
      }
    </div>
  )
}

export default VideoContainer