import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster.tsx'
import AppRoutes from '@/routes/app-routes.tsx'
import './index.css'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <AppRoutes />
    <Toaster />
    </QueryClientProvider>
  </StrictMode>
)
