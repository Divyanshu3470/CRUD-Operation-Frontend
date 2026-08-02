import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Options from './pages/Options'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import ViewPosts from './pages/ViewPosts'
import EditPost from './pages/EditPost'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Options/>}/>
          <Route path='/create' element={<CreatePost/>}/>
          <Route path='/posts' element={<ViewPosts/>}/>
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
