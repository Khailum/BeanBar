import React from 'react';
import './Products.css';

const products = [
  {
    name:"creammy",
    image:"https://i.ibb.co/B2BBm9gy/mocho-removebg-preview.png",
    price:"R21.99",
    description:"",
  },
   {
    name:"creammy",
    image:"https://i.ibb.co/0y4GJp59/pngtree-iced-coffee-with-removebg-preview.png",
    price:"R21.99",
    description:"",
  },
   {
    name:"creammy",
    image:"https://i.ibb.co/LzB0thH7/expresso-removebg-preview.png",
    price:"R21.99",
    description:"",
  },
   {
    name:"creammy",
    image:"https://i.ibb.co/27BcnmbC/a-delicious-caramel-latte-topped-with-whipped-cream-removebg-preview.png",
    price:"R21.99",
    description:"",
  }, {
    name:"creammy",
    image:"https://i.ibb.co/27jX7rTX/360-F-609874629-v2i98jy-RXv-HTf-Wtn-B67-P4-Za-VIVbnsox-T-removebg-preview.png",
    price:"R21.99",
    description:"",
  }, {
    name:"creammy",
    image:"https://i.ibb.co/B2BBm9gy/mocho-removebg-preview.png",
    price:"R21.99",
    description:"",
  }, {
    name:"creammy",
    image:"https://i.ibb.co/B2BBm9gy/mocho-removebg-preview.png",
    price:"R21.99",
    description:"",
  }, {
    name:"creammy",
    image:"https://i.ibb.co/B2BBm9gy/mocho-removebg-preview.png",
    price:"R21.99",
    description:"",
  },
   {
    name:"creammy",
    image:"https://i.ibb.co/B2BBm9gy/mocho-removebg-preview.png",
    price:"R21.99",
    description:"",
  },
     {
    name:"creammy",
    image:"https://i.ibb.co/B2BBm9gy/mocho-removebg-preview.png",
    price:"R21.99",
    description:"",
  },
  
  
]

function Product() {
  return (
    <>

    <div className="product-container">   
      {products.map((item, index) => (
        <div className="product" key={index}>
          <img src={item.image} alt={item.name} />
          <h3>{item.name}</h3>
          <div className="price">
            {item.price} <span>{item.oldPrice}</span>
          </div>
     <div className="input-group">
  <label For="sugar">Sugar:</label>
  <input type="number" id="sugar" min="0" max="3" defaultValue={0}/>
</div>

<div className="input-group">
  <label For="milk">Milk:</label>
  <select id="milk">
    <option value="no-milk">No Milk</option>
    <option value="full-cream">Full Cream</option>
    <option value="low-fat">Low Fat</option>
    <option value="almond">Almond Milk</option>
  </select>
</div>

          
          <a href="#" className="button">Add To Cart</a>
        </div>
      ))}
    </div>
    
    </>
    
  );
}

export default Product;
