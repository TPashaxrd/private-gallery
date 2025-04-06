import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NoPage from './pages/NoPage.tsx'
import Upload from './pages/Upload.tsx'
import Settings from './pages/Settings.tsx'
import { IOSSwitch } from './components/IOSSwitch.tsx'
import Screen from './pages/Screen.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
     <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/upload" element={<Upload />}/>
        <Route path="/settings" element={<Settings />}/>
        <Route path="/screen" element={<Screen />}/>
        <Route path="/ios-switch" element={<IOSSwitch />}/>
        <Route path="*" element={<NoPage />}/>
     </Routes>
    </BrowserRouter>
)
