import React, { useState } from "react";
import "./LandingPageCMS.css";

export default function BlogCMS() {
  const [post, setPost] = useState({
    title: "",
    slug: "",
    category: "",
    author: "",
    status: "draft",
    excerpt: "",
    content: "",
    thumbnail: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setPost({
      ...post,
      [name]: files ? files[0] : value,
    });
  };

  const handleSave = () => {
    const payload = {
      ...post,
      thumbnail: post.thumbnail?.name,
    };
    console.log("📰 Blog Post Data:", payload);
    alert("✅ Artikel berhasil disimpan (cek console)");
  };

  return (
    <div className="cms-container">
      {/* Basic Info */}
      <section className="cms-section">
        <h2 className="cms-section-title">📰 Artikel</h2>

        <input
          className="cms-input"
          name="title"
          value={post.title}
          onChange={handleChange}
          placeholder="Judul Artikel"
        />

        <select
          className="cms-select"
          name="category"
          value={post.category}
          onChange={handleChange}
        >
          <option value="">Pilih Kategori</option>
          <option value="news">News</option>
          <option value="blog">Blog</option>
          <option value="tech">Tech</option>
          <option value="business">Business</option>
        </select>

        <select
          className="cms-select"
          name="status"
          value={post.status}
          onChange={handleChange}
        >
          <option value="draft">Draft</option>
          <option value="publisher">Publish</option>
        </select>
      </section>

      {/* Content */}
      <section className="cms-section">
        <h2 className="cms-section-title">✍️ Konten</h2>

        <textarea
          className="cms-textarea"
          name="excerpt"
          value={post.excerpt}
          onChange={handleChange}
          placeholder="Ringkasan singkat (excerpt)"
        />

        <textarea
          className="cms-textarea"
          name="content"
          value={post.content}
          onChange={handleChange}
          placeholder="Isi artikel lengkap"
        />
      </section>

      {/* Thumbnail */}
      <section className="cms-section">
        <h2 className="cms-section-title">🖼 Thumbnail</h2>

        <input
          type="file"
          name="thumbnail"
          className="cms-file"
          onChange={handleChange}
        />

        {post.thumbnail && (
          <img
            src={URL.createObjectURL(post.thumbnail)}
            alt="preview"
            className="cms-preview"
          />
        )}
      </section>

      <button onClick={handleSave} className="cms-btn-save">
        💾 Simpan Artikel
      </button>
    </div>
  );
}
