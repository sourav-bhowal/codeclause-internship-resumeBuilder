"use client"
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const Template2 = () => {

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
          <div className='bg-white lg:w-[55%] md:w-[70%] min-h-screen text-black rounded-xl h-full resume-download pb-10'>
            
            <div className='flex p-8 justify-between'>
              <div className='flex flex-col'>
                <div className='font-bold text-4xl'>{data.name}</div>
                <div className='text-sm'>{data.address}</div>
              </div>
              <div>
                <div className='flex flex-col'>
                  <div className='text-sm'>{data.email}</div>
                  <div className='text-sm'>{data.phone}</div>
                  <div className='text-sm'>
                    <a href={data.portfolio} target="_blank">my portfolio</a>
                  </div>
                </div>
              </div>
            </div>

            <div className='pl-8 pr-8'>
              <div className=''>
                  <div className='text-2xl font-bold'>Experiences</div>
                  <p className='font-bold'>{data.experience1?.company}</p>
                  <p>{data.experience1?.role}</p>
                  <p>{data.experience1?.from} - {data.experience1?.to}</p>
                  <p className='mt-1 font-bold'>{data.education2?.school}</p>
                  <p>{data.education2?.degree}: {data.education2?.from} - {data.education2?.to}</p>

                  <div className='text-2xl font-bold mt-10'>Skills</div>
                  <p className='flex gap-2'>{data.skills?.map((s, i) => <p key={i}>▪️{s}</p>)}</p>
                
                  <div className='text-2xl font-bold mt-10'>Education</div>
                  <p className='font-bold'>{data.education1?.school}</p>
                  <p>{data.education1?.degree}: {data.education1?.from} - {data.education1?.to}</p>
                  <p className='mt-1 font-bold'>{data.education2?.school}</p>
                  <p>{data.education2?.degree}: {data.education2?.from} - {data.education2?.to}</p>

                  

                  <div className='text-2xl font-bold mt-10'>Projects</div>
                  <div>
                    <p className='font-bold'>{data.project1?.name}</p>
                    <p>{data.project1?.description}</p>
                  </div>
                  <div className='mt-2'>
                    <p className='font-bold'>{data.project2?.name}</p>
                    <p>{data.project2?.description}</p>
                  </div>

                  <div className='text-2xl font-bold mt-10'>Languages</div>
                  <p>{data.languages?.map((s, i) => <p key={i}>{s}</p>)}</p>
              </div>
              <div className=''>
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

export default Template2