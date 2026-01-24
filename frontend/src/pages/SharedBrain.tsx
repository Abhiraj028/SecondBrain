import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Card } from '../components/Card'
import type { CardProps } from '../components/Card'

export function SharedBrain() {
  const { link } = useParams()
  const [contents, setContents] = useState<CardProps[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/brain?shareLink=${link}`)
        setContents(response.data)
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
      <h1 className='text-2xl font-bold mb-6'>Shared Brain</h1>
      <div className='flex gap-4 flex-wrap'>
        {contents.length > 0 ? contents.map(({title, link, type, _id}, index) => 
          <Card _id={_id} key={index} title={title} link={link} type={type}/>) : 
          <div className='text-gray-500'>No content shared</div>}
      </div>
    </div>
  )
}