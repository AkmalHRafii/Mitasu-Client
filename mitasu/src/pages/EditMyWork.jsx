import axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router"
import BaseURL from "../assets/BaseURL"
import Toastify from 'toastify-js'
import NavBar from "../component/NavBar"
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';
import { useEffect } from "react"


function EditMyWork() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    async function HandleEdit() {
        try {
            const { data } = await axios.put(`${BaseURL}mywork/${id}`, { title, imageUrl }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })
            Toastify({
                text: `${title} berhasil diupdate. やったね！`,
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
                text: "Gagal mengupdate my work. Coba lagi.",
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

    async function fetchMyWork() {
        try {
            const { data } = await axios.get(`${BaseURL}mywork/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })
            setTitle(data.title)
            setImageUrl(data.imageUrl)
        } catch (error) {
            console.log(error)
        }
    }

    async function HandleUpload(fileInfo) {
        try {
            console.log(fileInfo)
            const url = fileInfo.cdnUrl
            setImageUrl(url)
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

    useEffect(() => {
        fetchMyWork()
    }, [])

    return (
        <>
            <NavBar />
            <div className="h-screen bg-black overflow-auto">
                <h1 className="text-white text-center text-5xl">Edit My Work</h1>
                <div className="flex flex-wrap justify-center">
                    <div className="w-1/4 h-fit p-5 m-5 bg-neutral-400 hover:bg-neutral-600 rounded-md">
                        <input className="w-full bg-neutral-400 p-2 m-2" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <input className="w-full bg-neutral-400 p-2 m-2" type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                        <FileUploaderRegular
                            sourceList="local, camera, facebook, gdrive"
                            cdnCname="https://mxkv6bg5ir.ucarecd.net/"
                            classNameUploader="uc-light"
                            pubkey="f417ecd59610397daf66"
                            onUploadComplete={HandleUpload}
                        />
                        <button className="text-white w-full rounded-md hover:bg-neutral-800" onClick={HandleEdit}>Edit My Work</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditMyWork