import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import BaseURL from "../assets/BaseURL"
import MyWorkCard from "../component/MyWorkCard"
import NavBar from "../component/NavBar"

function MyWork() {
    const navigate = useNavigate()
    const [myWork, setMyWork] = useState([])
    async function GetMyWork() {
        try {
            const { data } = await axios.get(`${BaseURL}mywork`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })
            setMyWork(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        GetMyWork()
    }, [])
    return (
        <>
            <NavBar />
            <div className="h-screen bg-black overflow-auto">
                <h1 className="text-white text-center text-5xl">My Work</h1>
                <div className="flex justify-center">
                    <button className="text-white w-fit rounded-md hover:bg-neutral-800 m-10 p-2" onClick={() => navigate("/add-my-work")}>Add My Work</button>
                </div>
                <div className="flex flex-wrap justify-center">
                    {myWork.map((myWork) => (
                        <MyWorkCard key={myWork.id} myWork={myWork} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default MyWork
