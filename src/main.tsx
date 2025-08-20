import "./App.css";
import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { AppRoutes } from './routes/AppRoutes.tsx'

createRoot(document.getElementById('root')!).render(

    <BrowserRouter>
       <AuthProvider>
     <AppRoutes />
    </AuthProvider>
    </BrowserRouter>

)
