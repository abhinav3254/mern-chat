import React from 'react'
import logo from '../assets/logo.svg'
import { navElememts } from '../constants'

const Nav = () => {
    return (
        <nav className="flex border items-center justify-between w-full p-2">
            <button className="flex items-center justify-center">
                <img src={logo} height={35} width={40} alt="" />
                CarRent
            </button>
            <ul className="flex">
                {navElememts.map((item) => (
                    <li className='m-2 p-1 hover:cursor-pointer text-color-orange' key={item.id}>
                        <a href={item.href}>{item.label}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Nav