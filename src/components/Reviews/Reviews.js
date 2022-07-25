import { useEffect, useState } from "react";
import Review from "./Review";
import Loader from '../Loader/Loader';
import styles from './reviews.module.css';
import { useNavigate } from "react-router-dom";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showHide, setShowHide] = useState(false);
    const [reRender, setReRender] = useState(false);
    const [dishes, setDishes] = useState([]);
    const [token, _] = useState(localStorage.getItem("token"));
    const nav = useNavigate();
    let h = { 'Accept': 'application/json', "Authorization": `Bearer ${token}` };

    useEffect(() => {
        if (!token) return nav("/login");
        fetch("http://127.0.0.1:8000/api/v1/reviews", { headers: h })
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
                    setReviews(result); setIsLoaded(true); setReRender(false);
                },
                (error) => { setError(error); setIsLoaded(true); }

            )
    }, [reRender])
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/v1/dishes", { headers: h })
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
                    setDishes(result); setIsLoaded(true); setReRender(false);
                },
                (error) => { setError(error); setIsLoaded(true); })
    }, [reRender])

    function deleteReview(id, e) {
        fetch("http://127.0.0.1:8000/api/v1/reviews/" + id, { method: 'DELETE', headers: h })
            .then((response) => {
                // console.log(response);
                if (response.status === 200) {
                    const remaining = reviews.filter(d => id !== d.id)
                    setReviews(remaining)
                }
            });

    }
    function functionShowHide() {
        if (showHide === false) {
            setShowHide(true);
            // console.log('>>>>show')
        }
        else if (showHide === true) {
            setShowHide(false);
            // console.log('>>>>Hide')
        } if (!isLoaded) {
            return <div>Loading...</div>;
        }
    }
    const handleSubmit = event => {

        event.preventDefault();
        fetch("http://127.0.0.1:8000/api/v1/reviews/", {
            method: 'POST',
            headers: h,
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
    }
    else {
        return (
            <>
                <div className={styles.reviewContainer}>
                    <div className={styles.reviewContainer} style={showHide === false ? { display: 'flex' } : { display: 'none' }}>

                        {reviews?.length > 0 ? (reviews.map((review =>
                            <Review key={review.id}
                                id={review.id}
                                dish={review.dish.dish_name}
                                author={review.author}
                                comment={review.comment}
                                rate={review.rate}
                                posted={review.created_at}
                                CallParentFunction={deleteReview}
                            />))
                        ) : (
                            <Loader />
                        )
                        }
                    </div>
                </div>

                <div className={styles.reviewsBtnContainer}>

                    <button className={styles.reviewsAddBtn} onClick={(e) => functionShowHide(e)}> {showHide === false ? 'Add new Review' : 'Hide'}  </button>

                </div>

                <div>
                    <div style={showHide === true ? { display: 'block' } : { display: 'none' }}>
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="card">
                                    <div className="card-header">A New Review:</div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label>Dish Title: </label>
                                                <select name="dish_id" id="" className="form-control">
                                                    <option value="" disabled>Select Dish</option>
                                                    {dishes.map(dish => (
                                                        <option key={dish.id} value={dish.id}>{dish.dish_name}</option>)
                                                    )}
                                                </select>
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
            </>);
    };
}

export default Reviews;