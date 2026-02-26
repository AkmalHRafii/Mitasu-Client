import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"
import BaseURL from "../assets/BaseURL"
import Toastify from 'toastify-js'


function AnimeCard({ anime }) {
    const navigate = useNavigate()
    const mal_id = anime.mal_id
    const title = anime.title
    async function AddBookmark() {
        try {
            const { data } = await axios.post(`${BaseURL}bookmark`, { mal_id, title }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })
            Toastify({
                text: `${title} berhasil ditambahkan ke bookmark. やったね！`,
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
                text: "残念. Gagal kasih bookmark",
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
            if (error.response.status === 401) {
                navigate("/login")
            }
        }
    }


    return (
        <>
            <div key={anime.mal_id} className="w-1/8 h-fit p-5 m-5 hover:bg-neutral-600 rounded-md overflow-auto">
                <div>
                    <img src={anime.images.jpg.image_url} />
                </div>
                <a className="text-white" href={anime.url}>{anime.title}</a>
                <h3 className="text-white">{anime.title_japanese}</h3>
                <button className="text-white w-full rounded-md hover:bg-neutral-800" onClick={AddBookmark}>Add Bookmark</button>
            </div>
        </>
    )
}

export default AnimeCard