import React from 'react';
import styles from './reviews.module.css';

const Review = ({dish, author, comment, rate, posted, CallParentFunction, id}) => {
   
    return ( 
        <div className={styles.review}> 

        <div className="container">
            <div>Reviewed: {dish}</div>
            <div>Reviewed by: {author}</div>
            <div>Commented: {comment}</div>
            <div>Rated as: {rate} of 10</div>
            <div>Posted at: {posted.replace('T', " ",).slice(0, 16)}</div>
            <button onClick={(e)=>{CallParentFunction(id)}} className="btn btn-dark">Delete</button>
            <br></br>
        </div>
        </div>

     );
}
 
export default Review;