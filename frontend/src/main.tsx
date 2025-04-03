import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NoPage from './pages/NoPage.tsx'
import Upload from './components/Upload.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
     <Routes>
        <Route path="/" element={<App />}/>
        <Route path="*" element={<NoPage />}/>
        <Route path="/upload" element={<Upload />}/>
     </Routes>
    </BrowserRouter>
)
