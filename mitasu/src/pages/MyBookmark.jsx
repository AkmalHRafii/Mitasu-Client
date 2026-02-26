import { useState, useEffect } from "react"
import NavBar from "../component/NavBar"
import axios from "axios"
import BaseURL from "../assets/BaseURL"
import BookmarkCard from "../component/BookmarkCard"

function MyBookmark() {
    const [bookmark, setBookmark] = useState([])
    const [loading, setLoading] = useState(false)
    async function fetchBookmark() {
        try {
            setLoading(true)
            const { data } = await axios.get(`${BaseURL}bookmark`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })
            setBookmark(data.bookmarks)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBookmark()
    }, [])
    return (
        <>
            <NavBar />
            {loading ? (
                <>
                    <div className="h-screen justify-center items-center">
                        <h2 className="text-center text-5xl">Bookmark lagi diambil...</h2>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <main className="h-screen bg-black overflow-auto">
                            <h1 className="text-white text-center text-5xl">My Bookmark</h1>
                            <div className="flex flex-wrap justify-center">
                                {bookmark.length > 0 ? bookmark.map((bookmark) => {
                                    return (
                                        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
                                    )
                                }) : <h2 className="text-white">Belum ada bookmark</h2>}
                            </div>
                        </main>
                    </div>
                </>
            )
            }
        </>
    )
}

export default MyBookmark