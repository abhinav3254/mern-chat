import React, { useState } from 'react'
import SelectedUserNav from './SelectedUserNav'
import MessageContainer from './MessageContainer'

const SelectedUser = () => {

    const [message, setMessage] = useState('');

    const sendMessage = () => {
        console.log(message);

        messageJson = {

        }

        setMessage('');
    }

    return (
        <div className='px-2 flex flex-col'>
            <div>
                <SelectedUserNav />
            </div>
            {/* message screen */}
            <div className='h-[680px] py-2'>
                <MessageContainer />
            </div>
            {/* send message screen */}
            <div className='flex items-center'>
                <input className='w-full border border-gray-200 p-2 outline-none' type="text" placeholder='Message...' value={message} onChange={(e) => setMessage(e.target.value)} />
                <svg onClick={() => { sendMessage() }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 mx-2 hover:cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
            </div>
        </div>
    )
}

export default SelectedUser