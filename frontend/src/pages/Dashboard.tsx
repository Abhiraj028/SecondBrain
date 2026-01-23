import { Button } from '../components/Button'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Card } from '../components/Card'
import { CreateContentModal } from '../components/CreateContentModal'
import { useState } from 'react'
import { Sidebar } from '../components/Sidebar'

export function Dashboard() {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <Sidebar />

      <div className='p-4 ml-72 min-h-screen bg-gray-100'>
        <CreateContentModal open={open} onClose={() => {setOpen(false)}}/>
        <div className='flex justify-end gap-4'>
          <Button startIcon={<PlusIcon size="md"/>} variant="primary" size="md" text="Add Content" onClick={() => {setOpen(true)}} />
          <Button variant="secondary" size="md" text="Share Brain" onClick={() => {}} startIcon={<ShareIcon size="md"/>}/>
        </div>

        <div className='flex gap-6 mt-6'>
          <Card type='twitter' title="Twitter Card" link="https://x.com/DiyarDhar/status/2014244051542069598"/>
          <Card type='youtube' title="YouTube Card" link="https://www.youtube.com/watch?v=ZouQZmZKEBI"/>
        </div>
      </div>
    </div>
  )
}

