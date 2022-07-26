import React, { useEffect, useState } from 'react';

const Avg = ({ dish_id, newReview }) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [avg, setAvg] = useState('');
    const [avgCount, setAvgCount] = useState('');
    const [token, _] = useState(localStorage.getItem("token"));
    let h = { 'Accept': 'application/json', "Authorization": `Bearer ${token}` };


    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/v1/reviews/avg/" + dish_id, { method: 'get', headers: h })
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result);
                    result === 0 ? setAvg('No reviews yet') : setAvg(result);
                },
                (error) => { setError(error); setIsLoaded(true); });
                

    }, [newReview])
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/v1/reviews/count/" + dish_id, { method: 'get', headers: h })
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result);
                    setAvgCount(result);
                }, 
                (error) => { setError(error); setIsLoaded(true);
                })

    }, [newReview])
    

    return (

        <div>
            <span> Reviews: {avgCount} </span>
            <span> Average rating: {(avg === 'No reviews yet') ? avg : parseFloat(avg).toFixed(2)} </span>
        </div>
    );
}

export default Avg;


