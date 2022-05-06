import React, { useState } from "react"
import { getSession, useSession } from "next-auth/react"
import Layout from "@src/components/layout"
import AccessDenied from "@src/components/access-denied"
import Head from "next/head"
import AddLink from "@src/components/AddLink"
import { NextPage, NextPageContext } from "next"
import { PrismaClient } from "@prisma/client"
import Table from "@src/components/Table"
import { RiEdit2Line } from "react-icons/ri"
import { CgTrash } from "react-icons/cg"

const prisma = new PrismaClient()

const Page: NextPage = ({ data }: any) => {
  const baseUrl =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : ""
  //--------
  // description: "link description"
  // id: "link id"
  // linkId: "link extension id"
  // url: "Link to be shorten"
  //** userId: "User ID"
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Shorten Link",
        accessor: "linkId",
        Cell: (props) => {
          const rowValues = props.row.values
          return (
            <a
              href={`${baseUrl}/${rowValues.linkId}`}
              target="_blank"
            >{`${baseUrl}/${rowValues.linkId}`}</a>
          )
        },
      },
      {
        Header: "Action",
        accessor: "url",
        Cell: (props) => {
          const rowValues = props.row.values
          return (
            <div className="flex">
              <span className="pr-3" onClick={() => console.log(rowValues.id)}>
                <RiEdit2Line />
              </span>
              <span onClick={() => console.log(rowValues.id)}>
                <CgTrash />
              </span>
            </div>
          )
        },
      },
    ],
    []
  )
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const [id, setId] = useState("")

  // console.log(data)
  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null
  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    )
  }

  // If session exists, display content
  // const baseUrl =
  //   typeof window !== "undefined" && window.location.origin
  //    // ? window.location.origin
  //     : ""

  return (
    <Layout>
      <Head>
        <title>Url Shortener</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container px-6 mx-auto">
        <div className="max-w-full p-5">
          <Table columns={columns} data={data} />
        </div>
      </div>
    </Layout>
  )
}

export default Page

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context)

  if (session) {
    const data = await prisma.link.findMany({
      where: { userId: session?.user.id },
    })

    return {
      props: {
        data,
      },
    }
  }
}
