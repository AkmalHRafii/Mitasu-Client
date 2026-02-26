import axios from "axios"
import { useState } from "react"
import Toastify from 'toastify-js'
import { useNavigate } from "react-router"
import BaseURL from "../assets/BaseURL"
import { GoogleLogin } from '@react-oauth/google';
import NavBar from "../component/NavBar"


function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${BaseURL}user/register`, { email, password })
            Toastify({
                text: `${email} Selamat datang di Mitasu!`,
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
            navigate("/login")
        } catch (error) {
            console.log(error)
            Toastify({
                text: "Coba pastikan email dan password sudah benar.",
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
    async function googleLogin(credentialResponse) {
        try {
            const { data } = await axios.post(`${BaseURL}user/google-login`, {}, {
                headers: {
                    token: credentialResponse.credential
                }
            })
            localStorage.setItem("access_token", data.access_token)
            Toastify({
                text: `Selamat datang di Mitasu!`,
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
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <NavBar />
            <div className="h-screen bg-neutral-700 flex justify-center items-center">
                <div className="border h-1/2 w-1/4 bg-emerald-50 rounded-md">
                    <h2 className="m-10 text-center text-3xl">Register</h2>
                    <form className="flex flex-col justify-center items-center w-full" onSubmit={handleSubmit}>
                        <div className="flex flex-col justify-center items-center w-full m-5">
                            <label className="text-2xl pb-3">Email</label>
                            <input className="border w-3/4 bg-white rounded-md" type="text" onChange={(e) => setEmail(e.target.value)} />
                            <label className="text-2xl p-3">Password</label>
                            <input className="border w-3/4 bg-white rounded-md" type="password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className="border m-5 rounded-md bg-neutral-200 hover:bg-neutral-400 w-1/2">Register</button>
                        <GoogleLogin
                            onSuccess={googleLogin}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register