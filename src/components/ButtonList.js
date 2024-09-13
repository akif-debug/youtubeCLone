import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCategory } from '../utils/appSlice'

const buttonList = ['All', 'Javascript', 'Java', 'Live', 'Music', 'Songs', 'Vlogs', 'Trending', 'Movie', 'News', 'Programming', 'Cricket', 'Comedy', 'Technologie', 'Thriller', 'New to you']

const ButtonList = () => {
  const [active, setActive] = useState('All')
  const dispatch = useDispatch()
  const videoByTag = (tag) => {
    if (active != tag) {
      dispatch(setCategory(tag))
      setActive(tag)
    }
  }
  return (
    <div className='flex w-full py-4 overflow-x-scroll no-scrollbar'>
      {buttonList.map((buttonName, idx) => {
        return (
          <>
            <div key={idx} >
              <button onClick={() => { videoByTag(buttonName) }} className={`${active === buttonName ? 'bg-slate-900 text-white' : 'bg-gray-200'} font-medium mr-2 rounded-lg px-4 py-1`}>
                <span className='whitespace-nowrap'>{buttonName}</span>
              </button>
            </div>
          </>
        )
      })}
    </div>
  )
}

export default ButtonList