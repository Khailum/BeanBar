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
    "Bean Bar Coffee Shop is my go-to spot for the perfect cup of coffee. The ambiance is cozy, the baristas are friendly, and the coffee is consistently top-notch.",
},
{
  name: "Lebo Miller",
  img:
    "https://i.ibb.co/TcY0Hsr/stock-photo-close-up-portrait-of-yong-woman-casual-portrait-in-positive-view-big-smile-beautiful-mod.jpg",
  alt: "Lebo Miller",
  stars: 5,
  text:
    "I absolutely love Bean Bar! Their flat whites are incredible and the pastries are always fresh. It’s the perfect place to relax or catch up on work.",
},
{
  name: "John Waddrob",
  img:
    "https://i.ibb.co/W5x5rcB/depositphotos-74950191-stock-photo-men-latin-american-and-hispanic.jpg",
  alt: "John Waddrob",
  stars: 5,
  text:
    "The coffee at Bean Bar is rich and flavorful — you can tell they care about quality. I stop by almost every morning and have never been disappointed.",
},
{
  name: "Cynthia James",
  img:
    "https://i.ibb.co/0p3y65f4/reavie.jpg",
  alt: "Cynthia James",
  stars: 5,
  text:
    "Great service and even better coffee! Bean Bar Coffee Shop has a warm atmosphere that makes it feel like a second home. Highly recommend the iced mocha!",
},
{
  name: "Samuel Dube",
  img:
    "https://i.ibb.co/hFvSZNXp/review2.jpg",
  alt: "Samuel Dube",
  stars: 5,
  text:
    "I love how Bean Bar supports local roasters and always has something new to try. It’s a hidden gem for coffee lovers in the area.",
},
{
  name: "Tanya Green",
  img:
    "https://i.ibb.co/tpG6rrhr/review.jpg",
  alt: "Tanya Green",
  stars: 5,
  text:
    "Bean Bar Coffee Shop never disappoints. The staff is knowledgeable and passionate about what they do. Every visit is a delightful experience!",
}

  
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
