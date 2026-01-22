import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./Blog.css";
import Navbar from "../../../components/navbar/Navbar";
import loginLocales from "../../../locales/loginLocales";
import { getNewsList } from "../../../services/web/news/newsApi";
import BlogSidebar from "./BlogSidebar";

export default function BlogList() {
  const navigate = useNavigate();
  const { lang } = useParams();
  const location = useLocation();

  const isEnglish = location.pathname.startsWith("/en");
  const langPrefix = isEnglish ? "/en" : "";
  const t = loginLocales[isEnglish ? "en" : "id"];

  const heroRef = useRef(null);
  const featuresRef = useRef(null);

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNewsList()
      .then(setBlogs)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="blog-container">
      <Navbar
        heroRef={heroRef}
        featuresRef={featuresRef}
        language={langPrefix}
        t={t}
      />

      <div className="blog-layout">
        {/* ===== MAIN GRID ===== */}
        <main className="blog-main">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="blog-grid">
              {blogs.map((blog) => (
                <div
                  key={blog.slug}
                  className="blog-card"
                  onClick={() =>
                    navigate(`${langPrefix}/blog/${blog.slug}`)
                  }
                >
                  <img
                    src={
                      blog.image_url ||
                      "https://via.placeholder.com/400x240?text=No+Image"
                    }
                    alt={blog.title}
                  />

                  <div className="blog-content">
                    <span className="blog-date">
                      {blog.created_at
                        ? new Date(blog.created_at).toLocaleDateString(
                            isEnglish ? "en-US" : "id-ID"
                          )
                        : ""}
                    </span>
                    <h3>{blog.title}</h3>
                    <p>{blog.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* ===== SIDEBAR ===== */}
        <BlogSidebar blogs={blogs} />
      </div>
    </div>
  );
}
