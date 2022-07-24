import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Restourants = ({ logedIn, setLogedIn, user, admin }) => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [restourants, setRestourants] = useState([]);
    const [showHide, setShowHide] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [reRender, setReRender] = useState(false);
    const [currentRestourant, setCurrentRestourant] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [token, _] = useState(localStorage.getItem("token"));
    const nav = useNavigate();
    let h = { 'Accept': 'application/json', "Authorization": `Bearer ${token}` };


    useEffect(() => {
        if (!token) return nav("/login");

        fetch("http://127.0.0.1:8000/api/v1/restourants", { headers: h })
            .then(res => {
                if (!res.ok) {
                    console.log(res);
                    setError(res);
                    setIsLoaded(true);
                } else {
                    return res.json()
                }
            }).then(
                (result) => {

                    console.log(typeof (JSON.parse(localStorage.getItem("admin"))));
                    setRestourants(result);
                    setIsLoaded(true);
                    setReRender(false);
                },
                (error) => { setError(error); setIsLoaded(true); })
    }, [reRender])



    function deleteRestourant(id, e) {

        fetch("http://127.0.0.1:8000/api/v1/restourants/" + id, { method: 'DELETE', headers: h })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    const remaining = restourants.filter(r => id !== r.id)
                    setRestourants(remaining)
                    setErrorMsg(null);
                }
            });
    }
    const handleSubmit = event => {
        event.preventDefault();
        if (event.target.r_name.value.match("^[a-zA-Z0-9 ]{2,20}$") == null) {
            return setErrorMsg('Restourant name is Invalid (Restourant lenght must be no less than 3 characters and no longer than 20 characters)');
        }
        if (event.target.city.value.match("^[a-zA-Z ]{2,20}$") == null) {
            return setErrorMsg('City name is Invalid. It only can contain letters and have more than 2 and no more than 20 symbols');
        }
        if (event.target.address.value.match("^[a-zA-Z0-9 ]{5,25}$") == null) {
            return setErrorMsg('Address is Invalid. Address must have atleast 5 characters or be no longer than 25 characters');
        }

        fetch("http://127.0.0.1:8000/api/v1/restourants/", {
            method: 'POST',
            headers: h,
            body: JSON.stringify(
                {
                    "r_name": event.target.r_name.value,
                    "city": event.target.city.value,
                    "address": event.target.address.value,
                    "working_hours": event.target.working_hours.value
                }
            )

        }).then(response => {

            if (response.status === 201) {
                setShowHide(false);
                setReRender(true);
            }
        })
            .catch(error => {
                console.log(error)
            })
    }
    function functionShowHide() {
        (showHide === false)
            ? setShowHide(true) && setErrorMsg(null)
            // console.log('>>>>show')
            : setShowHide(false) && setErrorMsg(null)
        // console.log('>>>>Hide')
    }

    function functionEditBtn(id) {
        if (editMode === false) {
            setEditMode(true);
            setErrorMsg(null);
            setShowHide(false);

            fetch("http://127.0.0.1:8000/api/v1/restourants/" + id, { method: 'GET', headers: h })
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result);
                        setCurrentRestourant(result); setIsLoaded(true); setReRender(false);

                    },
                    (error) => { setError(error); setIsLoaded(true); });
        }
        else setEditMode(false);
        // console.log('>>>>editw')
    }

    const handleUpdateSubmit = event => {
        event.preventDefault();
        if (event.target.r_name.value.match("^[a-zA-Z0-9 ]{2,20}$") == null) {
            return setErrorMsg('Restourant name is Invalid (Restourant lenght must be no less than 3 characters and no longer than 20 characters)');
        }
        if (event.target.city.value.match("^[a-zA-Z ]{2,20}$") == null) {
            return setErrorMsg('City name is Invalid. It only can contain letters and have more than 2 and no more than 20 symbols');
        }
        if (event.target.address.value.match("^[a-zA-Z0-9 ]{5,25}$") == null) {
            return setErrorMsg('Address is Invalid. Address must have atleast 5 characters or be no longer than 25 characters');
        }
        fetch("http://127.0.0.1:8000/api/v1/restourants/" + currentRestourant.id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json ', "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(
                {
                    "r_name": event.target.r_name.value,
                    "city": event.target.city.value,
                    "address": event.target.address.value,
                    "working_hours": event.target.working_hours.value
                }
            )
        }).then(response => {
            console.log(response)

            if (response.status === 200) {
                setReRender(true);
            }
        })
            .catch(error => {
                console.log(error)
            })

    }
    if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (
            <div className="container">

                <table className="table">
                    <thead>
                        <tr>
                            <th>Restourant Title</th>
                            <th>City</th>
                            <th>Address</th>
                            <th>Working Hours</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {restourants.map(restourant => (
                            <tr key={restourant.id}>
                                <td>{restourant.r_name} </td>
                                <td>{restourant.city}</td>
                                <td>{restourant.address}</td>
                                <td>{restourant.working_hours}</td>
                                <td>
                                    <button style={editMode === false && showHide === false && JSON.parse(localStorage.getItem("admin")) === 1 ? { display: 'block' } : { display: 'none' }} onClick={(e) => deleteRestourant(restourant.id, e)} className="btn btn-dark">Delete</button>
                                    <button style={editMode === false && showHide === false && JSON.parse(localStorage.getItem("admin")) === 1 ? { display: 'block' } : { display: 'none' }} onClick={(e) => functionEditBtn(restourant.id, e)} className="btn btn-dark">Edit</button>

                                </td>
                            </tr>)
                        )}

                    </tbody>
                </table>
                <div className='text-danger'>{errorMsg}</div>


                <div style={editMode === true ? { display: 'block' } : { display: 'none' }}>
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Update restourant info:</div>
                                <div className="card-body"></div>


                                <form onSubmit={handleUpdateSubmit}>

                                    <div className="form-group">
                                        <label>Restourant Title: </label>
                                        <input
                                            type="text"
                                            defaultValue={currentRestourant.r_name || ""} key={currentRestourant.r_name}
                                            name="r_name"
                                            className="form-control"

                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>City: </label>
                                        <input
                                            type="text"
                                            defaultValue={currentRestourant.city || ""} key={currentRestourant.address}
                                            name="city"
                                            className="form-control"
                                        />


                                    </div>
                                    <div className="form-group">
                                        <label>Address: </label>
                                        <input
                                            type="text"
                                            defaultValue={currentRestourant.address || ""} key={currentRestourant.address}
                                            name="address"
                                            className="form-control"
                                        />

                                    </div>
                                    <div className="form-group">
                                        <label>Working Hours: </label>
                                        <input
                                            type="text"
                                            defaultValue={currentRestourant.working_hours || ""} key={currentRestourant.working_hours}
                                            name="working_hours"
                                            className="form-control"
                                        />

                                    </div>

                                    <button onClick={(e) => setEditMode(false)} type="submit" className="btn btn-dark">Update</button>
                                </form>
                                <button onClick={(e) => setEditMode(false)} className="btn btn-dark">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>

                <button style={editMode === false && JSON.parse(localStorage.getItem("admin")) === 1 ? { display: 'block' } : { display: 'none' }} className="btn btn-primary" onClick={(e) => functionShowHide(e)}> {showHide === false ? 'Add new restourant' : 'Hide'}  </button>

                <div style={showHide === true ? { display: 'block' } : { display: 'none' }} className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Create a restourant:</div>
                            <div className="card-body">



                                <form onSubmit={handleSubmit}>

                                    <div className="form-group">
                                        <label>Restourant Title: </label>
                                        <input
                                            type="text"
                                            name="r_name"
                                            className="form-control"

                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>City: </label>
                                        <input
                                            type="text"
                                            name="city"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Address: </label>
                                        <input
                                            type="text"
                                            name="address"
                                            className="form-control"
                                        />

                                    </div>
                                    <div className="form-group">
                                        <label>Working Hours: </label>
                                        <input
                                            type="text"
                                            name="working_hours"
                                            className="form-control"
                                        />

                                    </div>
                                    <button type="submit"
                                        className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Restourants;

