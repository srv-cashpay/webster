import React, { useState } from "react";
import "./MenuList.css";

const MenuList = () => {
  const foods = [
    { id: 1, name: "Nasi Goreng", image: "https://via.placeholder.com/300x200" },
    { id: 2, name: "Mie Ayam", image: "https://via.placeholder.com/300x200" },
    { id: 3, name: "Sate Ayam", image: "https://via.placeholder.com/300x200" },
    { id: 4, name: "Bakso", image: "https://via.placeholder.com/300x200" },
    { id: 5, name: "Ayam Geprek", image: "https://via.placeholder.com/300x200" },
    { id: 6, name: "Es Teh Manis", image: "https://via.placeholder.com/300x200" },
    { id: 7, name: "Nasi Goreng", image: "https://via.placeholder.com/300x200" },
    { id: 8, name: "Mie Ayam", image: "https://via.placeholder.com/300x200" },
    { id: 9, name: "Sate Ayam", image: "https://via.placeholder.com/300x200" },
    { id: 10, name: "Bakso", image: "https://via.placeholder.com/300x200" },
    { id: 11, name: "Ayam Geprek", image: "https://via.placeholder.com/300x200" },
    { id: 12, name: "Es Teh Manis", image: "https://via.placeholder.com/300x200" },
  ];

  const [cart, setCart] = useState([]);

  const handleOrder = (food) => {
    const existing = cart.find((item) => item.id === food.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === food.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...food, qty: 1 }]);
    }
  };

  return (
    <div className="menu-wrapper">
      <h2 className="menu-title">Web Order</h2>

      <div className="menu-grid">
        {foods.map((item) => (
          <div key={item.id} className="menu-card">
            <img src={item.image} alt={item.name} className="menu-image" />
            <h3 className="menu-name">{item.name}</h3>
            <button className="menu-btn" onClick={() => handleOrder(item)}>
              Pesan
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <footer className="cart-footer">
          <h3>🛒 Keranjang</h3>
          <div className="cart-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <span className="cart-name">{item.name}</span>
                <span className="cart-qty">x{item.qty}</span>
              </div>
            ))}
          </div>
          <button className="checkout-btn">Checkout</button>
        </footer>
      )}
    </div>
  );
};

export default MenuList;
