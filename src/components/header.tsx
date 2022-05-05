import React, { useState } from "react"
import { Transition } from "@headlessui/react"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"

// import Image from "next/image"
// import Logo from "../public/streamlineLogo.png"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session, status } = useSession()
  const loading = status === "loading"
  return (
    <div>
      <nav className="fixed z-10 w-full bg-white shadow-sm ">
        <div className="w-full">
          <div className="flex items-center w-full h-20">
            <div className="flex items-center justify-between w-full mx-20">
              <div className="flex items-center justify-center flex-shrink-0 ">
                <h1 className="text-xl font-bold cursor-pointer ">
                  URL<span className="text-blue-500">Shortener</span>
                </h1>
              </div>
              <div className="hidden md:block">
                <div className="flex items-baseline ml-10 space-x-4">
                  <Link href="/">
                    <a className="px-3 py-2 font-semibold text-blue-600 cursor-pointer text-md hover:font-black">
                      Home
                    </a>
                  </Link>
                  <Link href="/client">
                    <a className="px-3 py-2 text-sm font-medium text-black rounded-md cursor-pointer hover:bg-blue-600 hover:text-white">
                      Client
                    </a>
                  </Link>
                  <Link href={"/server"}>
                    <a className="px-3 py-2 text-sm font-medium text-black rounded-md cursor-pointer hover:bg-blue-600 hover:text-white">
                      Server
                    </a>
                  </Link>

                  <Link href="/url">
                    <a className="px-3 py-2 text-sm font-medium text-black rounded-md cursor-pointer hover:bg-blue-600 hover:text-white">
                      URL List
                    </a>
                  </Link>

                  {!session && (
                    <a
                      href={`/api/auth/signin`}
                      className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md cursor-pointer hover:bg-black"
                      onClick={(e) => {
                        e.preventDefault()
                        signIn()
                      }}
                    >
                      Sign in
                    </a>
                  )}

                  {session?.user && (
                    <a
                      href={`/api/auth/signout`}
                      className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md cursor-pointer hover:bg-black"
                      onClick={(e) => {
                        e.preventDefault()
                        signOut()
                      }}
                    >
                      Sign out
                    </a>
                  )}

                  {/* <Link href="/contact">
                    <a className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md cursor-pointer hover:bg-black">
                      Contact
                    </a>
                  </Link> */}
                </div>
              </div>
            </div>
            <div className="flex mr-10 md:hidden ">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 text-white bg-blue-600 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div
                ref={ref}
                className="px-2 pt-2 pb-3 space-y-1 bg-white sm:px-3"
              >
                <Link href="/home">
                  <a className="block px-3 py-2 text-base font-medium text-black rounded-md cursor-pointer hover:bg-blue-600 hover:text-white">
                    Home
                  </a>
                </Link>
                <Link href="/client">
                  <a className="block px-3 py-2 text-base font-medium text-black rounded-md cursor-pointer hover:bg-blue-600 hover:text-white">
                    Client
                  </a>
                </Link>

                <Link href="/server">
                  <a className="block px-3 py-2 text-base font-medium text-black rounded-md cursor-pointer hover:bg-blue-600 hover:text-white">
                    Server
                  </a>
                </Link>
                <Link href="/url">
                  <a className="block px-3 py-2 text-base font-medium text-black rounded-md cursor-pointer hover:bg-blue-600 hover:text-white">
                    URL List
                  </a>
                </Link>

                {!session && (
                  <a
                    href={`/api/auth/signin`}
                    className="block px-3 py-2 text-base font-medium text-black rounded-md cursor-pointer hover:bg-blue-600 hover:text-white"
                    onClick={(e) => {
                      e.preventDefault()
                      signIn()
                    }}
                  >
                    Sign in
                  </a>
                )}

                {session?.user && (
                  <a
                    href={`/api/auth/signout`}
                    className="block px-3 py-2 text-base font-medium text-black rounded-md cursor-pointer hover:bg-blue-600 hover:text-white"
                    onClick={(e) => {
                      e.preventDefault()
                      signOut()
                    }}
                  >
                    Sign out
                  </a>
                )}
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  )
}

export default Navbar
