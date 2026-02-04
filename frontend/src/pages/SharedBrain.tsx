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

  if (loading) return (
    <div className='min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-purple-900 flex items-center justify-center text-gray-200'>
      Loading...
    </div>
  )

  return (
    <div className='min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-purple-900'>
      <Sidebar filter={props.filter} setFilter={props.setFilter} />

      <div className='pt-4 pl-4 ml-16 sm:ml-20 md:ml-56 lg:ml-64'>
        <h1 className='text-2xl font-semibold mb-6 text-gray-200 text-center'>
          Shared Brain by user: {contents.length > 0 ? contents[0].userId["username"] : "Unknown"}
        </h1>

        <div className='flex gap-4 flex-wrap'>
          {contents.length > 0 ? contents.map(({title, link, type, _id}, index) => (
            <Card _id={_id} key={index} title={title} link={link} type={type}/>
          )) : (
            <div className='text-gray-400'>No content shared</div>
          )}
        </div>
      </div>
    </div>
  )
}