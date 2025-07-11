import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

function Product() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [sugarLevels, setSugarLevels] = useState({});
  const [milkTypes, setMilkTypes] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showOptions, setShowOptions] = useState(false);
  const [addedIndex, setAddedIndex] = useState(null);

  const categories = ['All', 'Hot', 'Cold', 'Snack'];

  useEffect(() => {
    fetch('https://localhost:7233/api/Menus')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch menu');
        return response.json();
      })
      .then(data => {
        const normalizedMenu = data.map(item => ({
          ...item,
          itemType: (item.ItemType || '').toLowerCase(),
        }));

        setProducts(normalizedMenu);

        const sugarInit = {};
        const milkInit = {};
        normalizedMenu.forEach(item => {
          const id = item.ItemID;
          sugarInit[id] = 0;
          milkInit[id] = 'Full Cream';
        });
        setSugarLevels(sugarInit);
        setMilkTypes(milkInit);
      })
      .catch(err => {
        setError(err.message);
        console.error('Fetch error:', err);
      });
  }, []);

  const increaseSugar = (id) => {
    setSugarLevels(prev => ({
      ...prev,
      [id]: Math.min((prev[id] || 0) + 1, 3),
    }));
  };

  const decreaseSugar = (id) => {
    setSugarLevels(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  const handleMilkChange = (id, value) => {
    setMilkTypes(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const addToCart = async (item) => {
    const id = item.ItemID;
    const sugarLevel = sugarLevels[id];
    const milkType = item.itemType === 'hot' ? milkTypes[id] : null;

    try {
      const res = await fetch('https://localhost:7233/api/Cart');
      if (!res.ok) throw new Error('Failed to fetch cart');

      const cartItems = await res.json();

      const existingItem = cartItems.find(cartItem =>
        cartItem.ItemName === item.ItemName &&
        cartItem.sugarLevel === sugarLevel &&
        cartItem.milkType === milkType
      );

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };

        await fetch(`https://localhost:7233/api/Cart/${existingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedItem),
        });
      } else {
        const newItem = {
          ...item,
          sugarLevel,
          milkType,
          quantity: 1,
        };

        await fetch('https://localhost:7233/api/Cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newItem),
        });
      }

      setAddedIndex(id);
      setTimeout(() => setAddedIndex(null), 2000);
    } catch (error) {
      console.error('Add to cart error:', error);
      alert('Unable to add item. Please try again later.');
    }
  };

  const filteredProducts = products.filter(
    item => selectedCategory.toLowerCase() === 'all' || item.itemType === selectedCategory.toLowerCase()
  );

  return (
    <div>
      <nav>
        <Link to="/cart" className="cart-link">Go to Cart</Link>
      </nav>

      <section className="coffee-categories">
        <h2 className="Coffee-header"><span>OUR</span> MENU</h2>
        <button
          className="filter-btn"
          onClick={() => setShowOptions(!showOptions)}
          aria-haspopup="listbox"
          aria-expanded={showOptions}
          aria-label="Filter products by category"
          type="button"
        >
          Filter: {selectedCategory}
        </button>
        {showOptions && (
          <div className="dropdown" role="listbox" tabIndex={-1}>
            {categories.map(category => (
              <div
                key={category}
                className={`dropdown-item ${selectedCategory === category ? 'active' : ''}`}
                role="option"
                aria-selected={selectedCategory === category}
                tabIndex={0}
                onClick={() => {
                  setSelectedCategory(category);
                  setShowOptions(false);
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedCategory(category);
                    setShowOptions(false);
                  }
                }}
              >
                {category}
              </div>
            ))}
          </div>
        )}
      </section>

      {error && <p className="error-message">⚠ {error}</p>}

      <div className="product-container">
        {filteredProducts.map((item) => {
          const id = item.ItemID;
          return (
            <div className="product" key={id}>
              <img src={item.ImageUrl} alt={item.ItemName} />
              <h3>{item.ItemName}</h3>
              <p>{item.ItemDescription}</p>
              <div className="price">R {item.Price.toFixed(2)}</div>

              {item.itemType === 'hot' && (
                <div className="input-group">
                  <label htmlFor={`sugar-${id}`}>Sugar:</label>
                  <div className="quantity-controls">
                    <button
                      className="qty-btn"
                      aria-label={`Decrease sugar for ${item.ItemName}`}
                      onClick={() => decreaseSugar(id)}
                      type="button"
                    >
                      −
                    </button>
                    <input
                      id={`sugar-${id}`}
                      type="number"
                      className="number"
                      value={sugarLevels[id] || 0}
                      readOnly
                      aria-live="polite"
                    />
                    <button
                      className="qty-btn"
                      aria-label={`Increase sugar for ${item.ItemName}`}
                      onClick={() => increaseSugar(id)}
                      type="button"
                    >
                      +
                    </button>
                  </div>

                  <label htmlFor={`milk-${id}`}>Milk Type:</label>
                  <select
                    id={`milk-${id}`}
                    value={milkTypes[id] || 'Full Cream'}
                    onChange={(e) => handleMilkChange(id, e.target.value)}
                    aria-label={`Select milk type for ${item.ItemName}`}
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
                className={`button ${addedIndex === id ? 'added' : ''}`}
                onClick={() => addToCart(item)}
                type="button"
                aria-live="polite"
              >
                {addedIndex === id ? '✔ Added' : 'Add To Cart'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Product;
