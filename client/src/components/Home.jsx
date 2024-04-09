import Contacts from "./Contacts";
import users from '../assets/user.json'

const Home = () => {
    return (
        <div
            className="flex h-screen"
        >
            <div
                className="flex flex-col w-[35%] p-1"
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

                {/* contacts component */}
                <div className="overflow-x-scroll">
                    {
                        users.map((user, key) => (
                            <Contacts user={user} key={key} />
                        ))
                    }
                </div>
            </div>
            <div className="bg-blue-200 w-full">chatwindow</div>
        </div>
    );
}

export default Home;