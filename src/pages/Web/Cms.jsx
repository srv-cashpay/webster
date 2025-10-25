import React, { useState } from "react";
import "./LandingPageCMS.css";

export default function LandingPageCMS() {
  const [topbar, setTopbar] = useState({
    title: "",
    contact: "",
    buttons: [""],
  });

  const [header, setHeader] = useState({
    title: "",
    subtitle: "",
    image: null,
  });

  const [features, setFeatures] = useState([
    { title: "", desc: "", image: null },
  ]);

  const [footer, setFooter] = useState({
    company: "",
    year: "",
    social: "",
  });

  // -----------------------------
  // HANDLER SECTION
  // -----------------------------
  const handleTopbarChange = (e) => {
    const { name, value } = e.target;
    setTopbar({ ...topbar, [name]: value });
  };

  const handleButtonChange = (index, e) => {
    const newButtons = [...topbar.buttons];
    newButtons[index] = e.target.value;
    setTopbar({ ...topbar, buttons: newButtons });
  };

  const addButton = () =>
    setTopbar({ ...topbar, buttons: [...topbar.buttons, ""] });

  const removeButton = (index) =>
    setTopbar({
      ...topbar,
      buttons: topbar.buttons.filter((_, i) => i !== index),
    });

  const handleHeaderChange = (e) => {
    const { name, value, files } = e.target;
    setHeader({ ...header, [name]: files ? files[0] : value });
  };

  const handleFeatureChange = (index, e) => {
    const { name, value, files } = e.target;
    const newFeatures = [...features];
    newFeatures[index][name] = files ? files[0] : value;
    setFeatures(newFeatures);
  };

  const addFeature = () =>
    setFeatures([...features, { title: "", desc: "", image: null }]);

  const removeFeature = (index) =>
    setFeatures(features.filter((_, i) => i !== index));

  const handleFooterChange = (e) => {
    const { name, value } = e.target;
    setFooter({ ...footer, [name]: value });
  };

  const handleSaveAll = () => {
    const payload = { topbar, header, features, footer };
    console.log("📦 Data CMS:", payload);
    alert("✅ Data berhasil disimpan! (Cek console)");
  };

  // -----------------------------
  // UI SECTION
  // -----------------------------
  return (
    <div className="cms-container">
      {/* Topbar */}
      <section className="cms-section">
        <h2 className="cms-section-title">🧭 Topbar</h2>
        <input
          type="text"
          name="title"
          value={topbar.title}
          onChange={handleTopbarChange}
          placeholder="Judul kecil"
          className="cms-input"
        />
        <input
          type="text"
          name="contact"
          value={topbar.contact}
          onChange={handleTopbarChange}
          placeholder="Kontak / Email"
          className="cms-input"
        />

        <h4 className="cms-subtitle">Teks Tombol</h4>
        {topbar.buttons.map((btn, i) => (
          <div key={i} className="cms-feature-card">
            <input
              type="text"
              value={btn}
              onChange={(e) => handleButtonChange(i, e)}
              placeholder={`Teks tombol ${i + 1}`}
              className="cms-input"
            />
            <button
              type="button"
              onClick={() => removeButton(i)}
              className="cms-btn-delete"
            >
              ✖
            </button>
          </div>
        ))}
        <button onClick={addButton} className="cms-btn-add">
          ➕ Tambah Teks Tombol
        </button>
      </section>

      {/* Header */}
      <section className="cms-section">
        <h2 className="cms-section-title">🏠 Header</h2>
        <input
          type="text"
          name="title"
          value={header.title}
          onChange={handleHeaderChange}
          placeholder="Judul utama"
          className="cms-input"
        />
        <input
          type="text"
          name="subtitle"
          value={header.subtitle}
          onChange={handleHeaderChange}
          placeholder="Subjudul"
          className="cms-input"
        />
        <input
          type="file"
          name="image"
          onChange={handleHeaderChange}
          className="cms-file"
        />
        {header.image && (
          <img
            src={URL.createObjectURL(header.image)}
            alt="preview"
            className="cms-preview"
          />
        )}
      </section>

      {/* Features */}
      <section className="cms-section">
        <h2 className="cms-section-title">⚙️ Fitur</h2>
        {features.map((feature, i) => (
          <div key={i} className="cms-feature-card">
            <input
              name="title"
              value={feature.title}
              onChange={(e) => handleFeatureChange(i, e)}
              placeholder={`Judul fitur ${i + 1}`}
              className="cms-input"
            />
            <textarea
              name="desc"
              value={feature.desc}
              onChange={(e) => handleFeatureChange(i, e)}
              placeholder="Deskripsi fitur"
              className="cms-textarea"
            ></textarea>
            <input
              type="file"
              name="image"
              onChange={(e) => handleFeatureChange(i, e)}
              className="cms-file"
            />
            {feature.image && (
              <img
                src={URL.createObjectURL(feature.image)}
                alt="preview"
                className="cms-preview"
              />
            )}
            <button
              type="button"
              onClick={() => removeFeature(i)}
              className="cms-btn-delete"
            >
              ✖ Hapus Fitur
            </button>
          </div>
        ))}
        <button onClick={addFeature} className="cms-btn-add">
          ➕ Tambah Fitur
        </button>
      </section>

      {/* Footer */}
      <section className="cms-section">
        <h2 className="cms-section-title">🦶 Footer</h2>
        <input
          type="text"
          name="company"
          value={footer.company}
          onChange={handleFooterChange}
          placeholder="Nama perusahaan"
          className="cms-input"
        />
        <input
          type="text"
          name="year"
          value={footer.year}
          onChange={handleFooterChange}
          placeholder="Tahun (misal: 2025)"
          className="cms-input"
        />
        <input
          type="text"
          name="social"
          value={footer.social}
          onChange={handleFooterChange}
          placeholder="Link sosial media"
          className="cms-input"
        />
      </section>

      <button onClick={handleSaveAll} className="cms-btn-save">
        💾 Simpan Semua
      </button>
    </div>
  );
}
