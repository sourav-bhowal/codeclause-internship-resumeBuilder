import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='text-white w-full flex flex-col gap-10 items-center justify-center p-10'>
      
      <div className='w-[60%] text-center'>
        <h1 className='text-5xl font-bold tracking-wide'>Choose a template</h1>
        <p className='text-xl mt-2 tracking-wide'>Select a template to get started</p>
      </div>

      <div className='grid grid-cols-3 gap-20'>
        <Link href={"/template/template1"}>
          <Image src={"https://beamjobs.wpenginepowered.com/wp-content/uploads/2023/01/academic-resume-template.png"} 
            alt="Templates" 
            width={300} 
            height={300}
            priority
            className='rounded-xl hover:scale-110 transition-all hover:cursor-pointer'
          />
        </Link>

        <Link href={"/template/template2"}>
          <Image src={"https://i2.wp.com/thesecularparent.com/wp-content/uploads/2020/01/free-downloadable-resume-templates-for-wordpad.jpg"} 
            alt="Templates" 
            width={300} 
            height={300}
            priority
            className='rounded-xl hover:scale-110 transition-all hover:cursor-pointer'
          />
        </Link>

      </div>
      
    </div>
  )
}

export default page