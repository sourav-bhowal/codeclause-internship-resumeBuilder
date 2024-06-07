"use client"
import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link';


const Navbar = () => {

  const { data: session } = useSession();


  return (
    <nav className='bg-black text-white flex justify-between px-5 h-16 items-center'>

      <Link href={"/"}>
        <div className="logo font-bold text-lg">Resume World</div> 
      </Link>

      <div className='flex justify-center items-center gap-10'>
      {
        session && 
        <h2 className='font-bold'>Welcome, {session.user.username}</h2>
      }

      {
        session && 
        <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl 
            focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg 
            text-sm px-5 py-2.5 text-center me-2' onClick={() => signOut()}>Sign Out</button>
      }
      {
        !session && 
        <Link href={"/sign-in"}>
          <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl 
            focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg 
            text-sm px-5 py-2.5 text-center me-2'>Sign In</button>
        </Link>
      }
      </div>
      
    </nav>
  )
}

export default Navbar