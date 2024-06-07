import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div className="flex justify-center items-center text-white flex-col gap-4 pt-28">
      
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="font-bold text-5xl">
          Build Your Resume
        </div>

        <p className="text-2xl">
          Generate your resume in just a few clicks with our easy-to-use resume builder.
        </p>
      </div>

      <div className="p-10 w-[60%] flex justify-around items-center">
        <Image src={"https://th.bing.com/th/id/OIP.KmxCyDsg5SWWaVvxYFmoTAHaHa?rs=1&pid=ImgDetMain"} alt="Templates" 
        width={300} height={300} priority
        />

        <Link href={"/dashboard"}><button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl 
            focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg 
            text-sm px-5 py-2.5 text-center me-2 mb-2'>Get Started</button></Link>
      </div>

    </div>
  );
}
