import React from 'react'
import logo from '../assets/logo.svg';

const NotSelectedChat = () => {
    return (
        <div className='h-screen w-full flex flex-col items-center justify-center'>
            <div className='h-56 w-56'>
                <img src={logo} alt="" />
            </div>
            <p className='text-lg italic text-gray-400'>Select user to <span className='text-primary'>start</span> conversation</p>
            <p className='text-lg italic text-gray-400  my-5'>OR</p>
            <button className='flex items-center bg-primary text-white px-5 py-2 rounded-md my-2 shadow-lg gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>
                Add Friend
            </button>
        </div>
    )
}

export default NotSelectedChat