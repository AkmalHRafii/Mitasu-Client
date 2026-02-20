import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"
import BaseURL from "../assets/BaseURL"
import Toastify from 'toastify-js'
import NavBar from "../component/NavBar"

function AddMyWork() {
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    async function AddMyWork() {
        try {
            const { data } = await axios.post(`${BaseURL}mywork`, { title, imageUrl }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })
            Toastify({
                text: `${title} berhasil ditambahkan ke mywork. やったね！`,
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
            navigate("/mywork")
        } catch (error) {
            console.log(error)
            Toastify({
                text: "残念. Gagal kasih mywork",
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
            <NavBar />
            <div className="h-screen bg-black overflow-auto">
                <h1 className="text-white text-center text-5xl m-10">Add My Work</h1>
                <div className="flex flex-wrap justify-center">
                    <div className="w-1/4 h-fit p-5 m-5 bg-neutral-400 hover:bg-neutral-600 rounded-md">
                        <input className="w-full bg-neutral-400 p-2 m-2" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <input className="w-full bg-neutral-400 p-2 m-2" type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                        <button className="text-white w-full rounded-md hover:bg-neutral-600 m-2" onClick={AddMyWork}>Add My Work</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddMyWork
