import React, { useState } from "react"
import axios, { AxiosRequestConfig } from "axios"
import { useSession } from "next-auth/react"

type AddLinkParams = {
  id: string
  setId: React.Dispatch<React.SetStateAction<string>>
}

const AddLink: React.FC<AddLinkParams> = ({ id, setId }) => {
  const [url, setUrl] = useState("")
  const [desc, setDesc] = useState("")
  const { data: session, status } = useSession()
  const uid = session?.user.id

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log(uid, url, desc)

    if (url.trim()) {
      const config: AxiosRequestConfig = {
        method: "POST",
        url: "api/add",
        headers: {
          "Content-Type": "application/json",
        },
        data: { uid, url, desc },
      }
      const { data } = await axios(config)
      setId(data)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        className="w-full h-10 px-3 bg-gray-100 rounded-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-300 text-1xl text-neutral-500"
        type="url"
        placeholder="Enter Your URL"
        onChange={(e) => setUrl(e.target.value)}
      />
      <input
        className="w-full h-10 px-3 bg-gray-100 rounded-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-300 text-1xl text-neutral-500"
        type="text"
        placeholder="Enter URL Description"
        onChange={(e) => setDesc(e.target.value)}
      />

      <button
        type="submit"
        className="p-3 mt-4 text-sm text-white transition-all duration-100 bg-red-400 rounded-lg hover:bg-red-500"
      >
        Shorten Me
      </button>
    </form>
  )
}

export default AddLink
