import addLink from "app/auth/mutations/addLink"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import Layout from "app/layouts/Layout"
import { BlitzPage } from "blitz"
import React, { Suspense, useEffect, useRef } from "react"

const AddLink = () => {
  const currentUser = useCurrentUser()
  const [url, setUrl] = React.useState("")
  const [title, setTitle] = React.useState("")
  const [link, setLink] = React.useState({})
  const [changed, setChanged] = React.useState(false)
  const didMount = useRef(false)

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }
    setChanged(true)
    setTimeout(() => {
      setChanged(false)
    }, 1000)
  }, [link])

  return (
    <div>
      {currentUser && (
        <div>
          <h1>
            Hi, <a href={`/u/${currentUser.username}`}>{currentUser.username}</a>
          </h1>
          <form>
            <h1 className="font-bold">Add Link</h1>
            <div>
              <span className="mr-2">Title</span>
              <input
                className="bg-gray-200"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />
            </div>
            <div>
              <span className="mr-2">URL</span>
              <input
                className="bg-gray-200"
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value)
                }}
              />
            </div>
            <button
              className="bg-gray-200 mt-2"
              type="submit"
              onClick={async (e) => {
                e.preventDefault()
                setLink(await addLink({ url, title }))
              }}
            >
              Add
            </button>
            {changed && <span className="text-green-500 ml-3">Link added</span>}
          </form>
        </div>
      )}
    </div>
  )
}

const Search = () => {
  return (
    <div className="text-center flex flex-col my-2">
      <span className="font-bold mb-2">I want to learn</span>
      <input className="w-40 mx-auto mx" type="text" />
    </div>
  )
}

const Home: BlitzPage = () => {
  return (
    <div className="container">
      <main>
        <Suspense fallback="Loading...">
          <AddLink />
        </Suspense>
        <Suspense fallback="Loading...">
          <Search />
        </Suspense>
      </main>

      <footer></footer>
    </div>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
