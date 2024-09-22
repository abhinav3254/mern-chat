import React, { useState, useEffect } from 'react';
import usersJson from '../assets/json/users.json';



const Sidebar = ({ setSelectedUser }) => {

    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers(usersJson);
    }, []);


    const trimMessage = (message) => {
        if (message.length > 20) return message.substring(0, 40) + '...';
        return message;
    }

    const filterNames = () => {
        return users.filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase())
        );
    }


    const selectUser = (user) => {
        // console.log('selecting user in sidebar', user);
        setSelectedUser(user);
    }

    return (
        <div className='h-screen fixed w-1/5 py-2 bg-white shadow-md'>
            <div className='flex items-center border border-gray-200 px-2 mx-1 rounded-sm'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input value={search} onChange={(e) => setSearch(e.target.value)} className='w-full p-1 outline-none' type="text" placeholder='search...' />
            </div>
            <div className='h-[90%] flex flex-col w-full overflow-scroll mt-1'>
                {filterNames().map((user) => (
                    <div key={user.id} className='my-[2px] p-1 flex items-center justify-start gap-1 hover:bg-gray-200 bg-gray-100 hover:cursor-pointer shadow-sm' onClick={() => { selectUser(user) }}>
                        <div className='h-12 w-12'>
                            <img className='h-full w-full rounded-full object-cover' src={user.profileImg} alt="" />
                        </div>
                        <div className='flex flex-col justify-start'>
                            <p className='text-[16px] text-black font-thin'>{user.name}</p>
                            <p className='text-[12px] font-light'>{trimMessage(user.message)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='h-10 w-full flex items-center justify-start p-2 hover:cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
                </svg>
                <p className='ml-2'>Setting</p>
            </div>
        </div>
    )
}

export default Sidebar