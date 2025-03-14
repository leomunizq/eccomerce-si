import { Outlet } from 'react-router-dom'
import Header from './header'
import Footer from './footer'
import { Toaster } from "@/components/ui/toaster"



const Layout = () => {
  return (
    <div className="flex flex-col  w-screen">
      <Header />
      <main className="container mx-auto flex max-w-7xl flex-col px-4">
        <Outlet />  
      </main>
      <Toaster />
      <Footer />
    </div>
  )
}

export default Layout
