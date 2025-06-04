import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState('')

    const header = { "Access-Control-Allow-Origin": "*" }

    const navigation = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true)
        setError('') // Reset error message

        try {
            const response = await axios.get("https://664b4899a300e8795d44fa57.mockapi.io/Users", { header });
            const users = response.data;
            console.log("check user data", response.data);

            const emailexists = users.some(user => user.email === email)
            if (emailexists) {
                setError('Email already exists');
                setLoader(false);
                return;
            }

            axios.post("https://664b4899a300e8795d44fa57.mockapi.io/Users", {
                name: name,
                email: email,
                header
            }).then(() => {
                setLoader(false)
                navigation("/users")
            })




        } catch (err) {
            setLoader(false)
            setError('An error occurred. Please try again.')
        }

        // axios.post("https://664b4899a300e8795d44fa57.mockapi.io/Users", {
        //     name:name,
        //     email:email,
        //     header
        // })
        // .then(()=>{
        //     navigation("/users")
        // })
        // .then(()=>{
        //     setLoader(false)
        // })

    }
    return (
        <div className='container mt-5'>
            <h2>Add Users</h2>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <form>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="ext" className="form-control" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">email</label>
                    <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}
