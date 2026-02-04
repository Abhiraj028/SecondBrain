import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Card } from '../components/Card'
import { Sidebar } from '../components/Sidebar'

interface SharedContentProps {
  filter: string;
  setFilter: (filter: React.SetStateAction<string>) => void;
}

const backend_url = import.meta.env.VITE_backend_url;


export function SharedBrain(props: SharedContentProps) {
  const { link } = useParams()
  const [contents, setContents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        const response = await axios.get(`${backend_url}/brain?shareLink=${link}`)
        setContents(response.data)
        console.log(contents);
      } catch (err) {
        console.error(err)
        alert("Failed to load shared brain")
      } finally {
        setLoading(false)
      }
    }
    fetchSharedContent()
  }, [link])

  if (loading) return <div>Loading...</div>

  return (
    <div className='p-4 min-h-screen bg-gray-100'>
      <h1 className='text-2xl font-semibold mb-6 text-center'>Shared Brain by user: {contents.length > 0 ? contents[0].userId["username"] : "Unknown"}</h1>
      <div className='flex '>
        <Sidebar filter={props.filter} setFilter={props.setFilter}  />
        <div className='flex gap-4 flex-wrap ml-16 sm:ml-20 md:ml-56 lg:ml-72'>
          {contents.length > 0 ? contents.map(({title, link, type, _id}, index) => 
            <Card _id={_id} key={index} title={title} link={link} type={type}/>) : 
            <div className='text-gray-500'>No content shared</div>}
        </div>
      </div>

    </div>
  )
}