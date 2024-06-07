import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const page = () => {
  return (
    <div className="flex justify-center items-center text-white flex-col gap-4 pt-28">
      
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="font-bold text-5xl">
          Build Your Resume
        </div>
      </div>

      <div className="p-10 w-[60%] flex justify-around items-center gap-20">
        <Link href={"/template"} className='text-center flex flex-col gap-5 cursor-pointer hover:scale-105'>
        <Image src={"https://th.bing.com/th/id/OIP.KmxCyDsg5SWWaVvxYFmoTAHaHa?rs=1&pid=ImgDetMain"} alt="Templates" 
        width={300} height={300}
        />
        <p className='md:text-2xl sm:text-sm'>See the templates</p>
        </Link>
        <Link href={"/cv-build"} className='text-center flex flex-col gap-5 cursor-pointer hover:scale-105'>
        <Image src={"https://th.bing.com/th/id/OIP.KmxCyDsg5SWWaVvxYFmoTAHaHa?rs=1&pid=ImgDetMain"} alt="Templates" 
        width={300} height={300}
        />
        <p className='md:text-2xl sm:text-sm'>Fill your details</p>
        </Link>
      </div>

    </div>
  )
}

export default page