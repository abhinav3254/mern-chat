import React from 'react'

const Button = ({ label }) => {
    return (
        <button className="bg-color-orange h-12 w-[25%] text-white shadow-lg  rounded-md mt-2 text-lg">{label}</button>
    )
}

export default Button