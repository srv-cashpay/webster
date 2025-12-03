// HardwareGrid.jsx
import React from "react";
import "./hardwarepage.css";

const hardware = [
  {
    name: "Tablet Android 10\"",
    specs: "RAM 4GB · ROM 64GB · 6000mAh",
    img: "https://p16-images-sign-sg.tokopedia-static.net/tos-alisg-i-aphluv4xwc-sg/ef79a54dea724a37aff7189a64fd3695~tplv-aphluv4xwc-white-pad-v1:1600:1600.jpeg?lk3s=0ccea506&x-expires=1764747153&x-signature=ek8iBsl9mMowykSIFXiLRIIGAeo%3D&x-signature-webp=YPY3o3UB5DfPLzLqrFa7TW0cS%2FA%3D://via.placeholder.com/300x200",
  },
  {
    name: "Printer Thermal 58mm",
    specs: "USB · Bluetooth · Auto Cut",
    img: "https://p16-images-sign-sg.tokopedia-static.net/tos-alisg-i-aphluv4xwc-sg/img/VqbcmM/2023/11/10/bb3c6674-3011-4a05-8499-e03efda1b2a0.jpg~tplv-aphluv4xwc-white-pad-v1:1600:1600.jpeg?lk3s=0ccea506&x-expires=1764747064&x-signature=HWuqpOlNdE9vOAD97ksMIxw53Z8%3D&x-signature-webp=eUJDAI%2B4V7yuVZgvA5hGQ1gwNkE%3D",
  },
  {
    name: "Tablet Android 8\"",
    specs: "RAM 3GB · ROM 32GB · 5000mAh",
    img: "https://via.placeholder.com/300x200",
  },
  {
    name: "Printer Kasir 80mm",
    specs: "USB · LAN · Auto Cut",
    img: "https://via.placeholder.com/300x200",
  },
];

export default function HardwareGrid() {
  return (
    <div className="hardware-container">
      <h1 className="hardware-title">Hardware CashPay</h1>

      <div className="hardware-grid">
        {hardware.map((item, index) => (
          <div key={index} className="hardware-card">
            <img src={item.img} alt={item.name} className="hardware-img" />

            <h2 className="hardware-name">{item.name}</h2>
            <p className="hardware-specs">{item.specs}</p>

            <button className="hardware-btn">Detail</button>
          </div>
        ))}
      </div>
    </div>
  );
}
