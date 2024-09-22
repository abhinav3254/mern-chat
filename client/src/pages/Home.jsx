import React, { useState, createContext, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import NotSelectedChat from '../components/NotSelectedChat'
import SelectedUser from '../components/SelectedUser'
import { io } from "socket.io-client";

export const SelectedUserContext = createContext();


const Home = () => {

    useEffect(() => {
        const socket = io("http://localhost:8080", {
            extraHeaders: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        socket.on("connect", () => {
            console.log(socket.id); // x8WIv7-mJelg7on_ALbx
        });

        // socket.on("online", (data) => {
        //     console.log('getting data', data);
        // })


    }, []);

    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <SelectedUserContext.Provider value={selectedUser}>
            <div className='flex'>
                <div className='w-1/5'>
                    <Sidebar setSelectedUser={setSelectedUser} />
                </div>
                <div className='w-4/5'>
                    {selectedUser && (
                        <SelectedUser />
                    )}
                    {!selectedUser && (
                        <NotSelectedChat />
                    )}
                </div>
            </div>
        </SelectedUserContext.Provider>
    )
}

export default Home