import React from 'react'
import Button from './Button'
import Input from './Input'

const Home = () => {
    return (
        <section id='home' className="w-full h-screen border flex flex-col justify-start items-start">
            <div className="flex flex-col w-1/2 p-[20px] border justify-evenly">
                <p className="text-[70px] text-black font-medium leading-[75px]">Start Your Journey, Ride in Style</p>
                <p className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Netus tristique
                    cursus vitae adipiscing. Et ipsum mi nisl varius sagittis tellus. Volutpat,
                    nibh mauris, fermentum tortor convallis sed.</p>
                <Button label={"Get started"} />
            </div>

            <div>
                <Input />
            </div>
        </section>
    )
}

export default Home