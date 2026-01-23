import React, { useState } from "react"
import { createNews } from "../../services/web/news/newsApi"
import "./LandingPageCMS.css"

export default function BlogCMS() {
  const [post, setPost] = useState({
    tag: "",
    title: "",
    body: "",
    excerpt: "",
    status: "published",
    image: null,
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setPost({
      ...post,
      [name]: files ? files[0] : value,
    })
  }

  const handleSave = async () => {
  try {
    await createNews(post);
    alert("✅ Artikel berhasil disimpan");

    setPost({
      tag: "",
      title: "",
      body: "",
      excerpt: "",
      status: "published",
      image: null,
    });
  } catch (err) {
    alert("❌ Gagal menyimpan artikel");
  }
};

  return (
    <div className="cms-container">
      <section className="cms-section">
        <h2>📰 Artikel</h2>

        <input
          className="cms-input"
          name="title"
          value={post.title}
          onChange={handleChange}
          placeholder="Judul Artikel"
        />

        <input
          className="cms-input"
          name="tag"
          value={post.tag}
          onChange={handleChange}
          placeholder="Tag"
        />

        <select
          className="cms-select"
          name="status"
          value={post.status}
          onChange={handleChange}
        >
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </section>

      <section className="cms-section">
        <h2>✍️ Konten</h2>

        <textarea
          className="cms-textarea"
          name="excerpt"
          value={post.excerpt}
          onChange={handleChange}
          placeholder="Excerpt"
        />

        <textarea
          className="cms-textarea"
          name="body"
          value={post.body}
          onChange={handleChange}
          placeholder="Body berita"
        />
      </section>

      <section className="cms-section">
        <h2>🖼 Thumbnail</h2>

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

        {post.image && (
          <img
            src={URL.createObjectURL(post.image)}
            alt="preview"
            className="cms-preview"
          />
        )}
      </section>

      <button onClick={handleSave} className="cms-btn-save">
        💾 Simpan Artikel
      </button>
    </div>
  )
}
