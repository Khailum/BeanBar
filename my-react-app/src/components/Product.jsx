import React, { useEffect, useState } from 'react';
import './Product.css';

function Product() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [sugarLevels, setSugarLevels] = useState([]);
  const [milkTypes, setMilkTypes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showOptions, setShowOptions] = useState(false);
  const [addedIndex, setAddedIndex] = useState(null);

  const categories = ['All', 'Hot', 'Cold', 'Snack'];

  useEffect(() => {
    fetch('http://localhost:5000/api/menu') // your C# API endpoint
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch');
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setSugarLevels(Array(data.length).fill(0));
        setMilkTypes(Array(data.length).fill('Full Cream'));
      })
      .catch(err => {
        setError(err.message);
        console.error(err);
      });
  }, []);

  const increaseSugar = (index) => {
    const levels = [...sugarLevels];
    if (levels[index] < 3) levels[index] += 1;
    setSugarLevels(levels);
  };

  const decreaseSugar = (index) => {
    const levels = [...sugarLevels];
    if (levels[index] > 0) levels[index] -= 1;
    setSugarLevels(levels);
  };

  const handleMilkChange = (index, value) => {
    const newMilk = [...milkTypes];
    newMilk[index] = value;
    setMilkTypes(newMilk);
  };

  const addToCart = (item, index) => {
    console.log('Added to cart:', item);
    setAddedIndex(index);
    setTimeout(() => setAddedIndex(null), 2000);
  };

  const filteredProducts = products.filter((item) =>
    selectedCategory === 'All' || item.type === selectedCategory
  );

  return (
    <div>
      <section className="coffee-categories">
        <h2 className="Coffee-header"><span>OUR</span> MENU</h2>
        <button className="filter-btn" onClick={() => setShowOptions(!showOptions)}>
          Filter: {selectedCategory}
        </button>
        {showOptions && (
          <div className="dropdown">
            {categories.map(category => (
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

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="product-container">
        {filteredProducts.map((item, index) => (
          <div className="product" key={index}>
            <img src={item.imageUrl} alt={item.itemName} />
            <h3>{item.itemName}</h3>
            <p>{item.description}</p>
            <div className="price">R {item.price.toFixed(2)}</div>

            {item.type === 'Hot' && (
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
            )}

            <button
              className={`button ${addedIndex === index ? 'added' : ''}`}
              onClick={() => addToCart(item, index)}
            >
              {addedIndex === index ? '✔ Added' : 'Add To Cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
