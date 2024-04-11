import Contacts from "./Contacts";
import avtar from '../assets/avtar.svg';
import users from '../assets/user.json';
import { useEffect, useState } from "react"

const Home = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [people, setPeople] = useState([]);

    // get all the contacts
    // useEffect(() => {
    //     const res = await
    // }, []);

    // websocket
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:4000');
        ws.onopen = () => {
            console.log('connected to web socket');
        }
        ws.onclose = () => {
            console.log('WebSocket disconnected');
        };

        // Clean WebSocket connection on component unmount
        return () => {
            ws.close();
        };
    }, []);


    // sending message button
    const sendMessage = () => {
        messages.push(message);
        console.log(messages);
        setMessage('');
    }

    return (
        <div
            className="flex h-screen"
        >
            <div
                className="flex flex-col w-[35%] p-1 border"
            >
                {/* Search Bar */}
                <div
                    className="border flex p-1"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input type="text" placeholder="Search" className="w-full border-none outline-none" />
                </div>

                <p className="text-black text-md my-1 font-medium">Messages</p>
                {/* contacts component */}
                <div className="overflow-x-scroll">
                    {
                        users.map((user, key) => (
                            <Contacts user={user} key={key} />
                        ))
                    }
                </div>
                <div className="flex items-center border p-2 justify-end">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>

                </div>
            </div>
            {/* chat screen */}
            <div className="w-full flex flex-col h-full p-1 border">
                {/* chat nav */}
                <div className="bg-white p-2 border flex items-center">
                    <img className="h-8 w-8 rounded-full" src={avtar} alt="" />
                    <div className="mx-2 w-full">
                        <p className="text-sm">Marvin McKinney</p>
                        <p className="text-[8px]">Last seen 10:23</p>
                    </div>
                    <div className="flex items-center w-[10%] justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 p-1 border border-gray-200 mx-1 hover:cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 p-1 border border-gray-200 mx-1 hover:cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 p-1 border border-gray-200 mx-1 hover:cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </div>
                </div>
                {/* chat body */}
                <div className="h-full">

                    {/* message from somewhere else */}
                    <div className="flex justify-start py-1">
                        <div className="w-fit py-1 px-2 m-1 rounded-sm text-sm text-white flex items-center bg-blue-500">
                            <p className="mx-2">Hi,Is everything working</p>
                        </div>
                    </div>
                    {/* message from me */}
                    <div className="flex justify-end items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        <div className="border w-fit py-1 px-2 m-1 rounded-sm text-sm text-gray-500 flex items-center">
                            <p className="mx-2">Yeah, Everything is working fine</p>
                        </div>
                    </div>
                </div>
                {/* message type */}
                <div className="flex w-full h-10 text-blue-500 items-center pr-2">
                    <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="message" className="w-full h-8 border rounded-sm outline-none px-1" />
                    <svg onClick={sendMessage} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2 hover:cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default Home;