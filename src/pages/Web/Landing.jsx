import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./LandingPage.css";
import text from "../../locales/text";
import ChatWidget from "../../components/widget/ChatWidget";
import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/hero/Hero";
import About from "../../components/about/About";
import Footer from "../../components/footer/Footer";
import FAQ from "../../components/faq/FAQ";
import TrackingList from "../../components/tracking/TrackingList";
import { trackPackage } from "../../services/tracking/trackingApi";
import addImage from "../../assets/add.png";
// import scanImage from "../../assets/scan1.png";
// import dashboard1 from "../../assets/dashboard1.png";


export default function LandingPage() {
  const heroRef = useRef(null);
  // const aboutRef = useRef(null);
  // const priceRef = useRef(null);
  const trackingRef = useRef(null);
  const faqRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { lang } = useParams();

  const language = location.pathname.startsWith("/en") ? "en" : "id";
  const t = text[language];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [tracking, setTracking] = useState({
    courier: "",
    resi: "",
    data: null,
  });

  const handleTrack = async ({ courier, resi }) => {
  try {
    setLoading(true);
    setError("");

    const result = await trackPackage({ courier, resi });

    setTracking({
      courier,
      resi,
      data: result.data, // simpan semua data
    });

    setTimeout(() => {
      trackingRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);
  } catch (err) {
    setError("Gagal mengambil data resi");
    setTracking({ courier: "", resi: "", data: null });
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="landing-container">
      {/* NAVBAR */}
      <Navbar
        heroRef={heroRef}
        faqRef={faqRef}
        // aboutRef={aboutRef}
        // priceRef={priceRef}
        language={language}
        t={t}
      />

      {/* HERO */}
      <Hero heroRef={heroRef} t={t} onTrack={handleTrack} />

      {/* TRACKING RESULT */}
      <div ref={trackingRef}>
        {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        {tracking.courier && tracking.resi && (
          <TrackingList
            courier={tracking.courier}
            resi={tracking.resi}
            data={tracking.data}
          />
        )}
      
      {/* About */}
      {/* <About aboutRef={aboutRef} t={t} /> */}

      {/* Body About */}
      {/* <section className="section about">
        <div className="about-container">
          <div className="about-image">
            <img src={dashboard1} alt="About" />
          </div>
          <div className="about-text">
            <h2>{t.aboutTitle}</h2>
            <p>{t.aboutP1}</p>
            <p>{t.aboutP2}</p>
          </div>
        </div>
      </section> */}
         {/* MISSION */}
      {/* <section className="section mission">
        <div className="mission-container">
          <div className="mission-image">
            <img src={scanImage} alt="Mission" />
          </div>
          <div className="mission-text">
            <h2>{t.missionTitle}</h2>
            <p>{t.missionP1}</p>
            <p>{t.missionP2}</p>
          </div>
        </div>
      </section> */}

      {/* VISION */}
      {/* <section className="section vision">
        <div className="vision-container">
          <div className="vision-text">
            <h2>{t.visionTitle}</h2>
            <p>{t.visionP1}</p>
            <p>{t.visionP2}</p>
          </div>
          <div className="vision-image">
            <img src={addImage} alt="Vision" />
          </div>
        </div>
      </section> */}
      {/* PRICING */}
      {/* <Pricing priceRef={priceRef} language={language} />    */}
      {/* MISSION */}
      {/* <section className="section mission">
        <div className="mission-container">
          <div className="mission-image">
            <img src={scanImage} alt="Mission" />
          </div>
          <div className="mission-text">
            <h2>{t.missionTitle}</h2>
            <p>{t.missionP1}</p>
            <p>{t.missionP2}</p>
          </div>
        </div>
      </section> */}

      {/* VISION */}
      {/* <section className="section vision">
        <div className="vision-container">
          <div className="vision-text">
            <h2>{t.visionTitle}</h2>
            <p>{t.visionP1}</p>
            <p>{t.visionP2}</p>
          </div>
          <div className="vision-image">
            <img src={addImage} alt="Vision" />
          </div>
        </div>
      </section> */}
      {/* PRICING */}
      {/* <Pricing priceRef={priceRef} language={language} /> */}

      </div>

      {/* FAQ */}
      <FAQ faqRef={faqRef} t={t} />

      {/* FOOTER */}
      <Footer language={language} />
      <ChatWidget />
    </div>
  );
}
