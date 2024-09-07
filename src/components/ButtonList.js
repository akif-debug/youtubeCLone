import React from 'react'

const buttonList = ['All', 'Javascript', 'Java', 'Live', 'Music', 'Songs', 'Vlogs', 'Trending', 'Movie']

const ButtonList = () => {
  return (
    <div className='py-4'>
      {buttonList.map((item) => {
        return (
          <button key={item} className='font-medium bg-gray-200 mx-2 rounded-lg px-4 py-1'>{item}</button>
        )
      })}
    </div>
  )
}

export default ButtonList