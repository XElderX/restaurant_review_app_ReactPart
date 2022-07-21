import { useEffect, useState } from "react";
import Avg from "./Avg";
import styles from './dishes.module.css';


const Dishes = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [dishes, setDishes] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [restourants, setRestourants] = useState([]);
    const [showHide, setShowHide] = useState(false);
    const [reRender, setReRender] = useState(false);
    const [currentDish, setCurrentDish] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [hideDishes, setHideDishes] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [reviewId, setReviewId] = useState('');


    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/v1/dishes")
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result);
                    setDishes(result); setIsLoaded(true); setReRender(false);
                },
                (error) => { setError(error); setIsLoaded(true); })
    }, [reRender, showHide])
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/v1/restourants")
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result);
                    setRestourants(result); setIsLoaded(true); setReRender(false);
                },
                (error) => { setError(error); setIsLoaded(true); })
    }, [])

    function deleteDish(id, e) {
        fetch("http://127.0.0.1:8000/api/v1/dishes/" + id, { method: 'DELETE' })
            .then((response) => {
                // console.log(response);
                if (response.status === 200) {
                    const remaining = dishes.filter(d => id !== d.id)
                    setDishes(remaining)
                }
            });
    }
    const handleSubmit = event => {

        if (event.target.dish_name.value.match("^[a-zA-Z0-9 ]{2,25}$") == null) {
            return setErrorMsg('Dish title is Invalid (Dish title\' lenght must be no less than 3 characters and no longer than 25 characters)');
        }
        if (event.target.price.value.match("[0-9.]$") == null) {
            return setErrorMsg('Dish price is Invalid. ');
        }

        event.preventDefault();
        fetch("http://127.0.0.1:8000/api/v1/dishes/", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    "restourant_id": event.target.restourant_id.value,
                    "dish_name": event.target.dish_name.value,
                    "price": event.target.price.value,
                    "foto_url": event.target.foto_url.value
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


    function functionEditBtn(id, e) {
        if (editMode === false) {
            setEditMode(true);
            setErrorMsg(null);
            setShowHide(false);

            fetch("http://127.0.0.1:8000/api/v1/dishes/" + id, { method: 'GET' })
                .then(res => res.json())
                .then(
                    (result) => {
                        // console.log(result);
                        setCurrentDish(result); setIsLoaded(true); setReRender(false);

                    },
                    (error) => { setError(error); setIsLoaded(true); });
        }
        else setEditMode(false);
        // console.log('>>>>editw')
    }

    function functionShowHide() {
        if (showHide === false) {
            setShowHide(true);
            // console.log('>>>>show')
        }
        else if (showHide === true) {
            setShowHide(false);
            // console.log('>>>>Hide')
        }
    }

    const reviewHandleSubmit = event => {

        event.preventDefault();
        fetch("http://127.0.0.1:8000/api/v1/reviews/", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    "dish_id": event.target.dish_id.value,
                    "author": event.target.author.value,
                    "rate": event.target.rate.value,
                    "comment": event.target.comment.value
                }
            )
        }).then(response => {


            if (response.status === 201) {
                setShowHide(false);
                setReRender(false);
                setHideDishes(false);
            }
        })
            .catch(error => {
                console.log(error)
            })
    }


    const handleUpdateSubmit = event => {
        event.preventDefault();
    
        if (event.target.dish_name.value.match("^[a-zA-Z0-9 ]{2,25}$") == null) {
            return setErrorMsg('Dish title is Invalid (Dish title\' lenght must be no less than 3 characters and no longer than 25 characters)');
        }
        if (event.target.price.value.match("[0-9.]$") == null) {
            return setErrorMsg('Dish price is Invalid. ');
        }
        fetch("http://127.0.0.1:8000/api/v1/dishes/" + currentDish.id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    "restourant_id": event.target.restourant_id.value,
                    "dish_name": event.target.dish_name.value,
                    "price": event.target.price.value,
                    "foto_url": event.target.foto_url.value
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

    function showReviews(id, e) {
        fetch("http://127.0.0.1:8000/api/v1/reviews/all/" + id, { method: 'GET' })
        .then(res => res.json())
                .then(
                    (result) => {
                        setReviews(result);
                        setReviewId(id);
                        setHideDishes(true);

                    }
                    )}

    if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (<>
        <div style={hideDishes === true ? { display: 'block' } : { display: 'none' }} className='container'>
        <button className="btn btn-primary" onClick={(e) => functionShowHide(e)}> {showHide === false ? 'Add new Review' : 'Hide'}  </button>

<div>
    <div style={showHide === true ? { display: 'block' } : { display: 'none' }}>
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header">A New Review:</div>
                    <div className="card-body">
                        <form onSubmit={reviewHandleSubmit}>
                            <div className="form-group">
                                
                                <input
                                type="hidden"
                                name="dish_id"
                                value={reviewId}

                                />
                            </div>

                            <div className="form-group">
                                <label>Author: </label>
                                <input type="text"
                                    name="author"
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Rating: </label>
                                <select name="rate" id="rate" className="form-control" >
                                    <option value="">--How do you liked it?--</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">1</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Comment : </label>
                                <input type="text"
                                    name="comment"
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
</div>
           {reviews?.length > 0 ? (reviews.map(review =>(
            <div className={styles.reviewItemContainer} key={review.id}>
             <div className={styles.reviewItem}><b>Review of :</b> <u>{review.dish.dish_name}</u></div>
             <div className={styles.reviewItem}><b>Reviewed by:</b> {review.author}</div>
             <div className={styles.reviewItem}><b>Commented:</b> {review.comment}</div>
             <div className={styles.reviewItem}><b>Rated as:</b> {review.rate} of 10</div>
             <div className={styles.reviewItem}><b>Posted at:</b> {review.created_at.replace('T', " ",).slice(0, 16)}</div>
             
             <br></br>
             </div>
           ))
        ) : (
            <div className={styles.dishes}> This dish haven't had any reviews yet </div>
        )}

<button onClick={(e) => setHideDishes(false)} className="btn btn-dark">Go back</button>

        </div>
        
            <div style={hideDishes === false ? { display: 'block' } : { display: 'none' }} className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Restourant</th>
                            <th>Dish</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Reviews and Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dishes.map(dish => (
                            <tr key={dish.id}>
                                <td>{dish.restourant.r_name}</td>
                                <td>{dish.dish_name}</td>
                                <td>{dish.price}</td>
                                <td><img style={{ width: '200px' }} className="photo" src={dish.foto_url} alt={"dish_foto"} /></td>
                                <td>
                                    <Avg dish_id={dish.id}
                                    />

                                    <button onClick={(e) => showReviews(dish.id, e)} className="btn btn-dark">View dish reviews</button>
                                    
                                </td>
                                <td>
                                    <button onClick={(e) => deleteDish(dish.id, e)} className="btn btn-dark">Delete</button>
                                    <button style={editMode === false && showHide === false ? { display: 'block' } : { display: 'none' }} onClick={(e) => functionEditBtn(dish.id, e)} className="btn btn-dark">Edit</button>
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
                                <div className="card-header">Update Dish details:</div>
                                <div className="card-body"></div>

                                <form onSubmit={handleUpdateSubmit}>

                                    <div className="form-group">
                                        <label>Restourant Title: </label>
                                        <select name="restourant_id" id="" className="form-control">

                                            {restourants.map(restourant => (((currentDish.restourant_id) === (restourant.id))
                                                ? <option key={restourant.id} value={currentDish.restourant_id} selected>{restourant.r_name}</option>
                                                : <option key={restourant.id} value={restourant.id}>{restourant.r_name}</option>)
                                            )}
                                        </select>

                                    </div>

                                    <div className="form-group">
                                        <label>Dish Title: </label>
                                        <input
                                            type="text"
                                            defaultValue={currentDish.dish_name || ""} key={currentDish.dish_name}
                                            name="dish_name"
                                            className="form-control"
                                        />


                                    </div>
                                    <div className="form-group">
                                        <label>Dish price: </label>
                                        <input
                                            type="text"
                                            defaultValue={currentDish.price || ""} key={currentDish.price}
                                            name="price"
                                            className="form-control"
                                        />

                                    </div>
                                    <div className="form-group">
                                        <label>Image: </label>
                                        <input
                                            type="text"
                                            defaultValue={currentDish.foto_url || ""} key={currentDish.foto_url}
                                            name="foto_url"
                                            className="form-control"
                                        />

                                    </div>

                                    <button onClick={(e) => setEditMode(false) && setCurrentDish([])} type="submit" className="btn btn-dark">Update</button>
                                </form>
                                <button onClick={(e) => setEditMode(false)} className="btn btn-dark">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="btn btn-primary" onClick={(e) => functionShowHide(e)}> {showHide === false ? 'Add new Dish' : 'Hide'}  </button>
                <div style={showHide === true ? { display: 'block' } : { display: 'none' }}>
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Create a Dish:</div>
                                <div className="card-body">

                                    <form onSubmit={handleSubmit}>

                                        <div className="form-group">
                                            <label>Restourant Title: </label>


                                            <select name="restourant_id" id="" className="form-control">
                                                <option value="" disabled>Select Restourant</option>
                                                {restourants.map(restourant => (
                                                    <option key={restourant.id} value={restourant.id}>{restourant.r_name}</option>)
                                                )}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label>Dish Name: </label>
                                            <input type="text"
                                                name="dish_name"
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Price: </label>
                                            <input type="text"
                                                name="price"
                                                className="form-control"
                                            />

                                        </div>
                                        <div className="form-group">
                                            <label>Image: </label>
                                            <input type="text"
                                                name="foto_url"
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
            </div>
            </>
        );
    }
}



export default Dishes;