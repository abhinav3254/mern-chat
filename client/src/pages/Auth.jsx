import React, { useState } from 'react'
import chattingSvg from '../assets/chatting.svg'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const Auth = ({ SetLoggedInUser }) => {

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const submitForm = async (e) => {
        e.preventDefault(); // Prevent the form from reloading the page
        console.log(form)
        // navigate('/home');
        try {
            const response = await axios.post('auth/register', form);
            if (response.status === 200) {
                SetLoggedInUser(response.data.id);
                sessionStorage.setItem('token', response.data.token);
                sessionStorage.setItem('id', response.data.id);
                toast.success("Login Successful 😈!")
            } else {
                toast.error("Login Failed 💀!")
            }
        } catch (err) {
            toast.error(`${err.response.data.message} 💀`)
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    }

    return (
        <div className='h-screen w-screen flex items-center justify-center'>
            <div className='w-1/2 h-1/2 flex items-center justify-center border border-gray-200 rounded-md'>
                <div className='w-1/2 m-5'>
                    <img src={chattingSvg} alt="" />
                </div>
                <div className='m-5 w-1/2'>
                    <p className='text-xl'>We connect the world</p>
                    <form className='flex flex-col' onSubmit={submitForm}>
                        <input value={form.email} name='email' onChange={handleChange} className='border border-gray-200 px-4 py-2 m-1' type="text" placeholder='Email' />
                        <input value={form.password} name='password' onChange={handleChange} className='border border-gray-200 px-4 py-2 m-1' type="text" placeholder='Password' />
                        <button className='bg-primary px-4 py-2 m-1 text-white' type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Auth