import { useState } from "react"
import NavBar from "../component/NavBar"
import axios from "axios"
import jikanURL from "../assets/jikanURL"
import AnimeCard from "../component/AnimeCard"


function SearchAnime() {
    const [search, setSearch] = useState("")
    const [searchAnime, setSearchAnime] = useState([])
    const [loading, setLoading] = useState(false)

    async function fetchAnime(e) {
        e.preventDefault()
        try {
            setLoading(true)
            const { data } = await axios.get(`${jikanURL}anime?q=${search}&sfw=true`)
            setSearchAnime(data.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <NavBar />
            <div>
                <div>
                    <form onSubmit={fetchAnime}>
                        <input className="h-full w-full bg-white border-2 rounded-md" type="search" name="search" id="search" placeholder="search by Anime title" onChange={(e) => setSearch(e.target.value)} value={search} />
                    </form>
                </div>
            </div>

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
                            <div className="flex flex-wrap justify-center">
                                {searchAnime.map((anime) => {
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
        </>
    )
}

export default SearchAnime