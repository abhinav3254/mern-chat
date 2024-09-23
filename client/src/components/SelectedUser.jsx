import React, { useState, useContext, useEffect, useRef } from 'react'
import SelectedUserNav from './SelectedUserNav'
import MessageContainer from './MessageContainer'
import { SelectedUserContext } from '../pages/Home';
import { SocketContext } from '../pages/Home';
import axios from 'axios';


const SelectedUser = () => {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const selectedUser = useContext(SelectedUserContext);
    const socket = useContext(SocketContext);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        const handleMessageReceived = (data) => {
            if (data.sender === selectedUser._id) {
                setMessages((prevMessages) => [...prevMessages, data]);
            }
        };

        socket.on('listen', handleMessageReceived);

        // Cleanup function to remove the listener when the component unmounts
        return () => {
            socket.off('listen', handleMessageReceived);
        };
    }, [socket, selectedUser]);

    useEffect(() => {
        // Scroll to the bottom when the messages update
        scrollToBottom();
    }, [messages]); // Only run when the messages array changes

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };


    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const loggedInUserId = sessionStorage.getItem('id');
                const url = `chat/${selectedUser._id}?loggedInUserId=${loggedInUserId}`;
                const response = await axios.get(url);
                setMessages(response.data);
            } catch (err) {
                console.warn(err);
            }
        };

        if (selectedUser) {
            fetchChatHistory();
        }
    }, [selectedUser]);


    const sendMessage = () => {
        const messageJson = {
            recipient: selectedUser._id,
            sender: sessionStorage.getItem('id'),
            message: message,
            time: new Date().toISOString(),
        }

        // Update the message array only when message is sent
        setMessages((prevMessages) => [...prevMessages, messageJson]);

        // Emit message using the socket
        socket.emit('message', messageJson);
        setMessage('');
    }

    return (
        <div className='px-2 flex flex-col h-screen'>
            <div>
                <SelectedUserNav />
            </div>
            {/* message screen */}
            <div className='flex-grow py-2 overflow-y-auto'>
                <div className='h-[600px] w-full' >
                    {messages.map((m, index) => (
                        <div key={index} ref={messagesEndRef}>
                            {/* Check if the message is from the current user */}
                            {m.sender === sessionStorage.getItem('id') ? (
                                <div className='flex items-center justify-end w-full'>
                                    <div className='bg-gray-500 max-w-96 text-white px-5 py-2 rounded-md flex items-center my-1'>
                                        <p className='text-sm'>{m.message}</p>
                                        <p className='text-[8px] italic ml-2'>{new Date(m.time).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className='flex items-center justify-start w-full'>
                                    <div className='bg-green-800 max-w-96 text-white px-5 py-2 rounded-md flex items-center my-1'>
                                        <p className='text-sm'>{m.message}</p>
                                        <p className='text-[8px] italic ml-2'>{new Date(m.time).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {/* send message screen */}
            <div className='flex items-center bg-white h-12'>
                <input className='w-full border border-gray-200 p-2 outline-none' type="text" placeholder='Message...' value={message} onChange={(e) => setMessage(e.target.value)} />
                <svg onClick={() => { sendMessage() }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 mx-2 hover:cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
            </div>
        </div>
    )
}

export default SelectedUser