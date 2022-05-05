// import Header from "./headerOld"
import Footer from "./footer"
import Navbar from "./header"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      {/* 
      lg:text-3xl
      items-center
      justify-center
      text-center
       */}
      <main className="z-10 flex flex-col pt-32 pb-20 space-y-2 font-bold bg-slate-200">
        {children}
      </main>
      <Footer />
    </>
  )
}
