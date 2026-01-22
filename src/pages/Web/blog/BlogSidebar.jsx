import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BlogSidebar.css";

export default function BlogSidebar({ blogs = [] }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isEnglish = location.pathname.startsWith("/en");
  const langPrefix = isEnglish ? "/en" : "";

  return (
    <aside className="blog-sidebar">
      {/* SEARCH */}
      <div className="sidebar-section">
        <h4>Cari Artikel</h4>
        <input
          type="text"
          placeholder="Cari blog..."
          className="sidebar-search"
        />
      </div>

      {/* CATEGORY */}
      <div className="sidebar-section">
        <h4>Kategori</h4>
        <ul className="sidebar-category">
          <li>Top Up Game</li>
          <li>Pembayaran Digital</li>
          <li>Promo & Tips</li>
          <li>Berita Teknologi</li>
        </ul>
      </div>

      {/* LATEST POST */}
      <div className="sidebar-section">
        <h4>Artikel Terbaru</h4>

        {blogs.slice(0, 5).map((blog) => (
          <div
            key={blog.slug}
            className="sidebar-post"
            onClick={() =>
              navigate(`${langPrefix}/blog/${blog.slug}`)
            }
          >
            <img
              src={
                blog.image_url ||
                "https://via.placeholder.com/80x80?text=No+Image"
              }
              alt={blog.title}
            />
            <span>{blog.title}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
