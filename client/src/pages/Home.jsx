import React, { useState, createContext, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import NotSelectedChat from '../components/NotSelectedChat'
import SelectedUser from '../components/SelectedUser'
import { io } from "socket.io-client";

export const SelectedUserContext = createContext();
export const SocketContext = createContext();

const Home = () => {

    const [selectedUser, setSelectedUser] = useState(null);
    const [activeUser, setActiveUser] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io("http://192.168.31.3:8080", {
            extraHeaders: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        newSocket.on("connect", () => {
            console.log(newSocket.id); // x8WIv7-mJelg7on_ALbx
        });

        newSocket.on("activeUsers", (data) => {
            setActiveUser(data);
        });

        setSocket(newSocket);  // Save the socket instance

        // Cleanup socket connection on unmount
        return () => {
            newSocket.disconnect();
        };

    }, []);


    return (
        <SelectedUserContext.Provider value={selectedUser}>
            <SocketContext.Provider value={socket}>
                <div className='flex'>
                    <div className='w-1/5'>
                        <Sidebar setSelectedUser={setSelectedUser} activeUsers={activeUser} />
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
            </SocketContext.Provider>
        </SelectedUserContext.Provider>
    )
}

export default Home