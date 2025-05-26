import React, { useState } from 'react';
import './Product.css';

const products = [
  {
    name: "Cortado",
    image: "https://i.ibb.co/G4Zt2Tvy/c-removebg-preview.png",
    price: 21.99,
    type: "Hot",
    description: "Delicious mocha coffee.",
  },
  {
    name: "Mocha",
    image: "https://i.ibb.co/B2BBm9gy/mocho-removebg-preview.png",
    price: 21.99,
    type: "Hot",
    description: "Delicious mocha coffee.",
  },
  {
    name: "Macchiato",
    image: "https://i.ibb.co/BVy3pVGh/latte-macchiato-rezept-zubereitung-glas-removebg-preview.png",
    price: 21.99,
    type: "Hot",
    description: "Delicious mocha coffee.",
  },
  {
    name: "Espresso",
    image: "https://i.ibb.co/LzB0thH7/expresso-removebg-preview.png",
    price: 21.99,
    type: "Hot",
    description: "Strong espresso shot.",
  },
  {
    name: "Caramel Latte",
    image: "https://i.ibb.co/27BcnmbC/a-delicious-caramel-latte-topped-with-whipped-cream-removebg-preview.png",
    price: 21.99,
    type: "Hot",
    description: "Caramel latte with cream.",
  },
  {
    name: "Americano",
    image: "https://i.ibb.co/JR97Z6WW/americano-removebg-preview.png",
    price: 21.99,
    type: "Hot",
    description: "Americano coffee.",
  },
  {
    name: "Cappuccino",
    image: "https://i.ibb.co/W4DWG1Z9/pngtree-delicious-cappuccino-coffee-cup-png-image-14700921-removebg-preview.png",
    price: 21.99,
    type: "Hot",
    description: "Rich cappuccino.",
  },
  {
    name: "Flat White",
    image: "https://i.ibb.co/LD1tzCmc/flatwhite-removebg-preview.png",
    price: 21.99,
    type: "Hot",
    description: "Smooth flat white.",
  },
  {
    name: "Rooibos",
    image: "https://i.ibb.co/Kx3WdSNh/Getty-Images-693893647-588d21e413dd411cb1f2b0a0ea3e02da-removebg-preview.png",
    price: 21.99,
    type: "Hot",
    description: "South African Rooibos tea.",
  },
  {
    name: "Green Tea",
    image: "https://i.ibb.co/hJp72B11/green-tea-removebg-preview.png",
    price: 21.99,
    type: "Hot",
    description: "Refreshing green tea.",
  },
  {
    name: "Ice Tea",
    image: "https://i.ibb.co/PswcJJwx/ice-tea-removebg-preview.png",
    price: 21.99,
    type: "Cold",
    description: "Cold brewed ice tea.",
  },
  {
    name: "Coca-Cola",
    image: "https://i.ibb.co/Fq0gKQNx/coke-removebg-preview.png",
    price: 21.99,
    type: "Cold",
    description: "Classic Coca-Cola.",
  },
  {
    name: "Still Water",
    image: "https://i.ibb.co/sJygJ9wY/water-removebg-preview.png",
    price: 21.99,
    type: "Cold",
    description: "Pure still water.",
  },
  {
    name: "Vanilla Iced Delight",
    image: "https://i.ibb.co/27jX7rTX/360-F-609874629-v2i98jy-RXv-HTf-Wtn-B67-P4-Za-VIVbnsox-T-removebg-preview.png",
    price: 21.99,
    type: "Cold",
    description: "Vanilla iced delight.",
  },
  {
    name: "Iced Coffee",
    image: "https://i.ibb.co/0y4GJp59/pngtree-iced-coffee-with-removebg-preview.png",
    price: 21.99,
    type: "Cold",
    description: "Chilled iced coffee.",
  },
  {
    name: "Chocolate Muffin",
    image: "https://i.ibb.co/7JpLqW8b/Chocolate-Chip-Muffins-on-a-Plate-removebg-preview.png",
    price: 21.99,
    type: "Snack",
    description: "Chocolate chip muffin.",
  },
  {
    name: "Bran Muffin",
    image: "https://i.ibb.co/816xP8T/chocolate-muffins2-removebg-preview.png",
    price: 21.99,
    type: "Snack",
    description: "Bran muffin.",
  },
  {
    name: "Pancakes",
    image: "https://i.ibb.co/xtxnGd7p/pancake-removebg-preview.png",
    price: 21.99,
    type: "Snack",
    description: "Stack of pancakes.",
  },
  {
    name: "Croissants",
    image: "https://i.ibb.co/v6MpbPTJ/croissant-removebg-preview.png",
    price: 21.99,
    type: "Snack",
    description: "Buttery croissants.",
  },
  {
    name: "Cake",
    image: "https://i.ibb.co/XZtTw8g1/cake-removebg-preview.png",
    price: 21.99,
    type: "Snack",
    description: "Slice of cake.",
  },
  {
    name: "Toast",
    image: "https://i.ibb.co/MxHC945j/toat-removebg-preview.png",
    price: 21.99,
    type: "Snack",
    description: "Crispy toast.",
  },
  {
    name: "Ham Sandwich",
    image: "https://i.ibb.co/JWGRf8c3/Ham-Sandwich-removebg-preview.png",
    price: 21.99,
    type: "Snack",
    description: "Tasty ham sandwich.",
  },
   {
    name: "Ham Sandwich",
    image: "https://i.ibb.co/Kx7hnKc8/item-600000000917076702-1642439553-removebg-preview.png",
    price: 21.99,
    type: "Snack",
    description: "Tasty ham sandwich.",
  },

];

function Product() {
  const [sugarLevels, setSugarLevels] = useState(Array(products.length).fill(0));
  const [milkTypes, setMilkTypes] = useState(Array(products.length).fill('Full Cream'));
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showOptions, setShowOptions] = useState(false);
  const [addedIndex, setAddedIndex] = useState(null);

  const categories = ['All', 'Hot', 'Cold', 'Snack'];

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

  const addToCart = (item, index) => {
    console.log("Added to cart:", item);
    setAddedIndex(index);
    setTimeout(() => setAddedIndex(null), 2000);
  };

  const filteredProducts = products.filter((item) => {
    return selectedCategory === 'All' || item.type === selectedCategory;
  });

  return (
    <div>
     
    
      <section className="coffee-categories">
         <h2 className="Coffee-header"><span>OUR</span> MENU</h2>
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

    
      <div className="product-container">
        {filteredProducts.map((item, index) => (
          <div className="product" key={index}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
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






// import React, { useEffect, useState } from 'react';

// const Product = () => {
//   const [menuItems, setMenuItems] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/menus')
//       .then((response) => {
//         if (!response.ok) {
//           // throw new Error('Failed to fetch menu data');
//             console.error('Fetch error:', error);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setMenuItems(data);
//       })
//       .catch((error) => {
//         console.error('Fetch error:', error);
//         setError(error.message);
//       });
//   }, []);

//   return (
//     <div>
//       <h2>Menu Items</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {menuItems.length === 0 ? (
//         <p>Loading menu...</p>
//       ) : (
//         <ul>
//           {menuItems.map((item) => (
//             <li key={item.itemID}>
//               <strong>{item.itemName}</strong> - {item.price} R
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Product;

