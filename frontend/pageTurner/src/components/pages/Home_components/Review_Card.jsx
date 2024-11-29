import React from "react";
import review_dp from "../../../../assets/reviewDP.png";
import "./Review_Card.css";

const Review_Card = () => {
  return (
    <>
      <div className="review-card">
        <img src={review_dp} alt="Reviewer 1" className="profile-pic" />
        <div className="review-content">
          <h4>John Doe</h4>
          <p>
            This website is fantastic! It's easy to navigate, and I found what I
            needed quickly. Highly recommended!
          </p>
          <div className="rating">⭐⭐⭐⭐☆ (4/5)</div>
        </div>
      </div>

      <div className="review-card">
        <img src={review_dp} alt="Reviewer 2" className="profile-pic" />
        <div className="review-content">
          <h4>Jane Smith</h4>
          <p>
            I had a great experience shopping here. The customer support is
            responsive, and the delivery was on time.
          </p>
          <div className="rating">⭐⭐⭐⭐⭐ (5/5)</div>
        </div>
      </div>

      <div className="review-card">
        <img src={review_dp} alt="Reviewer 3" className="profile-pic" />
        <div className="review-content">
          <h4>David Johnson</h4>
          <p>
            Good variety of products and reasonable prices. The UI could use a
            bit of improvement, but overall, a good experience.
          </p>
          <div className="rating">⭐⭐⭐⭐☆ (4/5)</div>
        </div>
      </div>

      <div className="review-card">
        <img src={review_dp} alt="Reviewer 4" className="profile-pic" />
        <div className="review-content">
          <h4>Emily Davis</h4>
          <p>
            I love this website! It's super easy to use, and the deals are
            great. Will definitely come back to shop more!
          </p>
          <div className="rating">⭐⭐⭐⭐⭐ (5/5)</div>
        </div>
      </div>
      <div className="review-card">
        <img src={review_dp} alt="Reviewer 3" className="profile-pic" />
        <div className="review-content">
          <h4>David Johnson</h4>
          <p>
            Good variety of products and reasonable prices. The UI could use a
            bit of improvement, but overall, a good experience.
          </p>
          <div className="rating">⭐⭐⭐⭐☆ (4/5)</div>
        </div>
      </div>

      <div className="review-card">
        <img src={review_dp} alt="Reviewer 4" className="profile-pic" />
        <div className="review-content">
          <h4>Emily Davis</h4>
          <p>
            I love this website! It's super easy to use, and the deals are
            great. Will definitely come back to shop more!
          </p>
          <div className="rating">⭐⭐⭐⭐⭐ (5/5)</div>
        </div>
      </div>
    </>
  );
};

export default Review_Card;
