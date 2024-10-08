"use client";
import Link from 'next/link'
import DarkMode from './DarkMode';
export default function Navbar(){
    return (
        <nav className="bg-gray-200  p-4 shadow-md">
        <div className="flex justify-between items-center  ">
          {/* Logo Section */}
          <div className=" text-lg font-bold">
            <Link href="/">
            <span className='text-purple-600 '>Quiz</span>
            <span className='text-black '>Flip</span>

            </Link>
          </div>
          <DarkMode/>
        </div>
      </nav> 
        
    )
}