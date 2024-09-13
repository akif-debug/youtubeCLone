import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import API_KEY from '../constant/youtube'
import Avatar from 'react-avatar';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { PiShareFatLight } from 'react-icons/pi';
import { GoDownload } from 'react-icons/go';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { LuSendHorizonal } from 'react-icons/lu';
import LiveChat from './LiveChat';
import { useDispatch } from 'react-redux';
import { setMessage } from '../utils/chatSlice';

const Watch = () => {
    const [input, setInput] = useState('')
    const [singleVideo, setSingleVideo] = useState(null)
    const [searchParams] = useSearchParams()
    const videoId = searchParams.get('v')
    const dispatch = useDispatch()

    const getSingleVideo = async () => {
        try {
            const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`)
            setSingleVideo(res?.data?.items[0])
            console.log(res?.data?.items[0])
        } catch (error) {
            console.log(error)
        }
    }

    const sendMessage = () => {
        dispatch(setMessage({
            name: "patel",
            message: input
        }))
        setInput('')
    }

    useEffect(() => {
        getSingleVideo()
    }, [])
    return (
        <div className='flex justify-between ml-4 w-[100%] mt-2'>
            <div className='flex w-[98%] gap-5'>
                <div>
                    <iframe
                        width="900"
                        height="500" src={`https://www.youtube.com/embed/${videoId}?&autoplay=1`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowFullScreen>
                    </iframe>
                    <h1 className='font-bold text-lg mt-2'>{singleVideo?.snippet?.title}</h1>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center justify-between w-[35%]'>
                            <div className='flex gap-1'>
                                <Avatar src='https://images.sftcdn.net/images/t_app-icon-m/p/c34c15bf-054c-4287-8c2c-73cef14107c2/3273691428/boys-dp-boy-profile-pictures-logo' size={35} round={true} />
                                <h1 className='font-bold'>{singleVideo?.snippet?.channelTitle}</h1>
                            </div>
                            <button className='px-3 py-1 font-medium bg-black text-white rounded-full'>Subscribe</button>
                        </div>
                        <div className='flex items-center gap-4 mt-2'>
                            <div className='flex items-center cursor-pointer bg-gray-200 px-4 py-2 rounded-full gap-2'>
                                <AiOutlineLike size="20px" />
                                <AiOutlineDislike size="20px" />
                            </div>
                            <div className='flex items-center gap-2 cursor-pointer bg-gray-200 px-4 py-2 rounded-full'>
                                <PiShareFatLight size="20px" />
                                <p>Share</p>
                            </div>
                            <div className='flex items-center gap-2 cursor-pointer bg-gray-200 px-4 py-2 rounded-full'>
                                <GoDownload />
                                <span>Download</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-[100%] border border-gray-300 rounded-lg h-fit p-3'>
                    <div className='flex justify-between items-center'>
                        <h1>Top Chat</h1>
                        <BsThreeDotsVertical />
                    </div>
                    <div className='overflow-y-auto h-[28rem] flex flex-col-reverse'>
                        <LiveChat />
                    </div>
                    <div className='border-t flex items-center justify-between p-2'>
                        <div className='flex items-center justify-between w-[100%]'>
                            <div>
                                <Avatar src='https://images.sftcdn.net/images/t_app-icon-m/p/c34c15bf-054c-4287-8c2c-73cef14107c2/3273691428/boys-dp-boy-profile-pictures-logo' size={35} round={true} />
                            </div>
                            <input value={input} onChange={(e) => setInput(e.target.value)} className='border-b border-gray-300 outline-none' type="text" placeholder='Send message..' />
                            <div className='bg-gray-200 cursor-pointer p-2 rounded-full text-center'>
                                <LuSendHorizonal size={"18px"} onClick={sendMessage} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Watch