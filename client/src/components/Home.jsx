import Contacts from "./Contacts";
import avtar from '../assets/avtar.svg';
import users from '../assets/user.json'

const Home = () => {
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
                <div className="h-full"></div>
                {/* message type */}
                <div className="flex w-full h-10 text-blue-500 items-center pr-2">
                    <input type="text" placeholder="message" className="w-full h-8 border rounded-sm outline-none px-1" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default Home;