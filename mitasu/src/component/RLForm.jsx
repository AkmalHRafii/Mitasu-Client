import { useState } from "react"


function RLForm({formname, handleSubmit}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <>
            <div>
                <h2>{formname}</h2>
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input type="text" onChange={(e) => setEmail(e.target.value)}/>
                    <label>Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                    <button>{formname}</button>
                </form>
            </div>
        </>
    )
}

export default RLForm