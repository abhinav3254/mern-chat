import avtar from '../assets/avtar.svg';
const Contacts = ({ user }) => {
    return (
        <div className='flex border my-1 p-1 items-center hover:cursor-pointer rounded-sm hover:bg-gray-100'>
            <img src={avtar} alt=""
                className='w-10 h-10 rounded-full mx-1'
            />
            <div className='flex flex-col mx-1 items-start w-full'>
                <p className='text-md'>{user.name}</p>
                <p className='text-[12px]'>{user.message}</p>
            </div>
            <div className='w-24 flex flex-col items-center justify-between h-full'>
                <p className='text-[10px]'>{user.time}</p>
                {!user.read && (
                    <div className='rounded-full bg-blue-500 h-5 w-5 flex items-center justify-center'>
                        <p className='text-[10px] text-white'>2</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Contacts