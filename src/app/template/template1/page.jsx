"use client"
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const Template1 = () => {

  const { data: session } = useSession();
  const[loading, setLoading] = useState(false);
  const[data, setData] = useState({});
  const[downloading, setDownLoading] = useState(false);

  const userId = session?.user?._id;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/my-details/${userId}`);
      setData(response.data.data);
      setLoading(false);
    } 
    catch (error) {
      console.log(error);
    }
  }, []);
  
  useEffect(() => {
    fetchData();
  }, []);


  const downloadPdf = () => {
    const capture = document.querySelector('.resume-download');
    setDownLoading(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL('img/png');
      const pdf = new jsPDF("portrait", "cm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      setDownLoading(false);
      pdf.save('resume.pdf');
    
    });
  };


  return (
    <div className='text-white w-full flex flex-col gap-5 items-center justify-center p-10'>
    <div className='w-full '>
      <button className='bg-black text-white p-2 rounded-lg float-right'
      onClick={fetchData}>Regenerate</button>
      <button className='bg-black text-white p-2 rounded-lg float-right'
      onClick={downloadPdf}>{
        downloading ? 'Downloading...' : 'Download'
      }</button>
    </div>
      {
        loading ? <div>Loading...</div> : (
          <div className='bg-white lg:w-[55%] md:w-[70%] min-h-screen text-black rounded-xl h-full resume-download'>
            
            <div className='flex p-5 justify-between'>
              <div className='flex flex-col'>
                <div className='font-bold text-4xl'>{data.name}</div>
                <div className='text-sm'>{data.address}</div>
              </div>
              <div>
                <div className='flex flex-col'>
                  <div className='text-sm'>{data.email}</div>
                  <div className='text-sm'>{data.phone}</div>
                  <div className='text-sm text-blue-500 underline'>
                    <a href={data.portfolio} target='_blank'>my portfolio</a>
                  </div>
                </div>
              </div>
            </div>

            <div className=' grid grid-cols-[200px_1fr]'>
              <div className='border-r-2 border-black pt-5 pl-5 pr-2'>
                <div className='text-2xl font-bold'>Education</div>
                  <p>{data.education1?.school}</p>
                  <p>{data.education1?.degree}: {data.education1?.from} - {data.education1?.to}</p>
                  <p className='mt-1'>{data.education2?.school}</p>
                  <p>{data.education2?.degree}: {data.education2?.from} - {data.education2?.to}</p>

                  <div className='text-lg font-bold mt-6'>Skills</div>
                  <p>{data.skills?.map((s, i) => <p key={i}>{s}</p>)}</p>

                  <div className='text-lg font-bold mt-6'>Languages</div>
                  <p>{data.languages?.map((s, i) => <p key={i}>{s}</p>)}</p>
              </div>
              <div className='p-5'>
                <div className='text-2xl font-bold'>Experiences</div>
                  <p className='font-bold mt-1'>{data.experience1?.company}</p>
                  <p>{data.experience1?.position}</p>
                  <p>{data.experience1?.from} - {data.experience1?.to}</p>
                  <p className='mt-1 font-bold'>{data.experience2?.company}</p>
                  <p>{data.experience2?.position}</p>
                  <p>{data.experience2?.from} - {data.experience2?.to}</p>

                  <div className='text-2xl font-bold mt-10'>Projects</div>
                  <div>
                    <p className='font-bold'>{data.project1?.name}</p>
                    <p>{data.project1?.description}</p>
                  </div>
                  <div className='mt-2'>
                    <p className='font-bold'>{data.project2?.name}</p>
                    <p>{data.project2?.description}</p>
                  </div>

                  <div className='text-2xl font-bold mt-10'>Certifications</div>
                  <div>
                    <p className='font-bold'>{data.certificate1?.title}</p>
                    <p>{data.certificate1?.issuedBy}</p>
                  </div>
                  <div className='mt-2'>
                  <p className='font-bold'>{data.certificate2?.title}</p>
                  <p>{data.certificate2?.issuedBy}</p>
                  </div>
              </div>
            </div>



          </div>
        )
      }
    </div>
  )
}

export default Template1