import { Button } from '../components/Button'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Card } from '../components/Card'
import { CreateContentModal } from '../components/CreateContentModal'
import { useEffect, useRef, useState } from 'react'
import { Sidebar } from '../components/Sidebar'
import { useContent } from '../hooks/useContent'
import type { CardProps } from '../components/Card'
import axios from 'axios'

export function Dashboard() {
  const [open, setOpen] = useState(false);
  const {contents, setRefresh}: {contents: CardProps[], setRefresh: any} = useContent();
  const [share, setShare] = useState<boolean>(false);
  const firstRun = useRef(true);

    if(!localStorage.getItem("token")){
      alert("Invalid Access.Please sign in.");
      window.location.href = "/signin";
      return;
    }

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return; 
    }

    const shareContent = async () => {
      if(share){
        const datareturn = await axios.post(`http://localhost:3000/api/v1/brain/share`, {
          share: share
        }, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }).catch((err) => {
          if(axios.isAxiosError(err)){
              console.log(err);
              alert(`${err.response?.data.msg}`);
          }else{
              alert("An unknown error occurred. "+err);
          }
        });
        console.log(datareturn?.data);
        alert("Your share link has been copied to the clipboard!");
        await navigator.clipboard.writeText(`http://localhost:5173/brain/${datareturn?.data.link}`);
        

      }else{
        alert("You have disabled sharing your brain.");
      }
    };
    shareContent();
  }, [share])

  return (
    <div>
      <Sidebar />

      <div className='p-4 ml-72 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900'>
        <CreateContentModal open={open} onClose={() => {setOpen(false); setRefresh((prev: boolean) => !prev);}}/>
        <div className='flex justify-end gap-4'>
          <Button startIcon={<PlusIcon size="md"/>} variant="primary" size="md" text="Add Content" onClick={() => {setOpen(true)}} />
          <Button variant="secondary" size="md" text="Share Brain" onClick={() => setShare(prev => !prev)} startIcon={<ShareIcon size="md"/>}/>
        </div>

        <div className='flex gap-4 ml-24 mt-6 flex-wrap'>
          {contents.length > 0 ? contents.map(({title,link,type, _id}, index) => <Card _id={_id} key={index} title={title} link={link} type={type}/>) : 
          <div className='text-gray-400 text-lg ml-86 mt-24 '>No content added yet. Click on "Add Content" to get started!</div>}
        </div>
      </div>
    </div>
  )
}

