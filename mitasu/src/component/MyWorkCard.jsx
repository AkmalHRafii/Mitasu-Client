import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"
import BaseURL from "../assets/BaseURL"
import Toastify from 'toastify-js'
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';

function MyWorkCard({ myWork }) {
    const id = myWork.id
    const title = myWork.title
    const navigate = useNavigate()
    async function DeleteMyWork() {
        try {
            const { data } = await axios.delete(`${BaseURL}mywork/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })
            Toastify({
                text: `${title} berhasil dihapus dari my work. Sayang sekali.`,
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
                text: "Gagal menghapus my work. Coba lagi.",
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
    function HandleEdit() {
        navigate(`/edit-my-work/${id}`)
    }

    async function HandleUpload(e) {
        try {
            const formData = new FormData()
            formData.append("imageUrl", e.target.files[0])
            const { data } = await axios.patch(`${BaseURL}mywork/upload/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })
            Toastify({
                text: `Gambar untuk ${title} berhasil diupload. やったね！`,
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
                text: "Gagal upload gambar. Coba lagi.",
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

    return (
        <>
            <div key={myWork.id} className="w-1/8 h-1/2 p-5 m-5 hover:bg-neutral-600 rounded-md overflow-auto flex flex-col justify-center items-center">
                <div>
                    <img src={myWork.imageUrl} />
                </div>
                <a className="text-white text-center">{myWork.title}</a>
                <button className="text-white w-full rounded-md hover:bg-neutral-800" onClick={DeleteMyWork}>Delete My Work</button>
                <button className="text-white w-full rounded-md hover:bg-neutral-800" onClick={HandleEdit}>Edit My Work</button>
                <input type="file" className="text-white w-full rounded-md hover:bg-neutral-800" onChange={HandleUpload} />
            </div>
        </>
    )
}

export default MyWorkCard