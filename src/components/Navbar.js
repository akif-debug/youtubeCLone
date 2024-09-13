import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar'
import { CiSearch, CiVideoOn } from 'react-icons/ci'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory, setSearchSuggestion, toggleSidebar } from '../utils/appSlice'
import { SEARCH_SUGGESTIONS_API } from '../constant/youtube'
import axios from 'axios'

const Navbar = () => {
    const [input, setInput] = useState('')
    const [suggestion, setSuggestion] = useState(false)
    const dispatch = useDispatch();
    const { searchSuggestion } = useSelector((store) => store.app)
    const searchVideo = () => {
        dispatch(setCategory(input))
        setInput('')
    }
    const toggleHandler = () => {
        dispatch(toggleSidebar())
    }
    const showSuggestion = async () => {
        try {
            const res = await axios.get(SEARCH_SUGGESTIONS_API + input)
            dispatch(setSearchSuggestion(res?.data[1]))
        } catch (error) {
            console.log(error)
        }
    }
    const openSuggestion = () => {
        setSuggestion(true)
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            showSuggestion()
        }, 200)
        return () => {
            clearTimeout(timer)
        }
    }, [input])
    return (
        <div className='fixed top-0 flex items-center justify-between w-[100%] z-10 bg-white'>
            <div className='flex w-[100%] px-7 justify-between py-3 items-center'>
                <div className='flex items-center'>
                    <GiHamburgerMenu size='24px' onClick={toggleHandler} className='hover:cursor-pointer' />
                    <img className='px-4' width={'115px'}
                        src="https://upload.wikimedia.org/wikipedia/commons/3/34/YouTube_logo_%282017%29.png"
                        alt="yt_logo" />
                </div>
                <div className='flex items-center w-[40%]'>
                    <div className='flex w-[100%]'>
                        <input value={input} onFocus={openSuggestion} onChange={(e) => setInput(e.target.value)} type="text" placeholder='Search'
                            className=' py-2 px-4 border border-gray-400 rounded-l-full outline-none w-full' />
                        <button onClick={searchVideo} className=' border rounded-r-full border-gray-400 py-2 px-4'>
                            <CiSearch size='24px' />
                        </button>
                    </div>
                    {
                        (suggestion && searchSuggestion.length !== 0) &&
                        <div className='absolute py-2 top-3 z-50 w-[30%] bg-white shadow-lg mt-12 rounded-lg border border-gray-200'>
                            <ul>
                                {searchSuggestion.map((text, idx) => {
                                    return (
                                        <>
                                            <div className='flex items-center px-4 hover:bg-gray-100'>
                                                <CiSearch size='24px' />
                                                <li className='p-2 cursor-pointer font-medium text-base'>{text}</li>
                                            </div>
                                        </>
                                    )
                                })}
                            </ul>
                        </div>
                    }
                </div>
                <div className='flex w-[10%] justify-between items-center'>
                    <IoIosNotificationsOutline size='24px' className='cursor-pointer' />
                    <CiVideoOn size='24px' className='cursor-pointer' />
                    <Avatar src='https://images.sftcdn.net/images/t_app-icon-m/p/c34c15bf-054c-4287-8c2c-73cef14107c2/3273691428/boys-dp-boy-profile-pictures-logo' size={35} round={true} />
                </div>
            </div>
        </div>
    )
}

export default Navbar