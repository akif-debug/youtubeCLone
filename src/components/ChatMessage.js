import React from 'react'
import Avatar from 'react-avatar'

const ChatMessage = ({ item }) => {
  return (
    <div className='flex items-center'>
      <div>
        <Avatar src='https://images.sftcdn.net/images/t_app-icon-m/p/c34c15bf-054c-4287-8c2c-73cef14107c2/3273691428/boys-dp-boy-profile-pictures-logo' size={25} round={true} />
      </div>
      <div className='flex items-center'>
        <h1 className='ml-2 font-bold text-sm'>{item.name}</h1>
        <p className='ml-2 py-2 text-sm'>{item.message}</p>
      </div>
    </div>
  )
}

export default ChatMessage