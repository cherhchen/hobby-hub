import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import App from './App.jsx'
import CreatePost from './routes/CreatePost.jsx'
import EditPost from './routes/EditPost.jsx'
import PostDetails from './routes/PostDetails.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/create" element={<CreatePost/>}/>
        <Route path="/edit/:id" element={<EditPost/>}/>
        <Route path="/details/:id" element={<PostDetails/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
