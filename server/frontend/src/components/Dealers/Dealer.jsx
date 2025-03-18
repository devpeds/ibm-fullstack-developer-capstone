import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import PositiveIcon from "../assets/positive.png"
import NeutralIcon from "../assets/neutral.png"
import NegativeIcon from "../assets/negative.png"
import ReviewIcon from "../assets/reviewbutton.png"
import Header from '../Header/Header';
import apiClient from '../../apiClient';

const rootUrl = () => {
  const curUrl = window.location.href
  return curUrl.substring(0, curUrl.indexOf("dealer"))
}

const getDealer = async (id) => {
  const dealerUrl = rootUrl() + `djangoapp/dealer/${id}`
  const res = await apiClient.get(dealerUrl);
  return res.dealer;
}

const getReviews = async (id) => {
  const reviewsUrl = rootUrl() + `djangoapp/reviews/dealer/${id}`;
  const res = await apiClient.get(reviewsUrl);
  return res.reviews;
}

const Dealer = () => {
  const [dealer, setDealer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [unreviewed, setUnreviewed] = useState(false);
  const [postReview, setPostReview] = useState(<></>)
  let params = useParams();
  let id = params.id;

  const senti_icon = (sentiment)=>{
    if (sentiment === "positive") {
      return PositiveIcon;
    }

    return sentiment === "negative" ? NegativeIcon : NeutralIcon;
  }

  useEffect(() => {
    getDealer(id).then(dealer => setDealer(dealer));
    getReviews(id).then(reviews => {
      setReviews(reviews)
      setUnreviewed(reviews.length === 0)
    });

    if(sessionStorage.getItem("username")) {
      setPostReview((
        <a href={rootUrl() + `postreview/${id}`}>
          <img
            src={ReviewIcon}
            style={{width:'10%',marginLeft:'10px',marginTop:'10px'}}
            alt='Post Review'
          />
        </a>
      ))
    }
  },[id]);  


return(
  <div style={{margin:"20px"}}>
      <Header/>
      <div style={{marginTop:"10px", color:"grey"}}>
        <h1>{dealer.full_name}{postReview}</h1>
        <h4>{dealer['city']},{dealer['address']}, Zip - {dealer['zip']}, {dealer['state']}</h4>
      </div>
      <div class="reviews_panel">
        {reviews.length === 0 && unreviewed === false ? (
          <text>Loading Reviews....</text>
        ) : unreviewed === true ? (
          <div>No reviews yet! </div>
        ) : reviews.map(review => (
          <div className='review_panel'>
            <img src={senti_icon(review.sentiment)} className="emotion_icon" alt='Sentiment'/>
            <div className='review'>{review.review}</div>
            <div className="reviewer">{review.name} {review.car_make} {review.car_model} {review.car_year}</div>
          </div>
        ))}
    </div>  
  </div>
)
}

export default Dealer
