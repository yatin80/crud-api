import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SweetAlert2 from 'react-sweetalert2';

export default function UsersData() {
    const [data, setData] = useState();
    const [swalProps, setSwalProps] = useState({});
    const navigation = useNavigate();
    const [loader, setLoader] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);

    const handleEdit = (item) => {
        let { id, name, email } = item;
        localStorage.setItem("ID", id)
        localStorage.setItem("Name", name)
        localStorage.setItem("Email", email)
        navigation("/update")
        console.log("get data for update", item);
    }

    const getData = () => {
        setLoader(true)
        axios.get("https://664b4899a300e8795d44fa57.mockapi.io/Users")
            .then((response) => {
                const posts = response.data;
                // console.log("check", posts);
                setData(posts)
                setLoader(false)
            })
    }

    // const handleDelete = (id) => {

    //     axios.delete(`https://664b4899a300e8795d44fa57.mockapi.io/Users/${id}`)
    //         .then(() => {
    //             getData()
    //         })
    // }



    const handleDelete = (id) => {
        setSwalProps({
            show: true,
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            preConfirm: () => {
                return axios.delete(`https://664b4899a300e8795d44fa57.mockapi.io/Users/${id}`)
                    .then(() => {
                        getData();
                    })
                    .catch(error => {
                        SweetAlert2.fire('Failed!', 'There was an error deleting the user.', 'error');
                    });
            }
        });
    };

    const handleCheck = (e, id) => {
        const isChecked = e.target.checked;
        setSelectedIds(prevSelectedIds => {
            if (isChecked) {
                return [...prevSelectedIds, id];
            } else {
                return prevSelectedIds.filter(item => item !== id);
            }
        });
    };

    useEffect(() => {
        getData()
    }, [])
    
   
    return (
        <div className='container py-5'>
            <SweetAlert2 {...swalProps} />
            <div className='row'>
                <div className='col-6'>
                    <h2>User Lists</h2>
                </div>
                <div className='col-6 text-end'>
                    <button type="button" className="btn btn-primary" onClick={() => navigation("/")}>Create User</button>
                </div>
            </div>
            

            {loader ? <h2>Loader</h2> :
            
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th></th>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={item.id}
                                        checked={selectedIds.includes(item.id)}
                                        onChange={(e) => handleCheck(e, item.id)}
                                    />
                                </td>
                                <td scope="row">{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td className='text-end'>
                                    <button type="button" className="btn btn-success" onClick={() => handleEdit(item)}>Edit</button>
                                    <button type="button" className="btn btn-danger ms-2" onClick={() => handleDelete(item.id)}>Delete</button>
                                </td>

                            </tr>
                        ))}


                    </tbody>
                </table>
            }
        </div>
    )
}
