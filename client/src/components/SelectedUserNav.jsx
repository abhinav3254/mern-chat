import React, { useContext } from 'react';
import { SelectedUserContext } from '../pages/Home';

const SelectedUserNav = () => {

    const selectedUser = useContext(SelectedUserContext);


    return (
        <div>
            {selectedUser && (
                <div className='w-full flex items-center py-1 px-2 shadow-md'>
                    <img className='h-10 w-10 mr-1 rounded-full' src={selectedUser.profileImg} alt="" />
                    <div className='flex flex-col ml-1'>
                        <p className='text-[18px] font-thin'>{selectedUser.name}</p>
                        <p className='text-[10px] text-green-500'>{selectedUser.status}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SelectedUserNav