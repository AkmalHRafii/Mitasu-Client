import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import BaseURL from "../assets/BaseURL"
import Toastify from 'toastify-js'
import jikanURL from "../assets/jikanURL"

function BookmarkCard({ bookmark }) {
    const id = bookmark.id
    const title = bookmark.title
    const [anime, setAnime] = useState({})
    async function DeleteBookmark() {
        try {
            const { data } = await axios.delete(`${BaseURL}bookmark/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })
            Toastify({
                text: `${title} berhasil dihapus dari bookmark. Sayang sekali.`,
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function () { } // Callback after click
            }).showToast();
        } catch (error) {
            console.log(error)
            Toastify({
                text: "Gagal menghapus bookmark. Coba lagi.",
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function () { } // Callback after click
            }).showToast();
        }
    }

    async function fetchAnime() {
        try {
            const { data } = await axios.get(`${jikanURL}anime/${bookmark.mal_id}`)
            setAnime(data.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchAnime()
    }, [])
    return (
        <>
            <div key={anime.mal_id} className="w-1/8 h-fit p-5 m-5 hover:bg-neutral-600 rounded-md overflow-auto">
                <div>
                    <img src={anime.images?.jpg?.image_url} />
                </div>
                <a className="text-white" href={anime.url}>{anime.title}</a>
                <h3 className="text-white">{anime.title_japanese}</h3>
                <button className="text-white w-full rounded-md hover:bg-neutral-800" onClick={DeleteBookmark}>Delete Bookmark</button>
            </div>
        </>
    )
}

export default BookmarkCard