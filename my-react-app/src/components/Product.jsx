import React, { useState } from 'react';
import './Products.css';

const products = [
  {
    name: "Creammy",
    image: "https://i.ibb.co/B2BBm9gy/mocho-removebg-preview.png",
    price: "R21.99",
    type: "hot",
    description: "Delicious mocha coffee.",
  },
  {
    name: "Creammy",
    image: "https://i.ibb.co/0y4GJp59/pngtree-iced-coffee-with-removebg-preview.png",
    price: "R21.99",
    type: "cold",
    description: "Chilled iced coffee.",
  },
  {
    name: "Creammy",
    image: "https://i.ibb.co/LzB0thH7/expresso-removebg-preview.png",
    price: "R21.99",
    type: "snack",
    description: "Strong espresso shot.",
  },
  {
    name: "Creammy",
    image: "https://i.ibb.co/27BcnmbC/a-delicious-caramel-latte-topped-with-whipped-cream-removebg-preview.png",
    price: "R21.99",
    type: "hot",
    description: "Caramel latte with cream.",
  },
  {
    name: "Creammy",
    image: "https://i.ibb.co/27jX7rTX/360-F-609874629-v2i98jy-RXv-HTf-Wtn-B67-P4-Za-VIVbnsox-T-removebg-preview.png",
    price: "R21.99",
    type: "cold",
    description: "Vanilla iced delight.",
  },
  // Add more items if needed
];

function Product() {
  const [sugarLevels, setSugarLevels] = useState(Array(products.length).fill(0));
  const [milkTypes, setMilkTypes] = useState(Array(products.length).fill('Full Cream'));
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showOptions, setShowOptions] = useState(false);

  const categories = ['All', 'hot', 'cold', 'snack'];

  const increaseSugar = (index) => {
    setSugarLevels((prev) => {
      const newLevels = [...prev];
      if (newLevels[index] < 3) newLevels[index] += 1;
      return newLevels;
    });
  };

  const decreaseSugar = (index) => {
    setSugarLevels((prev) => {
      const newLevels = [...prev];
      if (newLevels[index] > 0) newLevels[index] -= 1;
      return newLevels;
    });
  };

  const handleMilkChange = (index, value) => {
    setMilkTypes((prev) => {
      const newMilk = [...prev];
      newMilk[index] = value;
      return newMilk;
    });
  };

  const filteredProducts = products.filter((item) => {
    return selectedCategory === 'All' || item.type === selectedCategory;
  });

  return (
    <div>
      <h4>Menu</h4>
      <section className="coffee-categories">
        <button className="filter-btn" onClick={() => setShowOptions(!showOptions)}>
          Filter: {selectedCategory}
        </button>

        {showOptions && (
          <div className="dropdown">
            {categories.map((category) => (
              <div
                key={category}
                className={`dropdown-item ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(category);
                  setShowOptions(false);
                }}
              >
                {category}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Products Display */}
      <div className="product-container">
        {filteredProducts.map((item, index) => (
          <div className="product" key={index}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <div className="price">{item.price}</div>

            <div className="input-group">
              <label>Sugar:</label>
              <div className="quantity-controls">
                <button className="qty-btn" onClick={() => decreaseSugar(index)}>−</button>
                <input type="number" className="number" value={sugarLevels[index]} readOnly />
                <button className="qty-btn" onClick={() => increaseSugar(index)}>+</button>
              </div>

              <label htmlFor={`milk-${index}`}>Milk Type:</label>
              <select
                id={`milk-${index}`}
                value={milkTypes[index]}
                onChange={(e) => handleMilkChange(index, e.target.value)}
              >
                <option value="Full Cream">Full Cream</option>
                <option value="Low Fat">Low Fat</option>
                <option value="Almond">Almond</option>
                <option value="Soy">Soy</option>
                <option value="Oat">Oat</option>
              </select>
            </div>

            <a href="#" className="button">Add To Cart</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
