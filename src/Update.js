import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Update() {
    const navigation = useNavigate();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [id, setId] = useState();
    const [loader, setLoader]=useState(false)

    useEffect(() => {
        setId(localStorage.getItem('ID') || '')
        setName(localStorage.getItem('Name') || '')
        setEmail(localStorage.getItem('Email') || '')
    }, []);

    const updateRow = (e) => {
        e.preventDefault();
        setLoader(true)
        axios.put(`https://664b4899a300e8795d44fa57.mockapi.io/Users/${id}`, {
            name: name,
            email: email
        })
            .then(() => {
                navigation('/users')
            })
            .catch((error) => {
                console.error("There was a error", error)
            })
            .then(()=>{
                setLoader(false)
            })

    }
    return (
        <div className='container mt-5'>
            <div className='py-2 text-primary pointer' onClick={()=>navigation(-1)}>Back to user</div>
            <h2>Users Update</h2>
            {loader ? <h2>Loader</h2> : null}
            <form>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="ext" className="form-control" value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">email</label>
                    <input type="email" className="form-control" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary" onClick={updateRow}>Submit</button>
            </form>
        </div>
    )
}
