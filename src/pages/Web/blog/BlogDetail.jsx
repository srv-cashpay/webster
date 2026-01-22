import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./BlogDetail.css";
import Navbar from "../../../components/navbar/Navbar";
import BlogSidebar from "./BlogSidebar";

const API_URL = "https://api.cashpay.co.id/web/news";

export default function BlogDetail() {
  const { slug } = useParams();
  const location = useLocation();
  const isEnglish = location.pathname.startsWith("/en");

  const t = isEnglish
    ? { comment: "Comments" }
    : { comment: "Komentar" };

  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const priceRef = useRef(null);

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/${slug}`)
      .then((res) => res.json())
      .then((res) => {
        if (res?.status) setBlog(res.data);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p style={{ padding: 40 }}>Loading...</p>;
  if (!blog) return <p style={{ padding: 40 }}>Blog tidak ditemukan</p>;

  return (
    <>
      <Navbar
        heroRef={heroRef}
        featuresRef={featuresRef}
        aboutRef={aboutRef}
        priceRef={priceRef}
        t={t}
      />

      <div className="blog-detail-layout">
        {/* CONTENT */}
        <article className="blog-detail">
          {blog.tag && <span className="blog-tag">{blog.tag}</span>}
          <h1 className="blog-title">{blog.title}</h1>

          <div className="blog-meta">
            <span>
              {new Date(blog.created_at || Date.now()).toLocaleDateString(
                isEnglish ? "en-US" : "id-ID",
                { day: "numeric", month: "long", year: "numeric" }
              )}
            </span>
            {blog.created_by && <span>• {blog.created_by}</span>}
          </div>

          <img
            src={
              blog.file_path
                ? `https://api.cashpay.co.id/web/${blog.file_path}`
                : "https://via.placeholder.com/800x400"
            }
            alt={blog.title}
            className="blog-detail-img"
          />

          <div
            className="blog-body"
            dangerouslySetInnerHTML={{ __html: blog.body }}
          />

          {/* COMMENTS */}
          {blog.Comments?.length > 0 && (
            <div className="blog-comments">
              <h3>{t.comment}</h3>

              {blog.Comments.map((c) => (
                <div key={c.ID} className="comment-item">
                  <div className="comment-header">
                    <strong>{c.Name}</strong>
                    <span>
                      {new Date(c.CreatedAt).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                  <p>{c.Comment}</p>
                </div>
              ))}
            </div>
          )}
        </article>

        {/* SIDEBAR */}
        <BlogSidebar />
      </div>
    </>
  );
}
