import React from "react";
import "./About.css";

export default function About({ aboutRef, t }) {
  return (
    <section ref={aboutRef} className="section features">
      <h2>{t.ourFeatures}</h2>

      <div className="feature-grid">
        <div className="feature-card">
          <h3>{t.f1}</h3>
          <p>{t.f1desc}</p>
        </div>
        <div className="feature-card">
          <h3>{t.f2}</h3>
          <p>{t.f2desc}</p>
        </div>
        <div className="feature-card">
          <h3>{t.f3}</h3>
          <p>{t.f3desc}</p>
        </div>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <h3>{t.f4}</h3>
          <p>{t.f1desc}</p>
        </div>
        <div className="feature-card">
          <h3>{t.f5}</h3>
          <p>{t.f2desc}</p>
        </div>
        <div className="feature-card">
          <h3>{t.f6}</h3>
          <p>{t.f3desc}</p>
        </div>
      </div>
    </section>
  );
}
