import { Button } from './components/Button'
import './App.css'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'
import { Card } from './components/Card'

function App() {

  return (
    <div className='p-4'>
    <div className='flex justify-end gap-4'>
      <Button startIcon={<PlusIcon size="md"/>} variant="primary" size="md" text="Add Content" onClick={() => {}} />
      <Button variant="secondary" size="md" text="Share Brain" onClick={() => {}} startIcon={<ShareIcon size="md"/>}/>
    </div>

    <div className='flex gap-8'>
      <Card type='twitter' title="Twitter Card" link="https://x.com/DiyarDhar/status/2014244051542069598"/>
      <Card type='youtube' title="YouTube Card" link="https://www.youtube.com/watch?v=ZouQZmZKEBI"/>
    </div>

    </div>
  )
}

export default App
