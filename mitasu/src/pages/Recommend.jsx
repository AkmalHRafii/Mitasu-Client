import { useState, useEffect } from "react"
import NavBar from "../component/NavBar"
import axios from "axios"
import BaseURL from "../assets/BaseURL"
import Toastify from 'toastify-js'

function Recommend() {
    const [response, setResponse] = useState({})
    const [recommend, setRecommend] = useState([])
    const [reason, setReason] = useState("")
    const [loadingRecommend, setLoadingRecommend] = useState(false)
    async function getRecommend() {
        try {
            setLoadingRecommend(true)
            const { data } = await axios.get(`${BaseURL}ai/recommend`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })
            console.log(data)
            const parsedData = JSON.parse(data.recommendations)
            setResponse(parsedData)
            setRecommend(parsedData.recommendations)
            setReason(parsedData.reasoning)
            console.log(parsedData.recommendations)
            console.log(parsedData.reasoning)
            console.log(parsedData)
        } catch (error) {
            console.log(error)
            if (error.response && error.response.status === 500) {
                Toastify({
                    text: "Please try again later.",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    style: {
                        background: "linear-gradient(to right, #ff5f6d, #ffc371)",
                    },
                }).showToast();
            } else {
                Toastify({
                    text: "Maybe it reached the limit. Please try again later.",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    style: {
                        background: "linear-gradient(to right, #ff5f6d, #ffc371)",
                    },
                }).showToast();
            }

        } finally {
            setLoadingRecommend(false)
        }
    }
    return (
        <>
            <NavBar />
            <div className="flex justify-center items-center">
                <button className="hover:bg-neutral-500 cursor-pointer rounded-full p-2" onClick={getRecommend}>Get Recommend</button>
            </div>
            {loadingRecommend ? (
                <>
                    <div className="h-screen justify-center items-center bg-black">
                        <h2 className="text-center text-2xl text-white">Mencari rekomendasi...</h2>
                    </div>
                </>
            ) : (
                <>
                    <div className="h-screen w-full overflow-auto bg-black">
                        <h1 className="text-center text-5xl text-white m-5">Rekomendasi</h1>
                        <div className="flex flex-wrap justify-center">
                            {recommend?.length > 0 ?
                                <div className="text-white">{recommend.map((anime) => {
                                    return (
                                        <div key={anime} className="m-5">
                                            <h2 className="text-white text-center text-2xl p-5">{anime}</h2>
                                        </div>
                                    )
                                }
                                )}
                                    <div>
                                        <h2 className="text-white text-center text-2xl p-5">{reason}</h2>
                                    </div>
                                </div>
                                : <div className="flex justify-center items-center">
                                    <h2 className="text-white">Belum bisa rekomendasi. Coba tambah bookmark dulu.</h2>
                                </div>
                            }
                        </div>
                    </div>
                </>
            )
            }
        </>
    )
}

export default Recommend