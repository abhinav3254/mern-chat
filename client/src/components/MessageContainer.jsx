import React, { useEffect } from 'react'

const MessageContainer = ({ message }) => {

    console.log('inside message container ', message);


    return (
        <div>
            <div className='h-full w-full'>
                <div className='flex items-center justify-start w-full'>
                    <div className='bg-green-800 max-w-96 text-white px-5 py-2 rounded-md flex items-center justify-between'>
                        <p className='text-sm'>Hello Abhinav</p>
                        <p className='text-[8px] italic ml-2'>2:48</p>
                    </div>
                </div>

                <div className='flex items-center justify-end w-full'>
                    <div className='bg-gray-500 max-w-96 text-white px-5 py-2 rounded-md flex items-center'>
                        <p className='text-sm'>Hello Kirti, How are you?</p>
                        <p className='text-[8px] italic ml-2'>2:49</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageContainer