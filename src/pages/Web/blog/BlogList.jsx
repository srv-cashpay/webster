import React, { useRef } from "react";
import { useNavigate, useParams} from "react-router-dom";
import "./Blog.css";
import xl from "../../../../src/assets/xl.png";
import head from "../../../../src/assets/head.webp";
import text from "../../../locales/text";
import Navbar from "../../../components/navbar/Navbar";


const blogs = [
  
    { id: 1, title: "Cara Top Up Game dengan Mudah",image: xl, excerpt: "Pelajari cara top up game favoritmu dengan cepat dan aman", date: "18 Des 2025" },
    { id: 2, title: "Keuntungan Pakai CashPay",image: head, excerpt: "Kenapa CashPay jadi pilihan terbaik untuk pembayaran digital", date: "17 Des 2025" },
    
  ];

export default function BlogList() {
    const navigate = useNavigate();
    const { lang } = useParams();
    const language = lang === "en" ? "en" : "id";
    const t = text[language];
     const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const priceRef = useRef(null);

  return (
    <div className="blog-container">
      <Navbar
                    heroRef={heroRef}
                    featuresRef={featuresRef}
                    aboutRef={aboutRef}
                    priceRef={priceRef}
                    language={language}
                    t={t}
                  />
      <h1 className="blog-title">{t.features}</h1>

      <div className="blog-grid">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="blog-card"
            onClick={() => navigate(`/${language}/blog/${blog.id}`)}
          >
            <img src={blog.image} alt={blog.title} />
            <div className="blog-content">
              <span className="blog-date">{blog.date}</span>
              <h3>{blog.title}</h3>
              <p>{blog.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
