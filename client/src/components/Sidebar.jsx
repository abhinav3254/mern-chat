import React, { useState, useEffect, useContext } from 'react';
import { SelectedUserContext } from '../pages/Home';
import { SocketContext } from '../pages/Home';
import axios from 'axios';



const Sidebar = ({ setSelectedUser, activeUsers }) => {

    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);


    const selectedUser = useContext(SelectedUserContext);
    const socket = useContext(SocketContext);

    useEffect(() => {
        getAllUsers();
    }, []);

    useEffect(() => {
        if (!socket) {
            console.log('socket null');
            return;
        }

        const handleMessageReceived = (data) => {
            console.log('data in side - ', data);

            // Create a new array with updated message
            const updatedUsers = users.map((user) => {
                if (user._id === data.sender) {
                    // Update message for the user
                    return { ...user, message: data.message };
                }
                // Return the user as is if not matching
                return user;
            });

            // Update the users state
            setUsers(updatedUsers);
        };

        socket.on('listen', handleMessageReceived);

        // Cleanup function to remove the listener when the component unmounts
        return () => {
            socket.off('listen', handleMessageReceived);
        };
    }, [socket, users]); // Add users as a dependency


    useEffect(() => {
        if (activeUsers.length > 0) {
            // Combine active and inactive users when activeUsers change
            const combinedUsers = users.map(user => {
                // Check if the user is active
                const isActive = activeUsers.some(activeUser => activeUser.userId === user._id);

                // Return user with status (active/inactive)
                return { ...user, status: isActive ? 'active' : 'inactive' };
            });

            setUsers(combinedUsers); // Update users with active/inactive status
        }
    }, [activeUsers]); // Ensure useEffect runs when activeUsers or users change

    const getAllUsers = async () => {
        try {
            const response = await axios.get('/user/all');
            const allUsers = response.data;

            // Combine active and inactive users
            const combinedUsers = allUsers.map(user => {
                // Check if the user is active
                const isActive = activeUsers.some(activeUser => activeUser.userId === user._id);

                // Return user with status (active/inactive)
                return { ...user, status: isActive ? 'active' : 'inactive' };
            });

            setUsers(combinedUsers); // Set combined users to state
        } catch (err) {
            console.error('Error fetching users', err);
        }
    }


    const trimMessage = (message) => {
        if (message) {
            if (message.length > 20) return message.substring(0, 40) + '...';
            return message;
        }
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
                    <div key={user._id} className='my-[2px] p-1 flex items-center justify-start gap-1 hover:bg-gray-200 bg-gray-100 hover:cursor-pointer shadow-sm' onClick={() => { selectUser(user) }}>
                        <div className='flex items-center justify-between w-full px-2 py-1'>
                            <div className='flex items-center'>
                                <div className='relative'>
                                    <img className='h-8 w-8 rounded-full' src="https://randomuser.me/api/portraits/men/1.jpg" alt="" />
                                    {user.status === 'active' ? (
                                        <div className='absolute h-2 w-2 bg-green-500 right-0 bottom-0 rounded-full'></div>
                                    ) : (
                                        <div className='absolute h-2 w-2 bg-yellow-500 right-0 bottom-0 rounded-full'></div>
                                    )}
                                </div>
                                <p className='text-lg italic ml-1'>{user.name}</p>
                            </div>
                            {user.message && (
                                <div className='bg-red-500 rounded-full h-4 w-4 flex items-center justify-center'>
                                    <p className='text-[10px] text-white'>1</p>
                                </div>
                            )}
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