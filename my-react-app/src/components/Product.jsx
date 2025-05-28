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
    fetch('http://localhost:5000/menu')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch');
        return response.json();
      })
      .then(data => {
        setProducts(data.menu || data);
        setSugarLevels(Array((data.menu || data).length).fill(0));
        setMilkTypes(Array((data.menu || data).length).fill('Full Cream'));
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

  const addToCart = async (item, index) => {
    const sugarLevel = sugarLevels[index];
    const milkType = item.type === 'Hot' ? milkTypes[index] : null;

    try {
      const cartRes = await fetch('http://localhost:5000/cart');
      const cartItems = await cartRes.json();

      const existingItem = cartItems.find(cartItem =>
        cartItem.ItemName === item.ItemName &&
        cartItem.sugarLevel === sugarLevel &&
        cartItem.milkType === milkType
      );

      if (existingItem) {
        // Update quantity
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };

        await fetch(`http://localhost:5000/cart/${existingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedItem),
        });

        console.log('Updated quantity for:', existingItem.ItemName);
      } else {
        // Add new item
        const newItem = {
          ...item,
          sugarLevel,
          milkType,
          quantity: 1,
        };

        await fetch('http://localhost:5000/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newItem),
        });

        console.log('Added new item:', newItem.ItemName);
      }

      setAddedIndex(index);
      setTimeout(() => setAddedIndex(null), 2000);
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add item to cart. Please try again.');
    }
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
            <img src={item.ImageUrl} alt={item.ItemName} />
            <h3>{item.ItemName}</h3>
            <p>{item.ItemDescription}</p>
            <div className="price">R {item.Price.toFixed(2)}</div>

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
