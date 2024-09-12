import React from 'react'
import Avatar from 'react-avatar'
import { CiSearch, CiVideoOn } from 'react-icons/ci'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import {toggleSidebar} from '../utils/appSlice'

const Navbar = () => {
    const dispatch = useDispatch();
    const toggleHandler = () => {
        dispatch(toggleSidebar())
    }
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
                    <div className='w-[100%] py-2 px-4 border border-gray-400 rounded-l-full'>
                        <input type="text" placeholder='Search' className='outline-none w-full' />
                    </div>
                    <button className=' border rounded-r-full border-gray-400 py-2 px-4'>
                        <CiSearch size='24px' />
                    </button>
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