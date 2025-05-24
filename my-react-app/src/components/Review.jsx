import React from "react";
import './Review.css'

const reviewData = [
  {
    name: "Rob Bliss",
    img:
      "https://i.ibb.co/fS1S1Vw/depositphotos-74925449-stock-photo-men-human-face-smiling.jpg",
    alt: "Rob Bliss",
    stars: 5,
    text:
      "Art Rising has been a fantastic platform for discovering new artists. The curated galleries are always fresh and inspiring. Highly recommend for any art enthusiast!",
  },
  {
    name: "Lebo Miller",
    img:
      "https://i.ibb.co/TcY0Hsr/stock-photo-close-up-portrait-of-yong-woman-casual-portrait-in-positive-view-big-smile-beautiful-mod.jpg",
    alt: "Lebo Miller",
    stars: 5,
    text:
      "I had a wonderful experience with Art Rising. The artwork is unique and beautifully displayed. It’s a great place to find both emerging and established artists.",
  },
  {
    name: "John Waddrob",
    img:
      "https://i.ibb.co/W5x5rcB/depositphotos-74950191-stock-photo-men-latin-american-and-hispanic.jpg",
    alt: "John Waddrob",
    stars: 5,
    text:
      "I had a wonderful experience with Art Rising. The artwork is unique and beautifully displayed. It’s a great place to find both emerging and established artists.",
  },
   {
    name: "John Waddrob",
    img:
      "https://i.ibb.co/W5x5rcB/depositphotos-74950191-stock-photo-men-latin-american-and-hispanic.jpg",
    alt: "John Waddrob",
    stars: 5,
    text:
      "I had a wonderful experience with Art Rising. The artwork is unique and beautifully displayed. It’s a great place to find both emerging and established artists.",
  },
  
   {
    name: "John Waddrob",
    img:
      "https://i.ibb.co/W5x5rcB/depositphotos-74950191-stock-photo-men-latin-american-and-hispanic.jpg",
    alt: "John Waddrob",
    stars: 5,
    text:
      "I had a wonderful experience with Art Rising. The artwork is unique and beautifully displayed. It’s a great place to find both emerging and established artists.",
  },
  
   {
    name: "John Waddrob",
    img:
      "https://i.ibb.co/W5x5rcB/depositphotos-74950191-stock-photo-men-latin-american-and-hispanic.jpg",
    alt: "John Waddrob",
    stars: 5,
    text:
      "I had a wonderful experience with Art Rising. The artwork is unique and beautifully displayed. It’s a great place to find both emerging and established artists.",
  },
  
  
];

const review = () => {
  return (
    <section className="review-section" id="reviews">
                 <h2 className="section-header">REVIEW FROM <span>OUR CLIENTS</span> </h2>
      <div className="review-inner">
        <div className="row">
          {reviewData.map(({ name, img, alt, stars, text }, index) => (
            <div className="col" key={index}>
              <div className="review">
                <img src={img} alt={alt} />
                <div className="name">{name}</div>
                <div className="stars">
                  {[...Array(stars)].map((_, i) => (
                    <i className="fas fa-star" key={i}></i>
                  ))}
                </div>
                <p className="text">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default review;
