import React, { useState } from "react";
import './Products.css';

const products = [
  {
    name: "Mocha",
    image: "https://i.ibb.co/B2BBm9gy/mocho-removebg-preview.png",
    price: 21.99,
    type: "Hot",
    description: "Delicious mocha coffee.",
  },
  {
    name: "Iced Coffee",
    image: "https://i.ibb.co/0y4GJp59/pngtree-iced-coffee-with-removebg-preview.png",
    price: 21.99,
    type: "Cold",
    description: "Chilled iced coffee.",
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
    name: "Vanilla Iced Delight",
    image: "https://i.ibb.co/27jX7rTX/360-F-609874629-v2i98jy-RXv-HTf-Wtn-B67-P4-Za-VIVbnsox-T-removebg-preview.png",
    price: 21.99,
    type: "Cold",
    description: "Vanilla iced delight.",
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
];

function Product() {
  const [quantities, setQuantities] = useState(Array(products.length).fill(0));
  const [sugarLevels, setSugarLevels] = useState(Array(products.length).fill(0));
  const [milkTypes, setMilkTypes] = useState(Array(products.length).fill("Full Cream"));
  const [selectedTypes, setSelectedTypes] = useState(Array(products.length).fill(""));

  const isSnackWithTypeOptions = (name) => {
    return ["Cake", "Chocolate Muffin", "Bran Muffin", "Toast", "Croissants", "Ham Sandwich"].includes(name);
  };

  const getSnackOptions = (name) => {
    switch (name) {
      case "Cake":
        return ["Chocolate", "Red Velvet", "Cheesecake"];
      case "Chocolate Muffin":
      case "Bran Muffin":
        return ["Choc Chip", "Blueberry", "Bran"];
      case "Toast":
        return ["Butter", "Avocado", "Jam"];
      case "Croissants":
        return ["Plain", "Cheese", "Chocolate"];
      case "Ham Sandwich":
        return ["With Cheese", "No Cheese", "Extra Ham"];
      default:
        return [];
    }
  };

  const handleQuantity = (index, type) => {
    const updated = [...quantities];
    updated[index] = type === "inc" ? updated[index] + 1 : Math.max(0, updated[index] - 1);
    setQuantities(updated);
  };

  const handleSugar = (index, type) => {
    const updated = [...sugarLevels];
    updated[index] = type === "inc" ? updated[index] + 1 : Math.max(0, updated[index] - 1);
    setSugarLevels(updated);
  };

  const handleMilkChange = (index, value) => {
    const updated = [...milkTypes];
    updated[index] = value;
    setMilkTypes(updated);
  };

  const handleTypeChange = (index, value) => {
    const updated = [...selectedTypes];
    updated[index] = value;
    setSelectedTypes(updated);
  };

  return (
    <div className="product-container">
      {products.map((item, index) => (
        <div key={index} className="product-card">
          <img src={item.image} alt={item.name} />
          <h3>{item.name}</h3>
          <p>R {item.price.toFixed(2)}</p>

          <div className="input-group">
            {isSnackWithTypeOptions(item.name) ? (
              <>
                <label>Type:</label>
                <select value={selectedTypes[index]} onChange={(e) => handleTypeChange(index, e.target.value)}>
                  <option value="">Select</option>
                  {getSnackOptions(item.name).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <>
                <label>Sugar:</label>
                <div className="quantity-controls">
                  <button onClick={() => handleSugar(index, "dec")}>−</button>
                  <input type="number" value={sugarLevels[index]} readOnly />
                  <button onClick={() => handleSugar(index, "inc")}>+</button>
                </div>

                <label>Milk Type:</label>
                <select value={milkTypes[index]} onChange={(e) => handleMilkChange(index, e.target.value)}>
                  <option value="Full Cream">Full Cream</option>
                  <option value="Low Fat">Low Fat</option>
                  <option value="Almond">Almond</option>
                  <option value="Soy">Soy</option>
                  <option value="Oat">Oat</option>
                </select>
              </>
            )}
          </div>

          <div className="quantity-controls">
            <button onClick={() => handleQuantity(index, "dec")}>−</button>
            <input type="number" value={quantities[index]} readOnly />
            <button onClick={() => handleQuantity(index, "inc")}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Product;
