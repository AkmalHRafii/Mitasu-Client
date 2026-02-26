import axios from "axios"
import { useEffect, useState } from "react"
import AnimeCard from "../component/AnimeCard"
import NavBar from "../component/NavBar"
import jikanURL from "../assets/jikanURL"
import { useSelector, useDispatch } from "react-redux"
import { fetchAsync } from "../features/season/seasonSlicer"

function Main() {
    const [currentPage, setCurrentPage] = useState(1)
    const { season, page, totalPage, loading, error } = useSelector((state) => state.season)
    const dispatch = useDispatch()
    const pages = generatePage()

    function generatePage() {
        const array = []
        for (let i = 1; i <= totalPage; i++) {
            array.push(i)
        }
        return array
    }

    function handlePage(page) {
        setCurrentPage(page)

    }

    function prevP() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)

        }
    }

    function nextP() {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1)

        }
    }

    useEffect(() => {
        dispatch(fetchAsync(currentPage))
    }, [currentPage])
    return (
        <>
            <NavBar />
            {loading ? (
                <>
                    <div className="h-screen justify-center items-center">
                        <h2 className="text-center text-5xl">Anime lagi diambil...</h2>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <main className="h-screen bg-black overflow-auto">
                            <h1 className="text-white text-center text-5xl">Now Airing</h1>
                            <div className="flex flex-wrap justify-center">
                                {season.map((anime) => {
                                    return (
                                        <AnimeCard key={anime.mal_id} anime={anime} />
                                    )
                                })}
                            </div>

                        </main>
                    </div>
                </>
            )
            }
            <nav className="flex justify-center items-center gap-x-2">
                <button type="button" className="flex justify-center items-center" onClick={prevP} disabled={currentPage <= 1 ? true : false}><span>Prev</span></button>
                <div className="flex justify-center items-center gap-x-2">
                    {pages.map((page) => {
                        return (
                            <div key={page}>
                                <button type="button" className="flex justify-center items-center" onClick={() => handlePage(page)}>{page}</button>
                            </div>
                        )
                    })}
                </div>
                <button type="button" className="flex justify-center items-center" onClick={nextP} disabled={currentPage >= totalPage ? true : false}><span>Next</span></button>
            </nav>

        </>
    )
}

export default Main